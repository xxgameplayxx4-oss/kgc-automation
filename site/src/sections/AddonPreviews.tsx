import { useState, type CSSProperties, type ReactNode } from 'react';
import { Card } from '@astryxdesign/core/Card';
import { Grid } from '@astryxdesign/core/Grid';
import { Stack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { chf, useT, type T } from '../data';
import { C, caps, serif } from './Configurator';

// Presentational previews of add-ons for the sample restaurant "Tavola" (all mock data, nothing is clickable except the calculator).
type Mark = (id: string) => Record<string, string>;
const pop = { 'data-pop': '' } as Record<string, string>;
const Caps = ({ children, color }: { children: ReactNode; color?: string }) => <Text color="inherit" style={{ ...caps, color: color ?? C.soft }}>{children}</Text>;
const Serif = ({ children, size, color }: { children: ReactNode; size: string; color?: string }) => <Text color="inherit" style={{ ...serif, fontSize: size, color }}>{children}</Text>;
const abs = (s: CSSProperties): CSSProperties => ({ position: 'absolute', ...s });
const mono: CSSProperties = { fontFamily: 'ui-monospace, Menlo, Consolas, monospace' };
const boxS = (): CSSProperties => ({ background: C.card, border: `1px solid ${C.line}`, borderRadius: 'var(--radius-container)' });

/* ───────────── Live «Jetzt geöffnet»: weekly timeline ───────────── */

const DAYS: [number, T][] = [
  [1, { de: 'Mo', en: 'Mon' }], [2, { de: 'Di', en: 'Tue' }], [3, { de: 'Mi', en: 'Wed' }], [4, { de: 'Do', en: 'Thu' }],
  [5, { de: 'Fr', en: 'Fri' }], [6, { de: 'Sa', en: 'Sat' }], [0, { de: 'So', en: 'Sun' }],
];
const A0 = 6, A1 = 24; // hour axis
const pct = (h: number) => `${((h - A0) / (A1 - A0)) * 100}%`;
const pad = (n: number) => String(n).padStart(2, '0');

export function HoursWeek({ hours, phone }: { hours: Record<number, [number, number]>; phone: boolean }) {
  const t = useT();
  const now = new Date();
  const today = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  const cols: CSSProperties = { display: 'grid', gridTemplateColumns: `2.4em 1fr ${phone ? '5.6em' : '6.6em'}`, columnGap: '0.75em', alignItems: 'center' };
  return (
    <Stack {...pop} gap={0} padding={phone ? 3 : 4} style={{ ...boxS(), position: 'relative' }}>
      <Stack style={{ ...cols, paddingBottom: '0.6em' }}>
        <Stack />
        <Stack style={{ position: 'relative', height: '1.1em' }}>
          {[6, 12, 18, 24].map(a => (
            <Text key={a} size="xsm" color="inherit" hasTabularNumbers style={abs({ left: pct(a), transform: a === 24 ? 'translateX(-100%)' : a === 6 ? undefined : 'translateX(-50%)', color: C.soft, fontSize: '0.7em' })}>{pad(a)}</Text>
          ))}
        </Stack>
        <Stack />
      </Stack>
      {DAYS.map(([d, name]) => {
        const o = hours[d];
        const isToday = d === today;
        return (
          <Stack key={d} style={{ ...cols, paddingBlock: '0.45em', borderTop: `1px solid ${C.line}`, color: isToday ? C.accent : C.ink }}>
            <Text color="inherit" style={{ ...caps, fontSize: '0.72em', color: isToday ? C.accent : C.soft }}>{t(name)}</Text>
            <Stack style={{ position: 'relative', height: '1.3em' }}>
              {[12, 18].map(a => <Stack key={a} style={abs({ left: pct(a), top: 0, bottom: 0, width: 1, background: C.line })} />)}
              {o ? (
                <Stack style={abs({ left: pct(o[0]), width: `${((o[1] - o[0]) / (A1 - A0)) * 100}%`, top: '0.2em', bottom: '0.2em', borderRadius: 'var(--radius-full)', background: isToday ? C.accent : C.ink })} />
              ) : (
                <Stack style={abs({ left: 0, right: 0, top: '50%', borderTop: `1px dashed ${C.soft}`, opacity: 0.6 })} />
              )}
            </Stack>
            <Text size="sm" color="inherit" hasTabularNumbers weight={isToday ? 'semibold' : undefined} style={{ textAlign: 'right', color: o ? undefined : C.soft, fontSize: phone ? '0.85em' : undefined, whiteSpace: 'nowrap' }}>
              {o ? `${pad(o[0])}:00–${pad(o[1])}:00` : t({ de: 'Geschlossen', en: 'Closed' })}
            </Text>
          </Stack>
        );
      })}
      {/* "now" marker over the track column, aligned with the rows above */}
      {h >= A0 && h <= A1 && (
        <Stack aria-hidden="true" style={{ ...cols, ...abs({ inset: 0, top: '1.6em', bottom: '2.4em' }), padding: phone ? '0.75rem' : '1rem', paddingBlock: 0, pointerEvents: 'none' }}>
          <Stack />
          <Stack style={{ position: 'relative', height: '100%', gridColumn: 2 }}>
            <Stack style={abs({ left: pct(h), top: 0, bottom: 0, width: 2, background: C.accent, transform: 'translateX(-1px)' })}>
              <Text color="inherit" style={{ ...caps, fontSize: '0.55em', ...abs({ top: '-1.6em', left: '50%', transform: 'translateX(-50%)' }), background: C.accent, color: C.paper, padding: '0.35em 0.6em', borderRadius: 'var(--radius-full)', whiteSpace: 'nowrap' }}>{t({ de: 'Jetzt', en: 'Now' })}</Text>
            </Stack>
          </Stack>
        </Stack>
      )}
      <Text size="xsm" color="inherit" style={{ color: C.soft, paddingTop: '0.8em' }}>{t({ de: 'Schweizer Zeit.', en: 'Swiss time.' })}</Text>
    </Stack>
  );
}

/* ───────────── Preisrechner ───────────── */

const OFFERS: [string, T, number][] = [
  ['aperitif', { de: 'Apéro riche', en: 'Apéro riche' }, 32],
  ['buffet', { de: 'Buffet', en: 'Buffet' }, 64],
  ['menu', { de: '3-Gang-Menü', en: '3-course menu' }, 78],
];
const STEPS = 12; // 10 … 120 guests

export function PriceCalc({ phone }: { phone: boolean }) {
  const t = useT();
  const [guests, setGuests] = useState(40);
  const [offer, setOffer] = useState('buffet');
  const [wine, setWine] = useState(true);
  const pp = OFFERS.find(o => o[0] === offer)![2];
  const food = guests * pp;
  const drinks = wine ? guests * 28 : 0;
  const seg = (i: number): CSSProperties => ({ flex: 1, height: '0.45em', background: (i + 1) * 10 <= guests ? C.accent : C.line, cursor: 'pointer', border: 0, padding: 0 });
  const chip = (on: boolean): CSSProperties => ({ padding: '0.5em 1em', borderRadius: 'var(--radius-full)', border: `1px solid ${on ? C.ink : C.line}`, background: on ? C.ink : 'transparent', color: on ? C.paper : C.ink, cursor: 'pointer', whiteSpace: 'nowrap' });
  const row = (l: ReactNode, v: string, strong?: boolean) => (
    <Stack direction="horizontal" justify="between" gap={2}>
      <Text size="sm" color="inherit" style={{ opacity: strong ? 1 : 0.75 }}>{l}</Text>
      <Text size="sm" color="inherit" hasTabularNumbers weight={strong ? 'semibold' : undefined}>{v}</Text>
    </Stack>
  );
  return (
    <Grid columns={phone ? 1 : 5} gap={3} align="stretch">
      <Stack gap={3} padding={phone ? 3 : 4} style={{ ...boxS(), gridColumn: phone ? undefined : 'span 3' }}>
        <Stack gap={1.5}>
          <Stack direction="horizontal" justify="between" align="end">
            <Caps>{t({ de: '1 · Anzahl Gäste', en: '1 · Number of guests' })}</Caps>
            <Serif size="1.5em">{guests}</Serif>
          </Stack>
          <Stack direction="horizontal" gap={0.5} align="center" style={{ position: 'relative' }}>
            {Array.from({ length: STEPS }, (_, i) => (
              <Text key={i} as="span" role="button" tabIndex={0} aria-label={`${(i + 1) * 10}`} color="inherit" onClick={() => setGuests((i + 1) * 10)} style={seg(i)}>{' '}</Text>
            ))}
          </Stack>
          <Stack direction="horizontal" justify="between"><Text size="xsm" color="inherit" style={{ color: C.soft }}>10</Text><Text size="xsm" color="inherit" style={{ color: C.soft }}>120</Text></Stack>
        </Stack>
        <Stack gap={1.5}>
          <Caps>{t({ de: '2 · Angebot', en: '2 · Offer' })}</Caps>
          <Stack direction="horizontal" gap={1} wrap="wrap">
            {OFFERS.map(([k, n, p]) => (
              <Text key={k} as="span" role="button" tabIndex={0} size="sm" color="inherit" onClick={() => setOffer(k)} style={chip(offer === k)}>{t(n)} · {p}.–</Text>
            ))}
          </Stack>
        </Stack>
        <Stack gap={1.5}>
          <Caps>{t({ de: '3 · Zusatz', en: '3 · Extras' })}</Caps>
          <Stack direction="horizontal"><Text as="span" role="button" tabIndex={0} size="sm" color="inherit" onClick={() => setWine(w => !w)} style={chip(wine)}>{wine ? '✓ ' : '+ '}{t({ de: 'Weinbegleitung · 28.–', en: 'Wine pairing · 28.–' })}</Text></Stack>
        </Stack>
      </Stack>
      <Stack gap={2} padding={phone ? 3 : 4} justify="between" style={{ gridColumn: phone ? undefined : 'span 2', background: C.night, color: C.paper, borderRadius: 'var(--radius-container)' }}>
        <Stack gap={1.5}>
          <Caps color="#e3a37f">{t({ de: 'Ihr Richtpreis', en: 'Your guide price' })}</Caps>
          {row(`${guests} × ${t(OFFERS.find(o => o[0] === offer)![1])}`, chf(food))}
          {wine && row(`${guests} × ${t({ de: 'Wein', en: 'Wine' })}`, chf(drinks))}
        </Stack>
        <Stack gap={1} paddingBlockStart={2} style={{ borderTop: '1px solid rgba(246,241,232,.25)' }}>
          <Serif size="2em">{t({ de: 'Richtpreis', en: 'Guide price' })} {chf(food + drinks)}</Serif>
          <Text size="xsm" color="inherit" style={{ opacity: 0.6 }}>{t({ de: `ca. ${chf(Math.round((food + drinks) / guests))} pro Person · unverbindlich, inkl. MwSt.`, en: `approx. ${chf(Math.round((food + drinks) / guests))} per person · non-binding, incl. VAT` })}</Text>
          <Text color="inherit" style={{ ...caps, color: '#e3a37f', paddingTop: '0.4em' }}>{t({ de: 'Offerte anfragen →', en: 'Request a quote →' })}</Text>
        </Stack>
      </Stack>
    </Grid>
  );
}

/* ───────────── Automations: what happens after a booking ───────────── */

const NO = 'TV-48213';
const Mail = ({ from, subject, children, tag }: { from: string; subject: string; children: ReactNode; tag?: ReactNode }) => (
  <Card padding={0} elevation="med" style={{ overflow: 'hidden', height: '100%' }}>
    <Stack>
      <Stack gap={0.5} padding={3} style={{ borderBottom: '1px solid var(--color-border)' }}>
        {tag}
        <Text size="sm" weight="semibold" maxLines={1}>{subject}</Text>
        <Text size="xsm" color="secondary" maxLines={1}>{from}</Text>
      </Stack>
      {children}
    </Stack>
  </Card>
);
const Label = ({ children }: { children: ReactNode }) => <Text size="xsm" color="secondary" style={{ ...caps, fontSize: '0.62em' }}>{children}</Text>;

function PlainConfirmation({ m }: { m: Record<string, string> }) {
  const t = useT();
  return (
    <Stack {...pop} {...m} gap={1}>
      <Mail from="Tavola <info@tavola-baden.ch>" subject={t({ de: `Ihre Reservation ${NO}`, en: `Your booking ${NO}` })}>
        <Stack padding={3}>
          <Text size="sm" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{t({
            de: `Guten Tag Laura Meier\n\nvielen Dank, Ihre Reservation ist bei uns eingegangen.\n\nBuchungsnummer: ${NO}\nDatum: Fr., 20. November 2026\nZeit: 19:30 Uhr\nPersonen: 2\n\nFreundliche Grüsse\nTavola, Weite Gasse 7, 5400 Baden`,
            en: `Hello Laura Meier\n\nthank you, we have received your booking.\n\nBooking number: ${NO}\nDate: Fri, 20 November 2026\nTime: 7:30 pm\nGuests: 2\n\nKind regards\nTavola, Weite Gasse 7, 5400 Baden`,
          })}</Text>
        </Stack>
      </Mail>
    </Stack>
  );
}

function DesignedConfirmation({ m }: { m: Record<string, string> }) {
  const t = useT();
  return (
    <Stack {...pop} {...m}>
      <Mail from="Tavola <reservation@tavola-baden.ch>" subject={t({ de: `Ihre Reservation ${NO} · Fr., 20. Nov., 19:30`, en: `Your booking ${NO} · Fri 20 Nov, 7:30 pm` })}>
        <Stack style={{ background: C.card, color: C.ink }}>
          <Stack direction="horizontal" justify="between" align="center" paddingInline={3} paddingBlock={3} style={{ background: C.night, color: C.paper }}>
            <Text color="inherit" style={{ ...serif, fontStyle: 'italic', fontSize: '1.35em' }}>Tavola</Text>
            <Text size="xsm" color="inherit" style={{ ...mono, color: '#d7a07c' }}>{NO}</Text>
          </Stack>
          <Stack gap={1} paddingInline={3} paddingBlock={3} style={{ borderBottom: `2px solid ${C.ink}` }}>
            <Caps color={C.accent}>{t({ de: 'Reservation bestätigt', en: 'Booking confirmed' })}</Caps>
            <Serif size="1.5em">{t({ de: 'Freitag, 20. November', en: 'Friday, 20 November' })}</Serif>
            <Text color="inherit" style={{ ...serif, fontSize: '1.1em' }}><strong>{t({ de: '19:30 Uhr', en: '7:30 pm' })}</strong> · {t({ de: '2 Personen', en: '2 guests' })}</Text>
          </Stack>
          <Stack gap={2} padding={3}>
            <Text size="sm" color="inherit" style={{ color: C.soft }}>{t({ de: 'Guten Tag Laura, wir freuen uns auf Sie. Der Tisch ist für Sie reserviert.', en: 'Hello Laura, we look forward to seeing you. Your table is reserved.' })}</Text>
            <Stack direction="horizontal" gap={1.5} wrap="wrap">
              <Text color="inherit" style={{ ...caps, padding: '0.9em 1.3em', background: C.ink, color: C.paper }}>{t({ de: 'In Kalender eintragen', en: 'Add to calendar' })}</Text>
              <Text color="inherit" style={{ ...caps, padding: '0.9em 1.3em', border: `1px solid ${C.ink}` }}>{t({ de: 'Umbuchen', en: 'Change' })}</Text>
            </Stack>
          </Stack>
        </Stack>
      </Mail>
    </Stack>
  );
}

function CalendarDay({ m }: { m: Record<string, string> }) {
  const t = useT();
  const H0 = 17, rowH = 2.4; // rem per hour
  return (
    <Stack {...pop} {...m}>
      <Card padding={0} elevation="med" style={{ overflow: 'hidden', height: '100%' }}>
        <Stack>
          <Stack direction="horizontal" justify="between" align="center" padding={3} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <Stack gap={0}>
              <Text size="xsm" color="secondary" style={caps}>{t({ de: 'Fr.', en: 'Fri' })}</Text>
              <Text style={{ ...serif, fontSize: '1.6em' }}>20</Text>
            </Stack>
            <Text size="xsm" color="secondary">{t({ de: 'Kalender · Tavola Reservationen', en: 'Calendar · Tavola bookings' })}</Text>
          </Stack>
          <Stack style={{ position: 'relative', paddingBlock: '0.4rem' }}>
            {[17, 18, 19, 20, 21].map(h => (
              <Stack key={h} direction="horizontal" style={{ height: `${rowH}rem`, borderTop: '1px solid var(--color-border)' }}>
                <Text size="xsm" color="secondary" hasTabularNumbers style={{ width: '3.6em', flexShrink: 0, whiteSpace: 'nowrap', textAlign: 'right', paddingRight: '0.6em', marginTop: '-0.6em' }}>{h}:00</Text>
              </Stack>
            ))}
            <Stack gap={0} padding={1} style={abs({ left: '4.2em', right: '0.75rem', top: `${0.4 + (19.5 - H0) * rowH}rem`, height: `${rowH * 1.5 - 0.15}rem`, background: '#1a73e8', color: 'white', borderRadius: '0.4rem', overflow: 'hidden' })}>
              <Text size="xsm" color="inherit" weight="semibold" maxLines={1}>Tavola · Laura Meier · 2 {t({ de: 'Pers.', en: 'guests' })}</Text>
              <Text size="xsm" color="inherit" hasTabularNumbers style={{ opacity: 0.9 }}>19:30–21:00 · {NO}</Text>
            </Stack>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}

function Reminder({ m }: { m: Record<string, string> }) {
  const t = useT();
  return (
    <Stack {...pop} {...m} gap={1.5}>
      <Card padding={2} elevation="med">
        <Stack direction="horizontal" gap={2} align="start">
          <Text size="sm" color="inherit" style={{ width: '2.2em', height: '2.2em', display: 'grid', placeItems: 'center', borderRadius: '0.5em', background: C.night, color: C.paper, ...serif, fontStyle: 'italic', flexShrink: 0 }}>T</Text>
          <Stack gap={0.5} style={{ minWidth: 0 }}>
            <Stack direction="horizontal" justify="between" gap={2}><Text size="xsm" weight="semibold">Tavola</Text><Text size="xsm" color="secondary">{t({ de: 'jetzt', en: 'now' })}</Text></Stack>
            <Text size="sm" weight="semibold">{t({ de: 'Morgen 19:30 · Tavola', en: 'Tomorrow 7:30 pm · Tavola' })}</Text>
            <Text size="xsm" color="secondary">{t({ de: 'Wir freuen uns auf Sie, 2 Personen.', en: 'We look forward to seeing you, 2 guests.' })}</Text>
          </Stack>
        </Stack>
      </Card>
      <Mail from="Tavola <reservation@tavola-baden.ch>" subject={t({ de: 'Erinnerung: Morgen 19:30 · Tavola', en: 'Reminder: Tomorrow 7:30 pm · Tavola' })} tag={<Label>{t({ de: '24 Stunden vorher', en: '24 hours before' })}</Label>}>
        <Stack gap={2} padding={3}>
          <Text size="sm">{t({ de: `Guten Tag Laura, Ihr Tisch für 2 Personen ist morgen um 19:30 Uhr bereit. Buchung ${NO}.`, en: `Hello Laura, your table for 2 is ready tomorrow at 7:30 pm. Booking ${NO}.` })}</Text>
          <Stack direction="horizontal" gap={1.5}>
            <Text color="inherit" style={{ ...caps, padding: '0.9em 1.3em', background: C.accent, color: C.paper }}>{t({ de: 'Bestätigen', en: 'Confirm' })}</Text>
            <Text color="inherit" style={{ ...caps, padding: '0.9em 1.3em', border: `1px solid ${C.ink}` }}>{t({ de: 'Absagen', en: 'Cancel' })}</Text>
          </Stack>
        </Stack>
      </Mail>
    </Stack>
  );
}

function ReviewRequest({ m }: { m: Record<string, string> }) {
  const t = useT();
  return (
    <Stack {...pop} {...m}>
      <Mail from="Tavola <reservation@tavola-baden.ch>" subject={t({ de: 'Wie war Ihr Abend im Tavola?', en: 'How was your evening at Tavola?' })} tag={<Label>{t({ de: 'Am Tag nach dem Besuch', en: 'The day after the visit' })}</Label>}>
        <Stack gap={2} padding={3} align="center" style={{ textAlign: 'center' }}>
          <Text size="sm">{t({ de: 'Guten Tag Laura, danke für Ihren Besuch. Eine Google-Bewertung hilft uns sehr, sie dauert 20 Sekunden.', en: 'Hello Laura, thank you for visiting. A Google review helps us a lot and takes 20 seconds.' })}</Text>
          <Stack direction="horizontal" gap={1}>
            {[1, 2, 3, 4, 5].map(n => (
              <Text key={n} color="inherit" style={{ width: '2em', height: '2em', display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-full)', border: '1px solid #e8b300', background: n === 5 ? '#fbbc04' : 'transparent', color: n === 5 ? '#231a12' : '#e8b300', fontSize: '1.15em' }}>★</Text>
            ))}
          </Stack>
          <Text size="xsm" color="secondary">{t({ de: 'Ein Tipp auf die Sterne öffnet Google direkt.', en: 'One tap on the stars opens Google directly.' })}</Text>
        </Stack>
      </Mail>
    </Stack>
  );
}

function SheetTable({ m, phone }: { m: Record<string, string>; phone: boolean }) {
  const t = useT();
  const rows: [string, string, string, string, string][] = [
    [NO, 'Laura Meier', 'Fr 20.11. 19:30', '2', t({ de: 'Neu', en: 'New' })],
    ['TV-48190', 'Marco Keller', 'Sa 21.11. 20:00', '6', t({ de: 'Bestätigt', en: 'Confirmed' })],
    ['TV-48177', 'Anna Frei', 'Do 19.11. 18:30', '4', t({ de: 'Bestätigt', en: 'Confirmed' })],
    ['TV-48152', 'Firma Brun AG', 'Mi 18.11. 12:00', '12', t({ de: 'Bestätigt', en: 'Confirmed' })],
  ];
  const heads = [t({ de: 'Nr.', en: 'No.' }), 'Name', t({ de: 'Datum', en: 'Date' }), 'P.', 'Status'];
  const tpl = phone ? '5.6em 1fr 2.6em 5.6em' : '5.6em 1fr 8em 2.4em 5.6em';
  const show = (r: string[]) => (phone ? [r[0], r[1], r[3], r[4]] : r);
  const cell: CSSProperties = { padding: '0.45em 0.7em', borderRight: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0', fontSize: phone ? '0.72em' : '0.8em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
  return (
    <Stack {...pop} {...m}>
      <Card padding={0} elevation="med" style={{ overflow: 'hidden' }}>
        <Stack>
          <Stack direction="horizontal" gap={1.5} align="center" padding={2} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <Text size="sm" color="inherit" style={{ width: '1.4em', height: '1.8em', background: '#188038', borderRadius: '0.2em', flexShrink: 0 }} aria-hidden="true">{' '}</Text>
            <Text size="sm" weight="semibold" maxLines={1}>{t({ de: 'Tavola · Anfragen 2026', en: 'Tavola · Enquiries 2026' })}</Text>
          </Stack>
          <Stack style={{ background: 'white', color: '#202124', overflowX: 'auto' }}><Stack style={{ minWidth: phone ? undefined : '34em' }}>
            {[show(heads), ...rows.map(show)].map((r, i) => {
              const cells = i === 0 ? r : r;
              const newest = i === 1;
              return (
                <Stack key={i} style={{ display: 'grid', gridTemplateColumns: tpl, background: i === 0 ? '#f1f3f4' : newest ? '#fdf0e8' : 'white', fontWeight: i === 0 ? 600 : undefined, boxShadow: newest ? `inset 3px 0 0 ${C.accent}` : undefined }}>
                  {cells.map((c, j) => <Text key={j} color="inherit" hasTabularNumbers style={{ ...cell, fontWeight: newest && j === cells.length - 1 ? 700 : undefined, color: newest && j === cells.length - 1 ? C.accent : undefined }}>{c}</Text>)}
                </Stack>
              );
            })}
          </Stack></Stack>
        </Stack>
      </Card>
    </Stack>
  );
}

export function AutomationFlow({ has, mark, phone }: { has: (id: string) => boolean; mark: Mark; phone: boolean }) {
  const t = useT();
  const cards: { id: string; wide?: boolean; node: ReactNode }[] = [];
  if (has('maildesign')) cards.push({ id: 'maildesign', node: <DesignedConfirmation m={{ ...mark('autoreply'), ...mark('maildesign') }} /> });
  else if (has('autoreply')) cards.push({ id: 'autoreply', node: <PlainConfirmation m={mark('autoreply')} /> });
  if (has('calendar')) cards.push({ id: 'calendar', node: <CalendarDay m={mark('calendar')} /> });
  if (has('reminder')) cards.push({ id: 'reminder', node: <Reminder m={mark('reminder')} /> });
  if (has('review-request')) cards.push({ id: 'review-request', node: <ReviewRequest m={mark('review-request')} /> });
  if (has('sheet')) cards.push({ id: 'sheet', wide: true, node: <SheetTable m={mark('sheet')} phone={phone} /> });
  if (!cards.length) return null;
  return (
    <Stack gap={2}>
      <Stack gap={0.5}>
        <Text type="supporting" size="sm" weight="semibold">{t({ de: 'Was nach einer Buchung automatisch passiert', en: 'What happens automatically after a booking' })}</Text>
        <Text type="supporting" size="xsm">{t({ de: 'Beispiel: Laura Meier reserviert für Fr., 20. Nov., 19:30.', en: 'Example: Laura Meier books for Fri, 20 Nov, 7:30 pm.' })}</Text>
      </Stack>
      <Grid columns={{ minWidth: 300, max: phone ? 1 : 2 }} gap={3} align="start">
        {cards.map(c => <Stack key={c.id} style={{ gridColumn: c.wide ? '1 / -1' : undefined, minWidth: 0 }}>{c.node}</Stack>)}
      </Grid>
    </Stack>
  );
}
