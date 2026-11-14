import type { ReactNode } from 'react';
import { Card } from '@astryxdesign/core/Card';
import { useState, type KeyboardEvent, type PointerEvent } from 'react';
import { Stack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { useT, type T } from '../data';
import { C, caps, serif } from './Configurator';

// The same reservation, once as a typical form-service email and once in the restaurant's own design.
const GUEST: [T, string][] = [
  [{ de: 'Name', en: 'Name' }, 'Laura Meier'],
  [{ de: 'Telefon', en: 'Phone' }, '079 123 45 67'],
  [{ de: 'E-Mail', en: 'Email' }, 'laura.meier@example.ch'],
  [{ de: 'Nummer', en: 'Number' }, 'TV-48213'],
];

/** Mail-client chrome: sender and subject above the message. */
function Mail({ from, subject, children }: { from: string; subject: string; children: ReactNode }) {
  return (
    <Card padding={0} elevation="med" style={{ overflow: 'hidden' }}>
      <Stack>
        <Stack gap={0.5} padding={3} style={{ borderBottom: '1px solid var(--color-border)' }}>
          <Text size="sm" weight="semibold" maxLines={1}>{subject}</Text>
          <Text size="xsm" color="secondary" maxLines={1}>{from}</Text>
        </Stack>
        {children}
      </Stack>
    </Card>
  );
}

export default function Emails() {
  const t = useT();
  const [pos, setPos] = useState(50);
  const clamp = (n: number) => Math.min(100, Math.max(0, n));
  const move = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setPos(clamp(((e.clientX - r.left) / r.width) * 100));
  };
  const onKey = (e: KeyboardEvent) => {
    const d = { ArrowLeft: -5, ArrowDown: -5, ArrowRight: 5, ArrowUp: 5 }[e.key];
    if (d) { e.preventDefault(); setPos((p) => clamp(p + d)); }
    else if (e.key === 'Home') setPos(0);
    else if (e.key === 'End') setPos(100);
  };
  const tag = { position: 'absolute', top: 'var(--spacing-2)', padding: '0.2em 0.7em', borderRadius: '999px', background: 'var(--color-background-gray)', border: '1px solid var(--color-border)', pointerEvents: 'none' } as const;
  const plain = [
    t({ de: 'Sie haben eine neue Einsendung erhalten.', en: 'You have received a new submission.' }),
    '',
    'name: Laura Meier',
    'email: laura.meier@example.ch',
    'telefon: 0791234567',
    'datum: 2026-08-05',
    'zeit: 12:30',
    'personen: 3',
    'nachricht: Fisch Allergie',
    '',
    '--',
    t({ de: 'Gesendet über Formular-Service', en: 'Sent via form service' }),
  ].join('\n');

  return (
    <Stack gap={4} style={{ maxWidth: '40rem' }}>
      <Stack
        onPointerDown={(e: PointerEvent<HTMLElement>) => { e.currentTarget.setPointerCapture(e.pointerId); move(e); }}
        onPointerMove={(e: PointerEvent<HTMLElement>) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) move(e); }}
        style={{ display: 'grid', position: 'relative', overflow: 'hidden', touchAction: 'pan-y', userSelect: 'none', cursor: 'ew-resize', borderRadius: 'var(--radius-lg)' }}
      >
        <Stack style={{ gridArea: '1/1', minWidth: 0 }}>
        <Mail from="Formular <noreply@form-service.com>" subject={t({ de: 'Neue Formular-Einsendung', en: 'New form submission' })}>
          <Stack padding={3}>
            <Text size="sm" style={{ fontFamily: 'ui-monospace, Menlo, Consolas, monospace', whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{plain}</Text>
          </Stack>
        </Mail>
        </Stack>
        <Stack style={{ gridArea: '1/1', minWidth: 0, clipPath: `inset(0 0 0 ${pos}%)` }}>
        <Mail from="Tavola <reservation@tavola-baden.ch>" subject={t({ de: 'Neue Reservation · Mi., 5. August, 12:30', en: 'New reservation · Wed 5 August, 12:30' })}>
          <Stack style={{ background: C.card, color: C.ink }}>
            <Stack direction="horizontal" justify="between" align="center" paddingInline={4} paddingBlock={3} style={{ background: C.night, color: C.paper }}>
              <Text color="inherit" style={{ ...caps, color: '#d7a07c' }}>{t({ de: 'Neue Reservation', en: 'New reservation' })}</Text>
              <Text size="xsm" color="inherit" style={{ fontFamily: 'ui-monospace, Menlo, Consolas, monospace' }}>TV-48213</Text>
            </Stack>
            <Stack gap={1} paddingInline={4} paddingBlock={4} style={{ borderBottom: `2px solid ${C.ink}` }}>
              <Text color="inherit" style={{ ...serif, fontSize: '1.75rem' }}>{t({ de: 'Mittwoch, 5. August 2026', en: 'Wednesday, 5 August 2026' })}</Text>
              <Text color="inherit" style={{ ...serif, fontSize: '1.3rem' }}><strong>{t({ de: '12:30 Uhr', en: '12:30 pm' })}</strong> · {t({ de: '3 Personen', en: '3 guests' })}</Text>
            </Stack>
            <Stack gap={3} padding={4}>
              <Stack gap={1} padding={3} style={{ background: C.paper, borderInlineStart: `3px solid ${C.accent}` }}>
                <Text color="inherit" style={{ ...caps, color: C.soft }}>{t({ de: 'Wünsche / Allergien', en: 'Requests / allergies' })}</Text>
                <Text color="inherit">{t({ de: 'Fisch-Allergie', en: 'Fish allergy' })}</Text>
              </Stack>
              <Stack>
                <Text color="inherit" style={{ ...caps, color: C.soft, paddingBottom: '0.75rem' }}>{t({ de: 'Gast', en: 'Guest' })}</Text>
                {GUEST.map(([k, v], i) => (
                  <Stack key={v} direction="horizontal" gap={3} paddingBlock={1.5} style={{ borderTop: `1px solid ${C.line}` }}>
                    <Text size="sm" color="inherit" style={{ width: '6rem', flexShrink: 0, color: C.soft }}>{t(k)}</Text>
                    <Text size="sm" color="inherit" weight={i === 0 ? 'bold' : undefined} style={{ color: i === 1 || i === 2 ? C.accent : undefined, minWidth: 0, overflowWrap: 'anywhere' }}>{v}</Text>
                  </Stack>
                ))}
              </Stack>
              <Stack direction="horizontal" gap={1.5} wrap="wrap">
                <Text color="inherit" style={{ ...caps, padding: '0.9em 1.4em', background: C.ink, color: C.paper }}>{t({ de: 'Gast anrufen', en: 'Call guest' })}</Text>
                <Text color="inherit" style={{ ...caps, padding: '0.9em 1.4em', border: `1px solid ${C.ink}` }}>{t({ de: 'Antworten', en: 'Reply' })}</Text>
              </Stack>
            </Stack>
            <Stack paddingInline={4} paddingBlock={3} style={{ background: C.paper, borderTop: `1px solid ${C.line}` }}>
              <Text size="xsm" color="inherit" style={{ color: C.soft }}>{t({ de: 'Automatisch erzeugt vom Reservationsformular auf tavola-baden.ch. Der Gast hat bereits eine Bestätigung im gleichen Design erhalten.', en: 'Generated automatically by the booking form on tavola-baden.ch. The guest has already received a confirmation in the same design.' })}</Text>
            </Stack>
          </Stack>
        </Mail>
        </Stack>
        <Text size="xsm" weight="semibold" style={{ ...tag, left: 'var(--spacing-2)' }}>{t({ de: 'Ohne Design', en: 'Without design' })}</Text>
        <Text size="xsm" weight="semibold" style={{ ...tag, right: 'var(--spacing-2)' }}>{t({ de: 'Mit Design', en: 'With design' })}</Text>
        <Stack align="center" justify="center" style={{ position: 'absolute', top: 0, bottom: 0, left: `${pos}%`, width: '2px', marginInlineStart: '-1px', background: 'var(--color-text-primary)', pointerEvents: 'none' }}>
          <Text size="sm" weight="bold" style={{ width: '2.25rem', height: '2.25rem', flexShrink: 0, display: 'grid', placeItems: 'center', borderRadius: '50%', background: 'var(--color-background-gray)', border: '2px solid var(--color-text-primary)', boxShadow: '0 1px 6px rgba(0,0,0,.35)' }}>{'↔'}</Text>
        </Stack>
        <input
          type="range" min={0} max={100} step={1} value={Math.round(pos)} onChange={(e) => setPos(Number(e.target.value))} onKeyDown={onKey}
          aria-label={t({ de: 'Vergleich Ohne Design / Mit Design', en: 'Compare without / with design' })}
          style={{ position: 'absolute', width: 1, height: 1, opacity: 0, overflow: 'hidden', clip: 'rect(0 0 0 0)', pointerEvents: 'none' }}
        />
      </Stack>
      <Text type="supporting" size="sm">{t({ de: 'Ziehen Sie den Regler, um den Unterschied zu sehen.', en: 'Drag the handle to see the difference.' })}</Text>
    </Stack>
  );
}
