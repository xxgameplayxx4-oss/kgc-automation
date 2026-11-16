import { useEffect, useState, useSyncExternalStore } from 'react';
import { Card } from '@astryxdesign/core/Card';
import { Stack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { Icon } from '@astryxdesign/core/Icon';
import { UI } from './uiIcons';
import { useT, type T } from '../data';

// Hero signature (2026-11-16 redesign): the night shift of a plumber's inbox, played back.
// Enquiries arrive after closing time and each one is answered by itself, with the reply time in seconds.
type Row = { time: string; channel: 'call' | 'wa' | 'mail' | 'form'; who: string; what: T; reply: T; secs: number };

const ROWS: Row[] = [
  { time: '22:14', channel: 'call', who: '079 412 33 08', what: { de: 'Verpasster Anruf', en: 'Missed call' }, reply: { de: 'SMS mit Rückruf-Link', en: 'Text with callback link' }, secs: 41 },
  { time: '22:31', channel: 'wa', who: 'Marco K.', what: { de: '«Boiler tropft, morgen Zeit?»', en: '"Boiler leaking, free tomorrow?"' }, reply: { de: 'Termin 08:00 vorgeschlagen', en: 'Offered 08:00 tomorrow' }, secs: 6 },
  { time: '23:02', channel: 'form', who: 'Firma Brun AG', what: { de: 'Offertanfrage Bad', en: 'Quote request, bathroom' }, reply: { de: 'Bestätigung + Nummer', en: 'Confirmation + number' }, secs: 2 },
  { time: '23:47', channel: 'mail', who: 'L. Meier', what: { de: 'Frage zur Rechnung 2041', en: 'Question about invoice 2041' }, reply: { de: 'Für Sie markiert, 07:00', en: 'Flagged for you, 07:00' }, secs: 3 },
  { time: '00:12', channel: 'wa', who: 'S. Keller', what: { de: '«Parkplatz vor Ort?»', en: '"Parking on site?"' }, reply: { de: 'Beantwortet aus Ihren Infos', en: 'Answered from your info' }, secs: 5 },
];
const ICON = { call: UI.phone, wa: UI.chat, mail: UI.mail, form: UI.doc } as const;
const CHANNEL: Record<Row['channel'], T> = {
  call: { de: 'Anruf', en: 'Call' }, wa: { de: 'WhatsApp', en: 'WhatsApp' }, mail: { de: 'E-Mail', en: 'Email' }, form: { de: 'Formular', en: 'Form' },
};

const q = '(prefers-reduced-motion: reduce)';
const useReduced = () => useSyncExternalStore(
  cb => { const m = matchMedia(q); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb); },
  () => matchMedia(q).matches, () => false,
);

const STEP = 1900; // ms between arrivals; each arrival is answered half a step later
const mono = { fontFamily: 'var(--font-family-code)', fontVariantNumeric: 'tabular-nums' } as const;

export default function NightTicker() {
  const t = useT();
  const reduce = useReduced();
  // tick counts half-steps: row i arrives at tick 2i and is answered at tick 2i+1; the loop holds, then restarts.
  const [tick, setTick] = useState(0);
  const total = ROWS.length * 2 + 4;
  useEffect(() => {
    if (reduce) return;
    const h = setInterval(() => setTick(v => (v + 1) % total), STEP / 2);
    return () => clearInterval(h);
  }, [reduce, total]);
  const k = reduce ? total : tick;
  const answered = ROWS.filter((_, i) => k >= 2 * i + 1).length;

  return (
    <Card padding={0} style={{ overflow: 'hidden', width: '100%' }} aria-label={t({ de: 'Beispiel: Anfragen über Nacht', en: 'Example: enquiries overnight' })}>
      <Stack>
        <Stack direction="horizontal" justify="between" align="center" gap={2} paddingInline={3} paddingBlock={2} style={{ borderBottom: '1px solid var(--color-border)' }}>
          <Text size="sm" weight="semibold">{t({ de: 'Muster Sanitär · nach Feierabend', en: 'Muster Plumbing · after hours' })}</Text>
          <Text size="xsm" color="secondary" style={mono} aria-live="polite">
            {t({ de: `${answered}/${ROWS.length} beantwortet`, en: `${answered}/${ROWS.length} answered` })}
          </Text>
        </Stack>
        {ROWS.map((r, i) => {
          const shown = k >= 2 * i;
          const done = k >= 2 * i + 1;
          return (
            <Stack key={r.time} direction="horizontal" gap={2} align="start" paddingInline={3} paddingBlock={2}
              style={{ borderBottom: i < ROWS.length - 1 ? '1px solid var(--color-border)' : undefined, opacity: shown ? 1 : 0.18, transition: 'opacity .35s ease' }}>
              <Text size="sm" color="secondary" style={{ ...mono, width: '3.2rem', flexShrink: 0, paddingTop: '0.1rem' }}>{r.time}</Text>
              <Stack gap={0.5} style={{ flex: 1, minWidth: 0 }}>
                <Stack direction="horizontal" gap={1} align="center">
                  <Icon icon={ICON[r.channel]} size="xsm" color="secondary" />
                  <Text size="xsm" color="secondary">{t(CHANNEL[r.channel])} · {r.who}</Text>
                </Stack>
                <Text size="sm" maxLines={1}>{t(r.what)}</Text>
              </Stack>
              <Stack gap={0.5} align="end" style={{ flexShrink: 0, maxWidth: '44%' }}>
                <Text size="xsm" weight="semibold" color={done ? 'accent' : 'secondary'} style={mono}>
                  {done ? t({ de: `✓ ${r.secs} s`, en: `✓ ${r.secs} s` }) : shown ? t({ de: 'neu', en: 'new' }) : ''}
                </Text>
                <Text size="xsm" color="secondary" maxLines={1} justify="end" style={{ opacity: done ? 1 : 0, transition: 'opacity .35s ease' }}>{t(r.reply)}</Text>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );
}
