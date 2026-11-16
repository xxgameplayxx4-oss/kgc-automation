import { useState, type CSSProperties, type ReactNode } from 'react';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { CheckboxInput } from '@astryxdesign/core/CheckboxInput';
import { Divider } from '@astryxdesign/core/Divider';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Link } from '@astryxdesign/core/Link';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import { Stack } from '@astryxdesign/core/Stack';
import { StatusDot } from '@astryxdesign/core/StatusDot';
import { Switch } from '@astryxdesign/core/Switch';
import { Text } from '@astryxdesign/core/Text';
import Eyebrow from './Eyebrow';
import { AutomationFlow, HoursWeek, PriceCalc, PricelistPost } from './AddonPreviews';
import { ADDON_ICONS } from './addonIcons';
import { AUTOMATIONS, AUTOMATION_MONTHLY, CARE, PRINT, TIERS, chf, contactDraft, quote, useT, type T } from '../data';
import { UI, ic } from './uiIcons';

// Dev-only self-check of the pricing maths (prices come from data.ts).
if (import.meta.env.DEV) {
  console.assert(quote(TIERS[0], new Set()).total === 2000, 'Core alone = 2000');
  console.assert(quote(TIERS[1], new Set(['flyer', 'cards'])).total === 3200, 'Pro + flyer + cards = 3200');
}

type Device = 'desktop' | 'phone';
const IMG = '/demo/r1.webp';
const pop = { 'data-pop': '' } as Record<string, string>;
const abs = (s: CSSProperties): CSSProperties => ({ position: 'absolute', ...s });

// The sample restaurant has its own brand, so its colours stay fixed in both site themes.
export const C = { paper: '#f6f1e8', card: '#fffcf6', ink: '#231a12', soft: '#75644f', line: 'rgba(35, 26, 18, 0.14)', accent: '#a5482a', night: '#1c1510' };
export const serif: CSSProperties = { fontFamily: 'var(--font-family-heading, Georgia, serif)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.01em' };
export const caps: CSSProperties = { letterSpacing: '0.18em', textTransform: 'uppercase', fontSize: '0.68em', fontWeight: 600 };

// Tavola's hours, by getDay(): [open, close] in hours. Same logic as the souperbe and Barber House sites.
const HOURS: Record<number, [number, number]> = { 2: [12, 23], 3: [12, 23], 4: [12, 23], 5: [12, 23], 6: [10, 23] };
const openNow = (d = new Date()) => {
  const h = HOURS[d.getDay()];
  const now = d.getHours() + d.getMinutes() / 60;
  return h && now >= h[0] && now < h[1] ? h[1] : null;
};
if (import.meta.env.DEV) {
  console.assert(openNow(new Date(2026, 10, 13, 20)) === 23 && openNow(new Date(2026, 10, 16, 20)) === null, 'open-now: Fri 20:00 open, Mon closed');
}

const MENU: Record<string, [T, string][]> = {
  start: [[{ de: 'Kürbissuppe, Kernöl, Brotcroûtons', en: 'Pumpkin soup, seed oil, croûtons' }, '12'], [{ de: 'Vitello tonnato, Kapernäpfel', en: 'Vitello tonnato, caper berries' }, '19'], [{ de: 'Burrata, Ofentomaten', en: 'Burrata, roast tomatoes' }, '18']],
  main: [[{ de: 'Kürbisrisotto, Salbeibutter', en: 'Pumpkin risotto, sage butter' }, '28'], [{ de: 'Kalbsbäggli, Polenta, Jus', en: 'Veal cheeks, polenta, jus' }, '42'], [{ de: 'Saibling, Fenchel, Zitrone', en: 'Char, fennel, lemon' }, '36']],
  sweet: [[{ de: 'Tiramisù della casa', en: 'House tiramisù' }, '12'], [{ de: 'Zwetschgen-Crumble, Vanilleglace', en: 'Plum crumble, vanilla ice cream' }, '11']],
};

const Caps = ({ children, color }: { children: ReactNode; color?: string }) => <Text color="inherit" style={{ ...caps, color: color ?? C.soft }}>{children}</Text>;
const Serif = ({ children, size }: { children: ReactNode; size: string }) => <Text color="inherit" style={{ ...serif, fontSize: size }}>{children}</Text>;
/** Button look of the sample brand (it is a mock, so nothing is clickable). */
const Pill = ({ children, solid, light }: { children: ReactNode; solid?: boolean; light?: boolean }) => (
  <Stack direction="horizontal" align="center" style={{
    ...caps, fontSize: '0.66em', padding: '0.95em 1.6em', borderRadius: 'var(--radius-full)',
    background: solid ? (light ? C.paper : C.ink) : 'transparent', color: solid ? (light ? C.ink : C.paper) : 'inherit',
    border: `1px solid ${solid ? 'transparent' : 'currentColor'}`, whiteSpace: 'nowrap',
  }}>{children}</Stack>
);
const Photo = ({ src, ratio, pos }: { src: string; ratio: number; pos?: string }) => (
  <AspectRatio ratio={ratio} fit="cover"><img src={src} alt="" loading="lazy" decoding="async" style={{ objectPosition: pos ?? 'center' }} /></AspectRatio>
);

/** A sample restaurant site ("Tavola") that grows with every selected add-on. */
type Mark = (id: string) => Record<string, string>;
function Site({ pro, has, phone, mark }: { pro: boolean; has: (id: string) => boolean; phone: boolean; mark: Mark }) {
  const t = useT();
  const [menuTab, setMenuTab] = useState('main');
  const until = openNow();
  const gutter = phone ? 3 : 6;
  const links = [{ de: 'Haus', en: 'About' }, { de: 'Karte', en: 'Menu' }, ...(has('page') ? [{ de: 'Team', en: 'Team' }] : []), { de: 'Besuch', en: 'Visit' }];
  const Sec = ({ children, id }: { children: ReactNode; id: string }) => (
    <Stack {...pop} {...mark(id)} data-sec="" key={id} gap={3} paddingInline={gutter} paddingBlock={phone ? 5 : 6} style={{ borderTop: `1px solid ${C.line}` }}>{children}</Stack>
  );
  const Head = ({ k, title }: { k: T; title: T }) => (
    <Stack gap={1}><Caps color={C.accent}>{t(k)}</Caps><Serif size={phone ? '1.6em' : '2em'}>{t(title)}</Serif></Stack>
  );
  const openBadge = has('hours') && (
    <Stack {...pop} direction="horizontal" gap={1} align="center">
      <StatusDot variant={until ? 'success' : 'error'} label="" />
      <Text size="xsm" color="inherit">{until ? t({ de: `Jetzt geöffnet · bis ${until}:00`, en: `Open now · until ${until}:00` }) : t({ de: 'Gerade geschlossen', en: 'Closed right now' })}</Text>
    </Stack>
  );
  const stars = has('reviews') && <Text {...pop} {...mark('reviews')} size="xsm" color="inherit">★★★★★ &nbsp;4,8 · 126 Google</Text>;

  const nav = (
    <Stack direction="horizontal" justify="between" align="center" gap={3} paddingInline={gutter} paddingBlock={phone ? 2 : 3}>
      <Text color="inherit" style={{ ...serif, fontStyle: 'italic', fontSize: '1.55em' }}>Tavola</Text>
      <Stack direction="horizontal" gap={phone ? 2 : 4} align="center">
        {!phone && links.map(l => <Text key={l.en} color="inherit" style={caps}>{t(l)}</Text>)}
        {has('lang') && <Text {...pop} {...mark('lang')} color="inherit" style={caps}>DE / EN</Text>}
        {phone ? <Text color="inherit" style={{ fontSize: '1.3em' }}>≡</Text> : <Pill>{t({ de: 'Reservieren', en: 'Book' })}</Pill>}
      </Stack>
    </Stack>
  );

  const hero = pro ? (
    <Stack style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate', color: C.paper, minHeight: phone ? '30rem' : '34rem' }}>
      <Stack style={{ ...abs({ inset: 0, zIndex: -1 }), backgroundImage: `linear-gradient(180deg, rgba(20,14,10,.55), rgba(20,14,10,.1) 35%, rgba(20,14,10,.85)), url(${IMG})`, backgroundSize: 'cover', backgroundPosition: 'center', animation: 'kb 14s ease-out both' }} />
      {nav}
      <Stack gap={3} paddingInline={gutter} paddingBlockEnd={phone ? 5 : 8} style={{ marginTop: 'auto' }}>
        <Stack direction="horizontal"><Text {...pop} {...mark('hero')} size="xsm" color="inherit" style={{ ...caps, padding: '0.5em 1em', borderRadius: 'var(--radius-full)', background: 'rgba(246,241,232,.18)', border: '1px solid rgba(246,241,232,.5)' }}>▶ {t({ de: 'Film: Eingang zu Ihrem Geschäft', en: 'Film: walking into your business' })}</Text></Stack>
        <Caps color={C.paper}>{t({ de: 'Osteria · Altstadt Baden · seit 2009', en: 'Osteria · Baden old town · since 2009' })}</Caps>
        <Serif size={phone ? '2.7em' : '4.4em'}>{t({ de: 'Kochen, schenken,', en: 'Cook, pour,' })}<br /><em>{t({ de: 'geniessen.', en: 'enjoy.' })}</em></Serif>
        <Stack direction={phone ? 'vertical' : 'horizontal'} gap={3} align={phone ? 'start' : 'center'} justify="between">
          <Stack direction="horizontal" gap={1.5} wrap="wrap">
            <Pill solid light>{t({ de: 'Tisch reservieren', en: 'Book a table' })}</Pill>
            <Pill>{t({ de: 'Zur Karte', en: 'See the menu' })}</Pill>
          </Stack>
          <Stack gap={1} align={phone ? 'start' : 'end'}>{stars}{openBadge}</Stack>
        </Stack>
      </Stack>
    </Stack>
  ) : (
    <Stack>
      {nav}
      <Stack paddingInline={gutter} paddingBlockStart={phone ? 1 : 3} paddingBlockEnd={phone ? 5 : 8}><Grid columns={phone ? 1 : 2} gap={phone ? 4 : 6} align="center">
        <Stack gap={3} style={{ order: phone ? 2 : 0 }}>
          <Caps color={C.accent}>{t({ de: 'Osteria · Altstadt Baden', en: 'Osteria · Baden old town' })}</Caps>
          <Serif size={phone ? '2.4em' : '3.4em'}>{t({ de: 'Saisonal gekocht,', en: 'Cooked with the season,' })}<br /><em>{t({ de: 'gern geteilt.', en: 'made to share.' })}</em></Serif>
          <Text color="inherit" style={{ color: C.soft, maxWidth: '30em', lineHeight: 1.6 }}>{t({ de: 'Kleine Karte, die jede Woche wechselt. Gemüse vom Wochenmarkt, Wein aus dem Piemont und dem Aargau.', en: 'A small menu that changes every week. Vegetables from the market, wine from Piedmont and Aargau.' })}</Text>
          <Stack direction="horizontal" gap={1.5} wrap="wrap"><Pill solid>{t({ de: 'Tisch reservieren', en: 'Book a table' })}</Pill><Pill>{t({ de: 'Zur Karte', en: 'See the menu' })}</Pill></Stack>
          {stars}{openBadge}
        </Stack>
        <Photo src={IMG} ratio={phone ? 4 / 3 : 4 / 5} pos="30% center" />
      </Grid></Stack>
    </Stack>
  );

  const days = [['Mo', '16'], ['Di', '17'], ['Mi', '18'], ['Do', '19'], ['Fr', '20'], ['Sa', '21'], ['So', '22']];
  return (
    <Stack style={{ background: C.paper, color: C.ink, fontSize: phone ? '0.82rem' : '0.95rem' }}>
      {hero}

      <Stack paddingInline={gutter} paddingBlock={phone ? 5 : 6} style={{ borderTop: `1px solid ${C.line}` }}><Grid columns={phone ? 1 : 3} gap={phone ? 3 : 4}>
        {[
          ['01', { de: 'Saisonal', en: 'Seasonal' }, { de: 'Die Karte folgt dem Markt, nicht dem Kalender.', en: 'The menu follows the market, not the calendar.' }],
          ['02', { de: 'Regional', en: 'Regional' }, { de: 'Fleisch und Käse aus dem Aargau.', en: 'Meat and cheese from Aargau.' }],
          ['03', { de: 'Hausgemacht', en: 'Homemade' }, { de: 'Pasta, Brot und Glace aus der eigenen Küche.', en: 'Pasta, bread and ice cream from our kitchen.' }],
        ].map(([n, h, d]) => (
          <Stack key={n as string} gap={1}>
            <Text color="inherit" style={{ ...serif, fontSize: '1.1em', color: C.accent }}>{n as string}</Text>
            <Text color="inherit" weight="semibold">{t(h as T)}</Text>
            <Text size="sm" color="inherit" style={{ color: C.soft }}>{t(d as T)}</Text>
          </Stack>
        ))}
      </Grid></Stack>

      <Stack paddingInline={gutter} paddingBlockEnd={phone ? 5 : 6}><Grid columns={phone ? 2 : 3} gap={2}>
        {([['/demo/r4.webp', { de: 'Mittag', en: 'Lunch' }], ['/demo/r5.webp', { de: 'Abend', en: 'Dinner' }], ['/demo/r6.webp', { de: 'Apéro', en: 'Apéritif' }]] as [string, T][])
          .slice(0, phone ? 2 : 3).map(([src, n]) => (
            <Stack key={src} gap={1}><Photo src={src} ratio={phone ? 1 : 4 / 5} /><Caps>{t(n)}</Caps></Stack>
          ))}
      </Grid></Stack>

      {has('booking') && (
        <Sec id="booking">
          <Head k={{ de: 'Reservation', en: 'Reservation' }} title={{ de: 'Ihr Tisch, in drei Schritten', en: 'Your table, in three steps' }} />
          <Grid columns={phone ? 1 : 3} gap={3} align="stretch">
          <Stack gap={3} padding={phone ? 3 : 4} style={{ gridColumn: phone ? undefined : 'span 2', background: C.card, border: `1px solid ${C.line}`, borderRadius: 'var(--radius-container)', boxShadow: '0 18px 40px -24px rgba(35,26,18,.45)' }}>
            <Stack direction="horizontal" gap={2} align="center">
              {[{ de: 'Personen', en: 'Guests' }, { de: 'Datum & Zeit', en: 'Date & time' }, { de: 'Kontakt', en: 'Contact' }].map((s, i) => (
                <Stack key={s.en} direction="horizontal" gap={1} align="center" style={{ flex: i < 2 ? 1 : undefined, opacity: i < 2 ? 1 : 0.4 }}>
                  <Text size="xsm" color="inherit" style={{ width: '1.7em', height: '1.7em', display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-full)', background: i === 0 ? C.accent : i === 1 ? C.ink : 'transparent', color: i < 2 ? C.paper : C.ink, border: `1px solid ${i === 0 ? C.accent : C.ink}` }}>{i === 0 ? '✓' : i + 1}</Text>
                  {!phone && <Text size="xsm" color="inherit" style={caps}>{t(s)}</Text>}
                  {i < 2 && <Stack style={{ flex: 1, height: 1, background: i === 0 ? C.accent : C.line }} />}
                </Stack>
              ))}
            </Stack>
            <Stack direction="horizontal" gap={1} align="center" wrap="wrap">
              <Caps>{t({ de: 'Personen', en: 'Guests' })}</Caps>
              {['1', '2', '3', '4', '5', '6+'].map(n => (
                <Text key={n} size="sm" color="inherit" style={{ minWidth: '2.2em', textAlign: 'center', padding: '0.3em 0.5em', borderRadius: 'var(--radius-element)', border: `1px solid ${n === '2' ? C.ink : C.line}`, background: n === '2' ? C.ink : 'transparent', color: n === '2' ? C.paper : C.ink }}>{n}</Text>
              ))}
            </Stack>
            <Grid columns={7} gap={1}>
              {days.slice(0, 7).map(([d, n], i) => (
                <Stack key={n} align="center" gap={0.5} paddingBlock={1.5} style={{ borderRadius: 'var(--radius-element)', background: i === 4 ? C.ink : 'transparent', color: i === 4 ? C.paper : C.ink, opacity: i === 0 ? 0.3 : 1, border: `1px solid ${i === 4 ? C.ink : C.line}` }}>
                  <Text color="inherit" style={{ ...caps, fontSize: '0.6em' }}>{d}</Text>
                  <Text color="inherit" style={{ ...serif, fontSize: '1.25em' }}>{n}</Text>
                </Stack>
              ))}
            </Grid>
            <Stack direction="horizontal" gap={1} wrap="wrap">
              {['18:00', '18:30', '19:30', '20:00', '21:00'].map(h => (
                <Text key={h} size="sm" color="inherit" hasTabularNumbers style={{ padding: '0.45em 0.9em', borderRadius: 'var(--radius-full)', border: `1px solid ${h === '19:30' ? C.accent : C.line}`, background: h === '19:30' ? C.accent : 'transparent', color: h === '19:30' ? C.paper : C.ink, textDecoration: h === '18:30' ? 'line-through' : undefined, opacity: h === '18:30' ? 0.4 : 1 }}>{h}</Text>
              ))}
            </Stack>
            <Stack direction="horizontal" justify="between" align="center" gap={2} wrap="wrap">
              <Text size="sm" color="inherit" style={{ color: C.soft }}>{t({ de: 'Fr., 20. Nov. · 19:30 · 2 Personen', en: 'Fri, 20 Nov · 7:30 pm · 2 guests' })}</Text>
              <Pill solid>{t({ de: 'Weiter', en: 'Continue' })} →</Pill>
            </Stack>
          </Stack>
          {/* what the guest sees after step 3 */}
          <Stack gap={2} padding={phone ? 3 : 4} justify="between" style={{ background: C.night, color: C.paper, borderRadius: 'var(--radius-container)' }}>
            <Stack gap={2}>
              <Stack direction="horizontal" gap={1.5} align="center">
                <Text size="sm" color="inherit" style={{ width: '1.8em', height: '1.8em', display: 'grid', placeItems: 'center', borderRadius: 'var(--radius-full)', background: '#3f8f5a' }}>✓</Text>
                <Caps color={C.paper}>{t({ de: 'Reservation bestätigt', en: 'Booking confirmed' })}</Caps>
              </Stack>
              <Serif size="1.6em">{t({ de: 'Fr., 20. Nov.', en: 'Fri, 20 Nov' })}<br /><em>19:30 · {t({ de: '2 Personen', en: '2 guests' })}</em></Serif>
            </Stack>
            <Stack gap={1}>
              <Text size="xsm" color="inherit" style={{ opacity: 0.7 }}>{t({ de: 'Nummer', en: 'Number' })} TV-48213</Text>
              <Text size="xsm" color="inherit" style={{ opacity: 0.7 }}>{t({ de: 'Bestätigung per E-Mail gesendet', en: 'Confirmation sent by email' })}</Text>
              <Text size="xsm" color="inherit" style={{ ...caps, color: '#e3a37f' }}>{t({ de: '+ In Kalender eintragen', en: '+ Add to calendar' })}</Text>
            </Stack>
          </Stack>
          </Grid>
        </Sec>
      )}

      {has('menu') && (
        <Sec id="menu">
          <Stack direction={phone ? 'vertical' : 'horizontal'} justify="between" align={phone ? 'start' : 'end'} gap={2}>
            <Head k={{ de: 'Diese Woche', en: 'This week' }} title={{ de: 'Die Karte', en: 'The menu' }} />
            <Stack direction="horizontal" gap={3}>
              {([['start', { de: 'Vorspeisen', en: 'Starters' }], ['main', { de: 'Hauptgang', en: 'Mains' }], ['sweet', { de: 'Dessert', en: 'Dessert' }]] as [string, T][]).map(([k, n]) => (
                <Text key={k} as="span" role="button" tabIndex={0} color="inherit" onClick={() => setMenuTab(k)} style={{ ...caps, background: 'none', border: 0, padding: '0.4em 0', cursor: 'pointer', color: menuTab === k ? C.ink : C.soft, borderBottom: `1px solid ${menuTab === k ? C.ink : 'transparent'}` }}>{t(n)}</Text>
              ))}
            </Stack>
          </Stack>
          <Stack gap={2}>
            {(MENU[menuTab] ?? []).map(([n, p]) => (
              <Stack key={p + n.en} direction="horizontal" align="end" gap={1}>
                <Text color="inherit" style={{ ...serif, fontSize: '1.15em' }}>{t(n)}</Text>
                <Stack style={{ flex: 1, borderBottom: `1px dotted ${C.soft}`, marginBottom: '0.35em', minWidth: '1em' }} />
                <Text color="inherit" hasTabularNumbers style={{ ...serif, fontSize: '1.15em' }}>{p}</Text>
              </Stack>
            ))}
          </Stack>
        </Sec>
      )}

      {has('reviews') && (
        <Sec id="reviews">
          <Stack gap={2} align="center" style={{ textAlign: 'center' }}>
            <Text color="inherit" style={{ color: C.accent, letterSpacing: '0.2em' }}>★★★★★</Text>
            <Serif size={phone ? '1.45em' : '1.9em'}>{t({ de: '«Das beste Risotto in Baden. Und ein Service, bei dem man gern sitzen bleibt.»', en: '“The best risotto in Baden. And service that makes you want to stay.”' })}</Serif>
            <Caps>{t({ de: 'Sandra M. · Google-Bewertung', en: 'Sandra M. · Google review' })}</Caps>
          </Stack>
        </Sec>
      )}

      {has('pricefinder') && (
        <Sec id="pricefinder">
          <Head k={{ de: 'Anlässe', en: 'Events' }} title={{ de: 'Apéro für Ihren Anlass', en: 'Apéritif for your event' }} />
          <PriceCalc phone={phone} />
        </Sec>
      )}

      {has('hours') && (
        <Sec id="hours">
          <Head k={{ de: 'Öffnungszeiten', en: 'Opening hours' }} title={{ de: 'Wann wir für Sie da sind', en: 'When we are open' }} />
          <HoursWeek hours={HOURS} phone={phone} />
        </Sec>
      )}

      {has('schedule') && (
        <Sec id="schedule">
          <Head k={{ de: 'Agenda', en: 'What’s on' }} title={{ de: 'Diese Woche im Tavola', en: 'This week at Tavola' }} />
          <Stack>
            {[
              ['Mi 18', 'Wed 18', '19:00', { de: 'Weindegustation Piemont', en: 'Piedmont wine tasting' }],
              ['Fr 20', 'Fri 20', '20:30', { de: 'Live-Jazz im Garten', en: 'Live jazz in the garden' }],
              ['Sa 21', 'Sat 21', '10:00', { de: 'Pasta-Kochkurs', en: 'Pasta cooking class' }],
            ].map(([de, en, time, what]) => (
              <Stack key={de as string} direction="horizontal" gap={3} align="center" paddingBlock={2} style={{ borderBottom: `1px solid ${C.line}` }}>
                <Text color="inherit" style={{ ...caps, width: '4.5em', color: C.accent }}>{t({ de: de as string, en: en as string })}</Text>
                <Text color="inherit" style={{ ...serif, fontSize: '1.15em', flex: 1 }}>{t(what as T)}</Text>
                <Text size="sm" color="inherit" hasTabularNumbers style={{ color: C.soft }}>{time as string}</Text>
              </Stack>
            ))}
          </Stack>
        </Sec>
      )}

      {has('page') && (
        <Sec id="page">
          <Head k={{ de: 'Unterseite /team', en: 'Subpage /team' }} title={{ de: 'Die Menschen hinter Tavola', en: 'The people behind Tavola' }} />
          <Grid columns={2} gap={3}>
            {[['MR', 'Marco Rossi', { de: 'Küchenchef', en: 'Head chef' }], ['LB', 'Lea Brunner', { de: 'Gastgeberin', en: 'Host' }]].map(([ini, n, r]) => (
              <Stack key={n as string} gap={1}><AspectRatio ratio={phone ? 1 : 4 / 3}><Stack align="center" justify="center" style={{ height: '100%', background: C.card, border: `1px solid ${C.line}` }}><Serif size="2.6em">{ini as string}</Serif></Stack></AspectRatio><Text color="inherit" weight="semibold">{n as string}</Text><Caps>{t(r as T)}</Caps></Stack>
            ))}
          </Grid>
        </Sec>
      )}

      {has('jobs') && (
        <Sec id="jobs">
          <Head k={{ de: 'Karriere', en: 'Careers' }} title={{ de: 'Wir suchen Verstärkung', en: 'Join the team' }} />
          <Stack>
            {[[{ de: 'Koch / Köchin', en: 'Chef' }, '100 %'], [{ de: 'Service-Mitarbeiter/in', en: 'Waiting staff' }, '60 %']].map(([n, pct]) => (
              <Stack key={pct as string} direction="horizontal" justify="between" align="center" gap={2} paddingBlock={2} style={{ borderBottom: `1px solid ${C.line}` }}>
                <Text color="inherit" style={{ ...serif, fontSize: '1.15em' }}>{t(n as T)} · {pct as string}</Text>
                <Text color="inherit" style={{ ...caps, color: C.accent }}>{t({ de: 'Bewerben →', en: 'Apply →' })}</Text>
              </Stack>
            ))}
          </Stack>
        </Sec>
      )}

      {has('form') && (
        <Sec id="form">
          <Head k={{ de: 'Kontakt', en: 'Contact' }} title={{ de: 'Schreiben Sie uns', en: 'Write to us' }} />
          <Grid columns={phone ? 1 : 2} gap={3}>
            {[{ de: 'Name', en: 'Name' }, { de: 'E-Mail', en: 'Email' }].map(f => (
              <Stack key={f.en} gap={1} paddingBlockEnd={1} style={{ borderBottom: `1px solid ${C.ink}` }}><Caps>{t(f)}</Caps></Stack>
            ))}
          </Grid>
          <Stack gap={1} paddingBlockEnd={4} style={{ borderBottom: `1px solid ${C.ink}` }}><Caps>{t({ de: 'Nachricht', en: 'Message' })}</Caps></Stack>
          <Stack direction="horizontal"><Pill solid>{t({ de: 'Senden', en: 'Send' })}</Pill></Stack>
        </Sec>
      )}

      <Stack gap={4} paddingInline={gutter} paddingBlock={phone ? 5 : 6} style={{ background: C.night, color: C.paper }}>
        <Grid columns={phone ? 1 : 3} gap={4}>
          <Stack gap={1.5}>
            <Text color="inherit" style={{ ...serif, fontStyle: 'italic', fontSize: '1.8em' }}>Tavola</Text>
            <Text size="sm" color="inherit" style={{ opacity: 0.7 }}>Weite Gasse 7, 5400 Baden</Text>
            {(pro || has('email')) && <Text {...pop} {...mark('email')} size="sm" color="inherit" style={{ opacity: 0.85 }}>info@tavola-baden.ch</Text>}
          </Stack>
          <Stack gap={1.5}>
            <Caps color={C.paper}>{t({ de: 'Öffnungszeiten', en: 'Opening hours' })}</Caps>
            <Text size="sm" color="inherit" style={{ opacity: 0.7 }}>{t({ de: 'Di–Fr 12–23 Uhr · Sa 10–23 Uhr', en: 'Tue–Fri 12–11 pm · Sat 10–11 pm' })}</Text>
            {openBadge}
          </Stack>
          {has('newsletter') ? (
            <Stack {...pop} {...mark('newsletter')} gap={1.5}>
              <Caps color={C.paper}>Newsletter</Caps>
              <Stack direction="horizontal" justify="between" align="center" paddingBlockEnd={1} style={{ borderBottom: `1px solid ${C.paper}` }}>
                <Text size="sm" color="inherit" style={{ opacity: 0.55 }}>{t({ de: 'Ihre E-Mail', en: 'Your email' })}</Text>
                <Text color="inherit">→</Text>
              </Stack>
            </Stack>
          ) : (
            <Stack gap={1.5} align="start"><Caps color={C.paper}>{t({ de: 'Kontakt', en: 'Contact' })}</Caps><Pill>{t({ de: 'E-Mail schreiben', en: 'Send an email' })}</Pill></Stack>
          )}
        </Grid>
      </Stack>
    </Stack>
  );
}

/** Desktop browser window or phone frame around the sample site; automation chips sit below it. */
function Preview({ pro, has, device, short, mark }: { pro: boolean; has: (id: string) => boolean; device: Device; short: boolean; mark: Mark }) {
  const phone = device === 'phone';
  // The preview fills the right column and the viewport height; print pieces below take some of it.
  const height = short ? 'max(26rem, calc(100vh - 27rem))' : 'max(30rem, calc(100vh - 16rem))';
  // The WhatsApp button is the last child of the scrolling screen and sticks to its bottom edge,
  // so it stays at the visible bottom-right corner however tall the page or the wrapper gets.
  const screen = (
    <>
      <Site pro={pro} has={has} phone={phone} mark={mark} />
      {has('whatsapp') && (
        <Stack aria-hidden="true" style={{ position: 'sticky', bottom: 0, height: 0, overflow: 'visible', zIndex: 2, pointerEvents: 'none' }}>
          <Stack {...pop} {...mark('whatsapp')} align="center" justify="center" style={abs({ right: '1rem', bottom: '1rem', width: '3.2rem', height: '3.2rem', borderRadius: 'var(--radius-full)', background: '#25d366', color: 'white', boxShadow: '0 8px 24px rgba(0,0,0,.3)', fontSize: '1.4rem' })}>
            <Text color="inherit" aria-label="WhatsApp">✆</Text>
          </Stack>
        </Stack>
      )}
    </>
  );

  return (
    <Stack gap={4}>
      {phone ? (
        <Card padding={1.5} elevation="high" style={{ width: '100%', maxWidth: '22rem', marginInline: 'auto', borderRadius: '3rem', background: 'black' /* phone bezel stays black in both themes */ }}>
          <Card data-scroll="" padding={0} style={{ borderRadius: '2.4rem', position: 'relative', height: `min(46rem, ${height})`, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'none' }}>
            {screen}
          </Card>
        </Card>
      ) : (
        <Card padding={0} elevation="high" style={{ overflow: 'hidden' }}>
          <Stack>
            <Stack direction="horizontal" gap={2} align="center" padding={2} style={{ background: 'var(--color-background-muted)' }}>
              <StatusDot variant="error" label="" />
              <StatusDot variant="warning" label="" />
              <StatusDot variant="success" label="" />
              <Card padding={1} style={{ flex: 1, minWidth: 0, maxWidth: '28rem', marginInline: 'auto' }}>
                <Text type="supporting" size="xsm" maxLines={1} justify="center">tavola-baden.ch{has('page') ? '/team' : ''}</Text>
              </Card>
            </Stack>
            <Stack data-scroll="" style={{ height, overflowY: 'auto', overflowX: 'hidden', position: 'relative' }}>{screen}</Stack>
          </Stack>
        </Card>
      )}
      <AutomationFlow has={has} mark={mark} phone={phone} />
    </Stack>
  );
}

/** The print add-ons shown as finished pieces (flyer and cards are the sample designs; the social post is neutral). */
function PrintShelf({ has, mark }: { has: (id: string) => boolean; mark: Mark }) {
  const t = useT();
  const items: ReactNode[] = [];
  const label = (s: T) => <Text size="xsm" color="secondary" justify="center">{t(s)}</Text>;
  if (has('flyer')) items.push(
    <Stack key="flyer" {...pop} {...mark('flyer')} gap={1} style={{ width: '7.5rem' }}>
      <Card padding={0} elevation="med" style={{ overflow: 'hidden' }}>
        <AspectRatio ratio={148 / 210} fit="cover"><img src="/print/restaurant-flyer.webp" alt={t({ de: 'Flyer A5, Beispiel', en: 'A5 flyer, sample' })} loading="lazy" /></AspectRatio>
      </Card>
      {label({ de: 'Flyer A5', en: 'A5 flyer' })}
    </Stack>,
  );
  if (has('cards')) items.push(
    <Stack key="cards" {...pop} {...mark('cards')} gap={1} style={{ width: '10.5rem' }}>
      <Card padding={0} elevation="med" style={{ overflow: 'hidden', transform: 'rotate(-3deg)' }}>
        <AspectRatio ratio={85 / 55} fit="cover"><img src="/print/restaurant-card-front.webp" alt={t({ de: 'Visitenkarte Vorderseite', en: 'Business card front' })} loading="lazy" /></AspectRatio>
      </Card>
      <Card padding={0} elevation="med" style={{ overflow: 'hidden', transform: 'rotate(2deg)' }}>
        <AspectRatio ratio={85 / 55} fit="cover"><img src="/print/restaurant-card-back.webp" alt={t({ de: 'Visitenkarte Rückseite', en: 'Business card back' })} loading="lazy" /></AspectRatio>
      </Card>
      {label({ de: 'Visitenkarte', en: 'Business card' })}
    </Stack>,
  );
  if (has('social')) items.push(
    <Stack key="social" {...pop} {...mark('social')} gap={1} style={{ width: '12rem' }}>
      <PricelistPost />
      {label({ de: 'Preisliste für Social Media', en: 'Price list for social media' })}
    </Stack>,
  );
  if (!items.length) return null;
  return <Stack direction="horizontal" gap={4} wrap="wrap" align="end" justify="center">{items}</Stack>;
}

export default function Configurator() {
  const t = useT();
  const [device, setDevice] = useState<Device>('desktop');
  const [tierId, setTierId] = useState<string>(TIERS[0].id);
  const [auto, setAuto] = useState(false);
  const [extras, setExtras] = useState<Set<string>>(new Set());
  const [care, setCare] = useState(false);
  const tier = TIERS.find(x => x.id === tierId) ?? TIERS[0];
  const q = quote(tier, extras);
  const has = (id: string) => tier.includes.includes(id) || extras.has(id) || (auto && AUTOMATIONS.some(a => a.id === id));
  const mark: Mark = id => ({ 'data-f': id });
  const toggleExtra = (id: string, on: boolean) => setExtras(prev => { const n = new Set(prev); if (on) n.add(id); else n.delete(id); return n; });

  const month = t({ de: 'Monat', en: 'month' });
  const from = t({ de: 'ab', en: 'from' });
  const body = [
    `${t({ de: 'Paket', en: 'Package' })}: ${t(tier.name)} (${chf(tier.price)})`,
    ...q.chosen.map(p => `- ${t(p.name)}: + ${chf(p.price)}`),
    '',
    `${t({ de: 'Total (einmalig)', en: 'Total (one-time)' })}: ${chf(q.total)}`,
    ...(auto ? [`${t({ de: 'Automation Add-on', en: 'Automation add-on' })}: ${from} ${chf(AUTOMATION_MONTHLY)} / ${month}`] : []),
    ...(care ? [`${t({ de: 'Wartung', en: 'Maintenance' })}: ${chf(CARE[tier.id])} / ${month}`] : []),
    '',
    t({ de: 'Name:', en: 'Name:' }),
    t({ de: 'Geschäft:', en: 'Business:' }),
    t({ de: 'Telefon:', en: 'Phone:' }),
  ].join('\n');

  return (
    <Stack as="section" id="konfigurator" gap={6} paddingInline={4} paddingBlock={10} style={{ maxWidth: '100rem', marginInline: 'auto', width: '100%' }}>
      <Stack gap={2}>
        <Eyebrow>{t({ de: 'Konfigurator', en: 'Configurator' })}</Eyebrow>
        <Heading level={2}>{t({ de: 'Stellen Sie Ihre Wunsch-Website zusammen', en: 'Build your dream website' })}</Heading>
        <Text color="secondary">{t({ de: 'Wählen Sie ein Paket, dazu nach Wunsch Automationen und Druckdesign. Alle Preise sind fix.', en: 'Choose a package, then add automations and print design if you like. All prices are fixed.' })}</Text>
        <Link href="#beispiele" size="sm">{t({ de: 'Buchungs-Funnels live ausprobieren', en: 'Try the booking funnels live' })}</Link>
      </Stack>

      <Grid data-cfg="" columns={1} gap={8} align="start">
        {/* options */}
        <Stack gap={5} style={{ minWidth: 0 }}>
          <Stack gap={2}>
            <Text weight="semibold">{t({ de: '1. Paket wählen', en: '1. Choose a package' })}</Text>
            <SegmentedControl size="sm" label={t({ de: 'Paket', en: 'Package' })} value={tier.id} onChange={v => setTierId(v as string)} layout="fill">
              {TIERS.map(x => <SegmentedControlItem key={x.id} value={x.id} label={`${t(x.name)} · ${chf(x.price)}`} />)}
            </SegmentedControl>
            <Text type="supporting" size="sm">{t(tier.tagline)}</Text>
          </Stack>

          <Card padding={3} variant={auto ? 'green' : 'default'}>
            <Stack gap={2}>
              <Switch label={t({ de: '2. Automation Add-on (optional)', en: '2. Automation add-on (optional)' })} value={auto} onChange={setAuto} />
              <Text size="sm" weight="medium">{from} {chf(AUTOMATION_MONTHLY)} / {month}</Text>
              <Stack gap={0.5}>
                {AUTOMATIONS.map(a => <Text key={a.id} size="sm" type="supporting">✓ {t(a.name)}</Text>)}
              </Stack>
            </Stack>
          </Card>

          <Card padding={3}>
            <Stack gap={1.5}>
              <Text weight="semibold">{t({ de: '3. Druckdesign (optional)', en: '3. Print design (optional)' })}</Text>
              {PRINT.map(p => (
                <Stack key={p.id} direction="horizontal" justify="between" align="center" gap={2}>
                  <CheckboxInput size="sm" labelIcon={ADDON_ICONS[p.id]} label={t(p.name)} value={extras.has(p.id)} onChange={c => toggleExtra(p.id, c)} />
                  <Text size="sm" weight="medium" hasTabularNumbers style={{ whiteSpace: 'nowrap' }}>+ {chf(p.price)}</Text>
                </Stack>
              ))}
            </Stack>
          </Card>

          <Card padding={3} elevation="high" style={{ position: 'sticky', bottom: '1rem', zIndex: 3 }}>
            <Stack direction="horizontal" justify="between" align="center" gap={3} wrap="wrap">
              <Stack gap={0.5}>
                <Text size="sm" color="secondary">{t(tier.name)}{q.chosen.length ? ` + ${q.chosen.length} ${t({ de: 'Druck', en: 'print' })}` : ''}</Text>
                <Heading level={3} hasCapsize={false} color="accent">{chf(q.total)}</Heading>
              </Stack>
              <Button icon={ic(UI.arrow)} variant="primary" size="sm" href="#zusammenfassung" label={t({ de: 'Zur Zusammenfassung', en: 'See summary' })} />
            </Stack>
          </Card>
        </Stack>

        {/* preview */}
        <Stack gap={4} data-sticky="" style={{ minWidth: 0 }}>
          <Stack direction="horizontal" justify="between" align="center" gap={2} wrap="wrap">
            <Text weight="semibold">{t({ de: 'Live-Vorschau (Beispiel)', en: 'Live preview (sample)' })}</Text>
            <SegmentedControl size="sm" label={t({ de: 'Ansicht', en: 'View' })} value={device} onChange={v => setDevice(v as Device)}>
              <SegmentedControlItem value="desktop" label="Desktop" />
              <SegmentedControlItem value="phone" label={t({ de: 'Handy', en: 'Phone' })} />
            </SegmentedControl>
          </Stack>
          <Preview pro={tier.id === 'pro'} has={has} device={device} short={extras.size > 0} mark={mark} />
          <PrintShelf has={has} mark={mark} />
        </Stack>
      </Grid>

      <Stack id="zusammenfassung" gap={2} style={{ maxWidth: '36rem', width: '100%', marginInline: 'auto' }}>
        <Text weight="semibold">{t({ de: '4. Zusammenfassung', en: '4. Summary' })}</Text>
        <Card padding={4} elevation="med">
          <Stack gap={3}>
            <Stack direction="horizontal" justify="between" gap={3}>
              <Text weight="semibold">{t({ de: 'Paket', en: 'Package' })} {t(tier.name)}</Text>
              <Text hasTabularNumbers>{chf(tier.price)}</Text>
            </Stack>
            {q.chosen.map(p => (
              <Stack key={p.id} direction="horizontal" justify="between" gap={3}>
                <Text size="sm">{t(p.name)}</Text>
                <Text size="sm" hasTabularNumbers style={{ whiteSpace: 'nowrap' }}>{chf(p.price)}</Text>
              </Stack>
            ))}
            <Divider />
            <Stack direction="horizontal" justify="between" align="center" gap={3}>
              <Text weight="bold">{t({ de: 'Total einmalig', en: 'Total one-time' })}</Text>
              <Heading level={3} hasCapsize={false} color="accent">{chf(q.total)}</Heading>
            </Stack>
            {auto && (
              <Stack direction="horizontal" justify="between" gap={3}>
                <Text size="sm">{t({ de: 'Automation Add-on', en: 'Automation add-on' })}</Text>
                <Text size="sm" hasTabularNumbers style={{ whiteSpace: 'nowrap' }}>{from} {chf(AUTOMATION_MONTHLY)} / {month}</Text>
              </Stack>
            )}
            <Stack direction="horizontal" justify="between" align="center" gap={3}>
              <CheckboxInput size="sm" label={t({ de: 'Wartung dazu (Hosting, Updates, 2 Std. Änderungen)', en: 'Add maintenance (hosting, updates, 2 h of changes)' })} value={care} onChange={setCare} />
              <Text size="sm" hasTabularNumbers style={{ whiteSpace: 'nowrap' }}>{chf(CARE[tier.id])} / {month}</Text>
            </Stack>
            <Text type="supporting" size="sm">{t({ de: 'Einmalig, inkl. Einrichtung. Preise in CHF.', en: 'One-time, setup included. Prices in CHF.' })}</Text>
            <Button icon={ic(UI.send)}
              variant="primary"
              width="100%"
              href="#kontakt"
              onClick={() => { contactDraft.subject = `Website-Anfrage: ${t(tier.name)}`; contactDraft.body = body; }}
              label={t({ de: 'Anfrage senden', en: 'Send enquiry' })}
            />
            <Link href="#kontakt" size="sm">
              {t({ de: 'Etwas anderes im Kopf? Schreiben Sie mir.', en: 'Something else in mind? Write to me.' })}
            </Link>
          </Stack>
        </Card>
      </Stack>
    </Stack>
  );
}
