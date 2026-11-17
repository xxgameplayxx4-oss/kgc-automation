import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Stack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { AUTOPILOT_MONTHLY, chf, useT, type T } from '../data';
import WhatsAppChat from './WhatsAppChat';
import { UI, ic } from './uiIcons';

// The automations film: an animated scene player synced to an ElevenLabs voiceover.
// Each line of the script has its own scene; LINES[i].at is the second the line starts in the audio.
// Scenes are drawn in the page (not a video file), so they stay sharp and switch language with the site.

export type Line = { at: { de: number; en: number }; text: T };
// Start times in seconds, measured from the voiceover (see VOICE).
export const LINES: Line[] = [
  { at: { de: 0, en: 0 }, text: { de: 'Halb elf am Abend. Ihr Telefon klingelt. Und klingelt wieder.', en: 'Half past ten at night. Your phone rings. And rings again.' } },
  { at: { de: 4.85, en: 4.8 }, text: { de: 'Sie können nicht abnehmen. Sie sind noch beim Kunden, in der Werkstatt, oder endlich zu Hause.', en: 'You can’t pick up. You’re still with a customer, in the workshop, or finally at home.' } },
  { at: { de: 9.8, en: 11.65 }, text: { de: 'Jeder verpasste Anruf ist ein Kunde, der jetzt bei der Konkurrenz sucht.', en: 'Every missed call is a customer now looking at your competitor.' } },
  { at: { de: 14.05, en: 15.9 }, text: { de: 'Mit meinen Automationen passiert das nicht mehr.', en: 'With my automations, that stops.' } },
  { at: { de: 16.9, en: 18.85 }, text: { de: 'Verpasster Anruf? Ihr Kunde bekommt innert einer Minute eine SMS mit Rückruf- oder Buchungslink.', en: 'Missed call? Your customer gets a text within a minute with a callback or booking link.' } },
  { at: { de: 23.4, en: 24.8 }, text: { de: 'Neue Anfrage per E-Mail, WhatsApp oder Formular? Die Antwort geht sofort raus, und alles landet in einer Liste.', en: 'New enquiry by email, WhatsApp or form? The reply goes out at once, and everything lands in one list.' } },
  { at: { de: 30.85, en: 32.55 }, text: { de: 'Der WhatsApp-Agent beantwortet Fragen und nimmt Termine auf, auch um Mitternacht.', en: 'The WhatsApp agent answers questions and takes bookings, even at midnight.' } },
  { at: { de: 36.45, en: 37.9 }, text: { de: 'Der Termin steht automatisch in Ihrem Kalender, und am Tag davor kommt die Erinnerung.', en: 'The appointment is in your calendar automatically, and the reminder goes out the day before.' } },
  { at: { de: 42.45, en: 44 }, text: { de: 'Offerte verschickt? Nach fünf Tagen wird freundlich nachgefasst.', en: 'Quote sent? After five days, a friendly follow-up goes out.' } },
  { at: { de: 46.55, en: 48.65 }, text: { de: 'Auftrag erledigt? Die Bitte um eine Google-Bewertung geht von selbst raus. Und offene Rechnungen werden höflich erinnert.', en: 'Job done? The request for a Google review goes out on its own. And unpaid invoices get a polite reminder.' } },
  { at: { de: 53.35, en: 57.45 }, text: { de: 'Keine Offerte und keine Rechnung geht ohne Ihre Freigabe raus. Ihre Daten bleiben in der Schweiz oder der EU.', en: 'No quote and no invoice goes out without your approval. Your data stays in Switzerland or the EU.' } },
  { at: { de: 59.4, en: 64.1 }, text: { de: `Automationen ab ${AUTOPILOT_MONTHLY} Franken im Monat, ohne Einrichtungsgebühr.`, en: `Automations from ${AUTOPILOT_MONTHLY} francs a month, with no setup fee.` } },
  { at: { de: 64.1, en: 69.3 }, text: { de: 'Buchen Sie jetzt Ihr kostenloses Gespräch.', en: 'Book your free call now.' } },
];
// KGC: voice a little faster (about 8 %). Timings stay in audio seconds, so the scenes stay in sync.
const SPEED = 1.08;
export const VOICE = { de: './media/automationen-de.mp3', en: './media/automationen-en.mp3' };

// Film palette: night scenes in black and graphite, the automation scenes lit in the brand orange.
export const F = { night: '#05070a', panel: '#15171b', line: 'rgba(255,255,255,.12)', ink: '#f4f2ee', soft: 'rgba(244,242,238,.65)', orange: '#FCA311', red: '#ff5b4f', green: '#38c172' };
const fill = { position: 'absolute', inset: 0 } as const;

// KGC: "make the phone a real iPhone". Titanium frame, side buttons, Dynamic Island, iOS status bar and home bar.
// The screen is drawn at a fixed design size and scaled to fit, so it looks the same on a phone and on a desktop.
const TI = 'linear-gradient(135deg, #4a4c50 0%, #a7a9ad 16%, #55575c 38%, #26282b 60%, #7d7f84 82%, #3a3c40 100%)';
const Btn = ({ side, top, h }: { side: 'left' | 'right'; top: string; h: string }) => (
  <Stack aria-hidden="true" style={{ position: 'absolute', [side]: '-1.6%', top, height: h, width: '1.8%', borderRadius: '0.2rem', background: TI }} />
);
const Bars = () => (
  <svg viewBox="0 0 18 12" width="1.05rem" aria-hidden="true"><g fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></g></svg>
);
const Wifi = () => (
  <svg viewBox="0 0 16 12" width="0.95rem" aria-hidden="true"><path fill="currentColor" d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4 10.4 10.4 0 0 0 .8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.7 6.7 0 0 0 8 4a6.7 6.7 0 0 0-4.6 1.8l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3zM8 12l2.3-2.5a3.2 3.2 0 0 0-4.6 0z" /></svg>
);
const Battery = () => (
  <svg viewBox="0 0 27 12" width="1.6rem" aria-hidden="true"><rect x=".6" y=".6" width="22.8" height="10.8" rx="3.2" fill="none" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.2" /><rect x="2.3" y="2.3" width="15" height="7.4" rx="1.8" fill="currentColor" /><path d="M25 4v4c.8-.3 1.4-1.1 1.4-2s-.6-1.7-1.4-2z" fill="currentColor" fillOpacity=".45" /></svg>
);
export const Phone = ({ children, glow, time = '22:31', bare }: { children: ReactNode; glow?: string; time?: string; bare?: boolean }) => {
  const screen = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLElement>(null);
  const [k, setK] = useState(0);
  useLayoutEffect(() => {
    const s = screen.current, c = canvas.current;
    if (!s || !c) return;
    const fit = () => setK(s.clientWidth / c.offsetWidth);
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(s);
    return () => ro.disconnect();
  }, []);
  return (
    <Stack role="img" aria-label="iPhone" style={{ position: 'relative', height: '90%', aspectRatio: '71.5 / 147.6', flexShrink: 0, borderRadius: '19% / 9.2%', padding: '1.1%', background: TI, boxShadow: `inset 0 0 0 1px rgba(255,255,255,.25), 0 30px 80px -20px ${glow ?? 'rgba(0,0,0,.8)'}` }}>
      <Btn side="left" top="17%" h="5%" /><Btn side="left" top="25%" h="9%" /><Btn side="left" top="36%" h="9%" /><Btn side="right" top="28%" h="14%" />
      <Stack style={{ flex: 1, borderRadius: '18% / 8.7%', padding: '2.3%', background: '#000' }}>
        <Stack ref={screen} style={{ position: 'relative', flex: 1, borderRadius: '15.5% / 7.5%', background: bare ? '#000' : `radial-gradient(120% 60% at 50% 0%, #26303f 0%, ${F.panel} 60%)`, overflow: 'hidden', color: F.ink }}>
          <Stack ref={canvas} style={{ position: 'absolute', top: 0, left: 0, width: '17rem', height: '36.8rem', transform: `scale(${k})`, transformOrigin: '0 0', opacity: k ? 1 : 0 }}>
            <Stack direction="horizontal" align="center" justify="between" style={{ height: '3.2rem', paddingInline: '1.6rem 1.3rem', flexShrink: 0 }}>
              <Text size="sm" color="inherit" weight="semibold" style={{ width: '3.4rem' }}>{time}</Text>
              <Stack direction="horizontal" gap={0.5} align="center"><Bars /><Wifi /><Battery /></Stack>
            </Stack>
            <Stack aria-hidden="true" style={{ position: 'absolute', top: '0.7rem', left: '50%', transform: 'translateX(-50%)', width: '5.6rem', height: '1.65rem', borderRadius: 'var(--radius-full)', background: '#000' }} />
            <Stack gap={1} style={{ flex: 1, paddingInline: '1rem', paddingBlock: '0.6rem 0', minHeight: 0 }}>{children}</Stack>
            <Stack aria-hidden="true" style={{ alignSelf: 'center', width: '6.4rem', height: '0.3rem', margin: '0.6rem 0 0.5rem', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,.85)', flexShrink: 0 }} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
const Note = ({ title, sub, color, delay = 0 }: { title: string; sub: string; color: string; delay?: number }) => (
  <Stack data-pop="" gap={0} padding={1.5} style={{ background: 'rgba(255,255,255,.07)', borderRadius: '0.8rem', borderInlineStart: `3px solid ${color}`, animationDelay: `${delay}s` }}>
    <Text size="xsm" color="inherit" weight="semibold">{title}</Text>
    <Text size="xsm" color="inherit" style={{ color: F.soft }}>{sub}</Text>
  </Stack>
);
export const Center = ({ children, gap = 3 }: { children: ReactNode; gap?: 1 | 2 | 3 | 4 }) => (
  <Stack gap={gap} align="center" justify="center" style={{ ...fill, padding: '6%', textAlign: 'center' }}>{children}</Stack>
);
export const Big = ({ children, color }: { children: ReactNode; color?: string }) => (
  <Text color="inherit" style={{ fontFamily: 'var(--font-family-heading, Georgia, serif)', fontSize: 'clamp(1.3rem, 3.6vw, 2.6rem)', lineHeight: 1.1, color: color ?? F.ink }}>{children}</Text>
);
export const Row = ({ children }: { children: ReactNode }) => (
  <Stack direction="horizontal" gap={4} align="center" justify="center" style={{ ...fill, padding: '5%' }}>{children}</Stack>
);
export const Chip = ({ children, on }: { children: ReactNode; on?: boolean }) => (
  <Text size="sm" color="inherit" style={{ padding: '0.45em 0.9em', borderRadius: 'var(--radius-full)', border: `1px solid ${on ? F.orange : F.line}`, color: on ? '#000' : F.ink, background: on ? F.orange : 'transparent', whiteSpace: 'nowrap' }}>{children}</Text>
);

function Scene({ i }: { i: number }) {
  const t = useT();
  switch (i) {
    case 0: return (
      <Row>
        <Stack gap={1} align="center"><Big color={F.soft}>22:30</Big><Text size="sm" color="inherit" style={{ color: F.soft }}>{t({ de: 'Dienstag', en: 'Tuesday' })}</Text></Stack>
        <Phone glow="rgba(56,193,114,.35)" time="22:30">
          <Stack gap={0.5} align="center" style={{ paddingTop: '2.4rem', textAlign: 'center' }}>
            <Text size="sm" color="inherit" style={{ color: F.soft }}>{t({ de: 'Mobil', en: 'Mobile' })}</Text>
            <Text color="inherit" style={{ fontSize: '1.9rem', lineHeight: 1.15, fontWeight: 400 }}>079 412 33 08</Text>
          </Stack>
          <Stack direction="horizontal" justify="between" align="end" style={{ marginTop: 'auto', paddingInline: '1.4rem', paddingBottom: '2.6rem' }}>
            {[{ c: F.red, l: t({ de: 'Ablehnen', en: 'Decline' }), r: '135deg' }, { c: F.green, l: t({ de: 'Annehmen', en: 'Accept' }), r: '0deg', ring: true }].map(b => (
              <Stack key={b.l} gap={1} align="center">
                <Stack data-ring={b.ring ? '' : undefined} align="center" justify="center" style={{ width: '4.2rem', height: '4.2rem', borderRadius: 'var(--radius-full)', background: b.c }}>
                  <svg viewBox="0 0 24 24" width="1.9rem" aria-hidden="true" style={{ transform: `rotate(${b.r})` }}><path fill="#fff" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" /></svg>
                </Stack>
                <Text size="xsm" color="inherit">{b.l}</Text>
              </Stack>
            ))}
          </Stack>
        </Phone>
      </Row>
    );
    case 1: return (
      <Row>
        <Phone time="22:41">
          <Text size="xsm" color="inherit" weight="semibold" style={{ color: F.soft }}>{t({ de: 'Mitteilungen', en: 'Notifications' })}</Text>
          <Note color={F.red} title={t({ de: 'Verpasster Anruf', en: 'Missed call' })} sub="079 412 33 08 · 22:30" />
          <Note color={F.red} title={t({ de: 'Verpasster Anruf', en: 'Missed call' })} sub="076 220 18 45 · 22:34" delay={0.6} />
          <Note color={F.red} title={t({ de: 'Verpasster Anruf', en: 'Missed call' })} sub="078 903 11 72 · 22:39" delay={1.2} />
        </Phone>
      </Row>
    );
    case 2: return (
      <Center>
        <Stack gap={1.5} padding={3} style={{ width: 'min(30rem, 80%)', background: F.panel, borderRadius: '1rem', textAlign: 'left', boxShadow: `0 0 0 1px ${F.line}` }}>
          <Text size="sm" color="inherit" style={{ padding: '0.5em 1em', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,.08)' }}>🔍 {t({ de: 'Sanitär Notfall Brugg', en: 'Emergency plumber Brugg' })}</Text>
          {[{ n: t({ de: 'Konkurrenz AG · 24h erreichbar', en: 'Competitor Ltd · 24h service' }), hot: true }, { n: t({ de: 'Ihr Betrieb · nicht erreichbar', en: 'Your business · not answering' }), hot: false }].map((r, k) => (
            <Stack key={k} data-pop="" gap={0} padding={1.5} style={{ borderRadius: '0.6rem', background: r.hot ? 'rgba(252,163,17,.12)' : 'transparent', border: `1px solid ${r.hot ? F.orange : F.line}`, opacity: r.hot ? 1 : 0.5, animationDelay: `${k * 0.5}s` }}>
              <Text size="sm" color="inherit" weight="semibold">{r.n}</Text>
              <Text size="xsm" color="inherit" style={{ color: F.soft }}>{r.hot ? t({ de: '★★★★★ · Jetzt anrufen', en: '★★★★★ · Call now' }) : t({ de: '3 verpasste Anrufe', en: '3 missed calls' })}</Text>
            </Stack>
          ))}
        </Stack>
      </Center>
    );
    case 3: return (
      <Center>
        <Text color="inherit" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', color: F.orange }}>Cung Solutions</Text>
        <Big>{t({ de: 'Mit Automationen', en: 'With automations' })}<br /><span style={{ color: F.orange }}>{t({ de: 'passiert das nicht mehr.', en: 'that stops.' })}</span></Big>
      </Center>
    );
    case 4: return (
      <Row>
        <Stack gap={1} style={{ maxWidth: '30%' }}><Chip>{t({ de: 'Verpasster Anruf', en: 'Missed call' })}</Chip><Text color="inherit" style={{ color: F.orange, fontSize: '1.4rem' }}>↓</Text><Chip on>{t({ de: 'SMS in 1 Minute', en: 'Text in 1 minute' })}</Chip></Stack>
        <Phone glow="rgba(252,163,17,.35)">
          <Text size="xsm" color="inherit" style={{ color: F.soft }}>SMS · 22:31</Text>
          <Stack data-pop="" padding={1.5} style={{ background: 'rgba(255,255,255,.08)', borderRadius: '0.8rem' }}>
            <Text size="xsm" color="inherit">{t({ de: 'Guten Abend, wir haben Ihren Anruf verpasst. Rückruf morgen ab 7 Uhr oder direkt Termin buchen: muster-sanitaer.ch/termin', en: 'Good evening, we missed your call. Callback tomorrow from 7 am, or book directly: muster-sanitaer.ch/book' })}</Text>
          </Stack>
        </Phone>
      </Row>
    );
    case 5: return (
      <Center gap={2}>
        <Stack gap={1} padding={2} style={{ width: 'min(32rem, 86%)', background: F.panel, borderRadius: '1rem', textAlign: 'left', boxShadow: `0 0 0 1px ${F.line}` }}>
          <Text size="xsm" color="inherit" weight="semibold" style={{ color: F.orange }}>{t({ de: 'Alle Anfragen · eine Liste', en: 'All enquiries · one list' })}</Text>
          {[['E-Mail', 'Laura Meier', '22:48'], ['WhatsApp', 'Marco Keller', '23:05'], [t({ de: 'Formular', en: 'Form' }), 'Firma Brun AG', '23:17']].map(([ch, n, time], k) => (
            <Stack key={n} data-pop="" direction="horizontal" justify="between" align="center" gap={2} paddingBlock={1} style={{ borderTop: `1px solid ${F.line}`, animationDelay: `${k * 0.5}s` }}>
              <Text size="sm" color="inherit"><span style={{ color: F.soft }}>{ch} · </span>{n}</Text>
              <Text size="xsm" color="inherit" style={{ color: F.green, whiteSpace: 'nowrap' }}>✓ {t({ de: 'beantwortet', en: 'replied' })} {time}</Text>
            </Stack>
          ))}
        </Stack>
      </Center>
    );
    case 6: return (
      <Center>
        <Stack style={{ width: 'min(22rem, 70%)', textAlign: 'left' }}>
          <WhatsAppChat business="Muster Sanitär" msgs={[
            { from: 'customer', time: '00:04', text: t({ de: 'Habt ihr morgen Zeit? Unser Boiler tropft.', en: 'Are you free tomorrow? Our boiler is leaking.' }) },
            { from: 'agent', time: '00:04', text: t({ de: 'Ja, morgen um 8:00 oder 13:30. Welche Zeit passt Ihnen?', en: 'Yes, tomorrow at 8:00 or 13:30. Which suits you?' }) },
            { from: 'customer', time: '00:05', text: '8:00 👍' },
          ]} />
        </Stack>
      </Center>
    );
    case 7: return (
      <Row>
        <Stack gap={1} padding={2} style={{ width: '40%', background: F.panel, borderRadius: '1rem', boxShadow: `0 0 0 1px ${F.line}` }}>
          <Text size="xsm" color="inherit" style={{ color: F.soft }}>{t({ de: 'Mittwoch', en: 'Wednesday' })}</Text>
          {['07:00', '08:00', '09:00'].map(h => (
            <Stack key={h} direction="horizontal" gap={2} align="center" style={{ borderTop: `1px solid ${F.line}`, minHeight: '2.2rem' }}>
              <Text size="xsm" color="inherit" style={{ color: F.soft, width: '2.8rem' }}>{h}</Text>
              {h === '08:00' && <Text data-pop="" size="xsm" color="inherit" weight="semibold" style={{ background: F.orange, color: '#000', padding: '0.35em 0.7em', borderRadius: '0.4rem' }}>{t({ de: 'Boiler · Marco Keller', en: 'Boiler · Marco Keller' })}</Text>}
            </Stack>
          ))}
        </Stack>
        <Phone time="18:00"><Text size="xsm" color="inherit" style={{ color: F.soft }}>{t({ de: 'Dienstag', en: 'Tuesday' })}</Text><Note color={F.orange} title={t({ de: 'Erinnerung', en: 'Reminder' })} sub={t({ de: 'Morgen 8:00 · Muster Sanitär', en: 'Tomorrow 8:00 · Muster Sanitär' })} /></Phone>
      </Row>
    );
    case 8: return (
      <Center>
        <Stack direction="horizontal" gap={1.5} align="center" wrap="wrap" justify="center">
          <Chip>{t({ de: 'Offerte #2041 verschickt', en: 'Quote #2041 sent' })}</Chip><Text color="inherit" style={{ color: F.soft }}>→ 5 {t({ de: 'Tage', en: 'days' })} →</Text><Chip on>{t({ de: 'Freundliches Nachfassen', en: 'Friendly follow-up' })}</Chip>
        </Stack>
        <Text size="sm" color="inherit" style={{ color: F.soft, maxWidth: '28rem' }}>{t({ de: '«Guten Tag Frau Meier, haben Sie unsere Offerte erhalten? Gerne beantworte ich Ihre Fragen.»', en: '“Hello Ms Meier, did you receive our quote? Happy to answer any questions.”' })}</Text>
      </Center>
    );
    case 9: return (
      <Row>
        <Stack data-pop="" gap={1} align="center" padding={3} style={{ background: F.panel, borderRadius: '1rem', boxShadow: `0 0 0 1px ${F.line}` }}>
          <Text color="inherit" style={{ color: F.orange, fontSize: '1.6rem', letterSpacing: '0.1em' }}>★★★★★</Text>
          <Text size="sm" color="inherit">{t({ de: 'Wie zufrieden waren Sie?', en: 'How happy were you?' })}</Text>
        </Stack>
        <Stack data-pop="" gap={0.5} padding={3} style={{ background: F.panel, borderRadius: '1rem', boxShadow: `0 0 0 1px ${F.line}`, animationDelay: '0.8s' }}>
          <Text size="xsm" color="inherit" style={{ color: F.soft }}>{t({ de: 'Rechnung R-1187 · 14 Tage offen', en: 'Invoice R-1187 · 14 days open' })}</Text>
          <Text size="sm" color="inherit" weight="semibold">{t({ de: 'Freundliche Zahlungserinnerung gesendet', en: 'Friendly payment reminder sent' })}</Text>
        </Stack>
      </Row>
    );
    case 10: return (
      <Center>
        <Stack direction="horizontal" gap={1.5} align="center" padding={2} style={{ background: F.panel, borderRadius: '1rem', boxShadow: `0 0 0 1px ${F.line}` }}>
          <Text size="sm" color="inherit">{t({ de: 'Antwort an Laura Meier', en: 'Reply to Laura Meier' })}</Text>
          <Chip on>{t({ de: 'Freigeben ✓', en: 'Approve ✓' })}</Chip>
        </Stack>
        <Text size="sm" color="inherit" style={{ color: F.soft }}>🇨🇭 / 🇪🇺 {t({ de: 'Daten in der Schweiz oder der EU', en: 'Data in Switzerland or the EU' })}</Text>
      </Center>
    );
    case 11: return (
      <Center gap={1}>
        <Text color="inherit" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', color: F.soft }}>{t({ de: 'Anfragen-Autopilot', en: 'Enquiry Autopilot' })}</Text>
        <Big color={F.orange}>{t({ de: `ab ${chf(AUTOPILOT_MONTHLY)} / Monat`, en: `from ${chf(AUTOPILOT_MONTHLY)} / month` })}</Big>
        <Text size="sm" color="inherit" style={{ color: F.soft }}>{t({ de: 'Keine Einrichtungsgebühr', en: 'No setup fee' })}</Text>
      </Center>
    );
    default: return (
      <Center gap={2}>
        <Big>{t({ de: 'Kostenloses Gespräch, 20 Minuten', en: 'Free call, 20 minutes' })}</Big>
        <Chip on>{t({ de: 'Jetzt buchen →', en: 'Book now →' })}</Chip>
      </Center>
    );
  }
}

/** Scene player synced to a voiceover; shared by the automations film and the website promo. */
export function FilmPlayer({ lines, voice, scene, nightUntil = 0, label }: { lines: Line[]; voice: { de: string; en: string }; scene: (i: number) => ReactNode; nightUntil?: number; label: T }) {
  const t = useT();
  const lang = t({ de: 'de', en: 'en' }) as 'de' | 'en';
  const audio = useRef<HTMLAudioElement>(null);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  // Captions are off by default; the visitor's choice is remembered across both films.
  const [cc, setCc] = useState(() => { try { return localStorage.getItem('cung-cc') === '1'; } catch { return false; } });
  const toggleCc = () => setCc(v => { try { localStorage.setItem('cung-cc', v ? '0' : '1'); } catch { /* storage blocked */ } return !v; });
  const [dur, setDur] = useState(lines[lines.length - 1].at[lang] + 4);
  const idx = Math.max(0, lines.findLastIndex(l => time >= l.at[lang]));
  const night = idx < nightUntil;

  useEffect(() => { audio.current?.pause(); setPlaying(false); setTime(0); }, [lang]);
  useEffect(() => {
    if (!playing) return;
    let id = 0;
    const tick = () => { if (audio.current) setTime(audio.current.currentTime); id = requestAnimationFrame(tick); };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [playing]);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    // KGC: the film sat on the dimmed first frame for 1-2 s. Drop the overlay on the click itself, not when the audio finally starts.
    if (a.paused) { if (a.ended) a.currentTime = 0; setPlaying(true); a.play().catch(() => setPlaying(false)); } else a.pause();
  };
  const seek = (s: number) => { if (audio.current) { audio.current.currentTime = s; setTime(s); } };

  return (
    <Stack gap={2}>
      <Card padding={0} elevation="high" style={{ overflow: 'hidden', background: F.night /* the film keeps its own night look in both themes */ }}>
        <AspectRatio ratio={16 / 9}>
          <Stack onClick={toggle} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } }} role="button" tabIndex={0} aria-label={playing ? t({ de: 'Film pausieren', en: 'Pause film' }) : t({ de: 'Film abspielen', en: 'Play film' })} style={{ position: 'relative', height: '100%', cursor: 'pointer', color: F.ink, overflow: 'hidden',
            background: night ? `radial-gradient(60% 70% at 70% 40%, rgba(40,60,90,.35), transparent), ${F.night}` : `radial-gradient(70% 80% at 50% 30%, rgba(252,163,17,.18), transparent), ${F.night}`, transition: 'background 1s' }}>
            <Stack key={idx} data-scene="" style={fill}>{scene(idx)}</Stack>
            {/* subtitles (off by default, toggled below) */}
            {cc && (playing || time > 0) && (
              <Stack style={{ position: 'absolute', insetInline: 0, bottom: 0, padding: '1.5% 6% 3%', background: 'linear-gradient(transparent, rgba(0,0,0,.75))' }}>
                <Text size="sm" color="inherit" justify="center" style={{ textShadow: '0 1px 3px #000' }}>{t(lines[idx].text)}</Text>
              </Stack>
            )}
            {!playing && (
              <Stack align="center" justify="center" gap={1} style={{ ...fill, background: 'rgba(0,0,0,.35)' }}>
                <Stack align="center" justify="center" style={{ width: '4.2rem', height: '4.2rem', borderRadius: 'var(--radius-full)', background: F.orange, color: '#000', boxShadow: '0 10px 40px rgba(252,163,17,.45)' }}>
                  <Text color="inherit" style={{ fontSize: '1.6rem', marginInlineStart: '0.2rem' }}>▶</Text>
                </Stack>
                <Text size="sm" color="inherit" weight="semibold">{t(label)}</Text>
              </Stack>
            )}
          </Stack>
        </AspectRatio>
      </Card>
      <Stack direction="horizontal" gap={2} align="center">
        <Button variant="secondary" icon={ic(playing ? UI.pause : UI.play)} label={playing ? t({ de: 'Pause', en: 'Pause' }) : t({ de: 'Abspielen', en: 'Play' })} onClick={toggle} />
        <Stack role="slider" aria-label={t({ de: 'Position im Film', en: 'Film position' })} aria-valuemin={0} aria-valuemax={Math.round(dur)} aria-valuenow={Math.round(time)} aria-valuetext={`${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')} / ${Math.floor(dur / 60)}:${String(Math.floor(dur % 60)).padStart(2, '0')}`} tabIndex={0}
          onClick={e => { const r = e.currentTarget.getBoundingClientRect(); seek(((e.clientX - r.left) / r.width) * dur); }}
          onKeyDown={e => { if (e.key === 'ArrowRight') seek(Math.min(dur, time + 5)); if (e.key === 'ArrowLeft') seek(Math.max(0, time - 5)); if (e.key === 'Home') seek(0); if (e.key === 'End') seek(dur); }}
          justify="center" style={{ flex: 1, height: '2.5rem', cursor: 'pointer' }}>
          <Stack style={{ position: 'relative', height: '0.4rem', borderRadius: 'var(--radius-full)', background: 'var(--color-background-muted)' }}>
            <Stack style={{ position: 'absolute', insetBlock: 0, left: 0, width: `${(time / dur) * 100}%`, borderRadius: 'var(--radius-full)', background: 'var(--color-accent)' }} />
          </Stack>
        </Stack>
        <Text size="xsm" color="secondary" hasTabularNumbers>{`${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`}</Text>
        <Button variant={cc ? 'primary' : 'secondary'} icon={ic(UI.cc)} isIconOnly aria-pressed={cc} onClick={toggleCc}
          label={cc ? t({ de: 'Untertitel ausschalten', en: 'Turn captions off' }) : t({ de: 'Untertitel einschalten', en: 'Turn captions on' })} />
      </Stack>
      <audio ref={audio} src={voice[lang]} preload="auto"
        onPlay={e => { e.currentTarget.playbackRate = SPEED; setPlaying(true); }} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)}
        onLoadedMetadata={e => { const d = e.currentTarget.duration; if (Number.isFinite(d)) setDur(d); }} />
    </Stack>
  );
}

export default function AutomationFilm() {
  return <FilmPlayer lines={LINES} voice={VOICE} scene={i => <Scene i={i} />} nightUntil={3} label={{ de: 'Film ansehen · 1 Minute, mit Ton', en: 'Watch the film · 1 minute, with sound' }} />;
}
