import { useState, type CSSProperties, type ReactNode } from 'react';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { Avatar } from '@astryxdesign/core/Avatar';
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
import { Text } from '@astryxdesign/core/Text';
import { Token } from '@astryxdesign/core/Token';
import Eyebrow from './Eyebrow';
import { ADDONS, GROUPS, PRO_FREE, TIERS, chf, lines, mailto, total, useT, type Line, type T } from '../data';

// Dev-only self-check of the pricing maths (prices come from data.ts).
if (import.meta.env.DEV) {
  const set = (...ids: string[]) => new Set(ids);
  const [basis, pro] = TIERS;
  console.assert(total(basis, set('booking', 'calendar')) === 2650, 'Basis pays every add-on');
  console.assert(total(pro, set('email')) === 2000, 'Pro: email is included');
  console.assert(total(pro, set('booking', 'lang')) === 2000, 'Pro: 2 priciest add-ons free');
  console.assert(total(pro, set('booking', 'lang', 'calendar', 'form')) === 2000 + 63 + 150, 'Pro: 3rd at 25 %, 4th full');
}

type Device = 'desktop' | 'phone';
const IMG = '/work/restaurant.webp';
const soft: CSSProperties = { filter: 'blur(5px)', transform: 'scale(1.08)' };
const crop = (pos: string): CSSProperties => ({ ...soft, width: '100%', height: '100%', backgroundImage: `url(${IMG})`, backgroundSize: '320%', backgroundPosition: pos });
const pop = { 'data-pop': '' } as Record<string, string>;
const abs = (s: CSSProperties): CSSProperties => ({ position: 'absolute', ...s });

// Floating notification chips for automations, overlapping the preview frame edge.
const CHIPS: Record<string, { text: T; dot: 'success' | 'accent' }> = {
  sheet: { text: { de: 'Neue Anfrage · über die Website', en: 'New enquiry · via the website' }, dot: 'accent' },
  autoreply: { text: { de: 'Bestätigung gesendet · automatisch', en: 'Confirmation sent · automatic' }, dot: 'success' },
  calendar: { text: { de: 'Reservation im Kalender · Fr., 19:30', en: 'Booking in calendar · Fri, 7:30 pm' }, dot: 'success' },
  reminder: { text: { de: 'Erinnerung gesendet · 24 h vorher', en: 'Reminder sent · 24 h before' }, dot: 'success' },
  'review-request': { text: { de: '★★★★★ Neue Google-Bewertung', en: '★★★★★ New Google review' }, dot: 'accent' },
};

/** A sample restaurant site ("Tavola") that grows with every selected add-on. */
function Site({ pro, has, phone }: { pro: boolean; has: (id: string) => boolean; phone: boolean }) {
  const t = useT();
  const links = [{ de: 'Haus', en: 'About' }, { de: 'Karte', en: 'Menu' }, ...(has('page') ? [{ de: 'Team', en: 'Team' }] : []), { de: 'Besuch', en: 'Visit' }];
  const onDark: CSSProperties = { color: 'white' /* text sits on a darkened photo in both themes */ };

  const nav = (
    <Stack direction="horizontal" justify="between" align="center" gap={2} paddingInline={3} paddingBlock={2} style={pro ? onDark : undefined}>
      <Text weight="bold" color="inherit" style={{ fontFamily: 'var(--font-family-heading, serif)', fontSize: '1.15em' }}>Tavola</Text>
      {phone ? (
        <Stack direction="horizontal" gap={2} align="center">
          {has('lang') && <Token {...pop} label="DE | EN" size="sm" color="blue" />}
          <Text color="inherit">☰</Text>
        </Stack>
      ) : (
        <Stack direction="horizontal" gap={3} align="center">
          {links.map(l => <Text key={l.en} size="xsm" color="inherit">{t(l)}</Text>)}
          {has('lang') && <Token {...pop} label="DE | EN" size="sm" color="blue" />}
        </Stack>
      )}
    </Stack>
  );

  const hero = pro ? (
    <Stack style={{ position: 'relative', overflow: 'hidden', isolation: 'isolate' }}>
      {/* the sample photo is blurred so its own baked-in text never competes with ours */}
      <Stack style={{ ...abs({ inset: 0, zIndex: -1 }), ...soft, backgroundImage: `linear-gradient(180deg, color-mix(in srgb, black 50%, transparent), color-mix(in srgb, black 75%, transparent)), url(${IMG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
      {nav}
      <Stack gap={2} align="center" paddingInline={4} paddingBlockStart={phone ? 6 : 8} paddingBlockEnd={phone ? 8 : 10} style={{ textAlign: 'center', ...onDark }}>
        <Text size="xsm" color="inherit" style={{ letterSpacing: '.3em' }}>KOCHEN · SCHENKEN · GENIESSEN</Text>
        <Heading level={3} type="display-3" color="inherit">Tavola</Heading>
        <Text size="sm" color="inherit">{t({ de: 'Saisonale Küche in der Altstadt von Baden.', en: 'Seasonal cooking in Baden’s old town.' })}</Text>
        <Stack direction="horizontal" gap={2} wrap="wrap" justify="center">
          <Button size="sm" variant="primary" label={t({ de: 'Tisch reservieren', en: 'Book a table' })} />
          {!phone && <Button size="sm" variant="secondary" label={t({ de: 'Zur Karte', en: 'See the menu' })} />}
        </Stack>
        {has('reviews') && <Text {...pop} size="xsm" color="inherit">★★★★★ 4,8 · 126 Google</Text>}
      </Stack>
    </Stack>
  ) : (
    <Stack>
      {nav}
      <Stack gap={2} paddingInline={3} paddingBlockEnd={3}>
        <AspectRatio ratio={phone ? 16 / 9 : 21 / 8} fit="cover">
          <img src={IMG} alt="" loading="lazy" decoding="async" style={soft} />
        </AspectRatio>
        <Heading level={3}>{t({ de: 'Willkommen im Tavola', en: 'Welcome to Tavola' })}</Heading>
        <Text size="sm" color="secondary">{t({ de: 'Saisonale Küche in der Altstadt von Baden.', en: 'Seasonal cooking in Baden’s old town.' })}</Text>
        <Stack direction="horizontal" gap={2} wrap="wrap" align="center">
          <Button size="sm" variant="primary" label={t({ de: 'Tisch reservieren', en: 'Book a table' })} />
          {has('reviews') && <Text {...pop} size="xsm">★★★★★ 4,8 · 126 Google</Text>}
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <Stack>
      {hero}
      <Stack gap={3} padding={3}>
        {has('booking') && (
          <Card {...pop} variant="muted" padding={3}>
            <Stack gap={2}>
              <Stack direction="horizontal" justify="between" align="center" gap={2}>
                <Text weight="semibold" size="sm">{t({ de: 'Tisch reservieren', en: 'Book a table' })}</Text>
                <Text size="xsm" color="secondary">{t({ de: 'Schritt 2 von 3', en: 'Step 2 of 3' })}</Text>
              </Stack>
              <Stack direction="horizontal" gap={1} wrap="wrap">
                {['Do 14', 'Fr 15', 'Sa 16'].map((d, i) => <Token key={d} size="sm" color={i === 1 ? 'yellow' : 'default'} label={d} />)}
              </Stack>
              <Stack direction="horizontal" gap={1} wrap="wrap">
                {['18:00', '19:30', '21:00'].map((d, i) => <Token key={d} size="sm" color={i === 1 ? 'yellow' : 'default'} label={d} />)}
              </Stack>
            </Stack>
          </Card>
        )}
        <Grid columns={phone ? 1 : 3} gap={2}>
          {[
            [{ de: 'Mittagsmenü', en: 'Lunch menu' }, '8% 40%'],
            [{ de: 'Abendkarte', en: 'Dinner' }, '50% 60%'],
            [{ de: 'Apéro', en: 'Apéritif' }, '12% 10%'],
          ].slice(0, phone ? 2 : 3).map(([n, pos]) => (
            <Card key={pos as string} variant="muted" padding={0} style={{ overflow: 'hidden' }}>
              <Stack>
                <AspectRatio ratio={phone ? 16 / 7 : 4 / 3}>
                  <Stack style={crop(pos as string)} />
                </AspectRatio>
                <Stack padding={1.5}><Text size="xsm" weight="semibold">{t(n as T)}</Text></Stack>
              </Stack>
            </Card>
          ))}
        </Grid>
        {has('menu') && (
          <Stack {...pop} gap={1}>
            <Text size="sm" weight="semibold">{t({ de: 'Karte', en: 'Menu' })}</Text>
            {[
              [{ de: 'Kürbisrisotto mit Salbei', en: 'Pumpkin risotto, sage' }, '28'],
              [{ de: 'Kalbsbäggli, Polenta', en: 'Veal cheeks, polenta' }, '42'],
              [{ de: 'Mittagsmenü Di–Fr', en: 'Lunch menu Tue–Fri' }, '19.50'],
            ].map(([n, p]) => (
              <Stack key={p as string} direction="horizontal" justify="between" gap={2}>
                <Text size="xsm">{t(n as T)}</Text>
                <Text size="xsm" hasTabularNumbers>{p as string}</Text>
              </Stack>
            ))}
          </Stack>
        )}
        {has('reviews') && (
          <Card {...pop} padding={2} variant="muted">
            <Stack gap={1}>
              <Text size="xsm" color="accent">★★★★★</Text>
              <Text size="xsm">{t({ de: '«Bestes Risotto in Baden, sehr herzlicher Service.»', en: '“Best risotto in Baden, very warm service.”' })}</Text>
              <Text size="xsm" color="secondary">Sandra M. · Google</Text>
            </Stack>
          </Card>
        )}
        <Divider />
        <Text size="xsm" color="secondary">{t({ de: 'Di bis Fr 12–23 Uhr · Sa 10–23 Uhr · Weite Gasse 7, Baden', en: 'Tue to Fri 12–11 pm · Sat 10–11 pm · Weite Gasse 7, Baden' })}</Text>
        {has('form') ? (
          <Stack {...pop} gap={1}>
            <Card variant="muted" padding={1.5}><Text size="xsm" color="placeholder">{t({ de: 'Name', en: 'Name' })}</Text></Card>
            <Card variant="muted" padding={1.5}><Text size="xsm" color="placeholder">{t({ de: 'Ihre Nachricht', en: 'Your message' })}</Text></Card>
            <Stack direction="horizontal"><Button size="sm" variant="secondary" label={t({ de: 'Senden', en: 'Send' })} /></Stack>
          </Stack>
        ) : (
          <Stack direction="horizontal"><Button size="sm" variant="secondary" label={t({ de: 'E-Mail schreiben', en: 'Send an email' })} /></Stack>
        )}
        {(pro || has('email')) && <Text {...pop} size="xsm" color="secondary">info@tavola-baden.ch</Text>}
      </Stack>
      {has('whatsapp') && (
        <Stack {...pop} align="end" paddingInline={3} paddingBlockEnd={3} style={phone ? abs({ insetInlineEnd: 0, bottom: 0 }) : undefined}>
          <Button size="sm" variant="primary" label="💬 WhatsApp" />
        </Stack>
      )}
    </Stack>
  );
}

/** Desktop browser window or phone frame around the sample site, plus floating automation chips. */
function Preview({ pro, sel, device }: { pro: boolean; sel: Set<string>; device: Device }) {
  const t = useT();
  const has = (id: string) => sel.has(id);
  const phone = device === 'phone';
  const chips = Object.keys(CHIPS).filter(has);
  const screen = <Site pro={pro} has={has} phone={phone} />;

  return (
    <Stack style={{ position: 'relative' }} paddingInlineEnd={3}>
      {phone ? (
        <Card padding={1.5} elevation="high" style={{ width: '100%', maxWidth: '18.5rem', marginInline: 'auto', borderRadius: 'calc(var(--radius-page) * 2)', background: 'black' /* phone bezel stays black in both themes */ }}>
          <Card padding={0} style={{ overflow: 'hidden', borderRadius: 'calc(var(--radius-page) * 1.6)', position: 'relative', maxHeight: '36rem', overflowY: 'auto' }}>
            <Stack align="center" paddingBlock={1}>
              <Card variant="gray" padding={0.5} width="30%" style={{ borderRadius: 'var(--radius-full)' }} />
            </Stack>
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
              <Card padding={1} style={{ flex: 1, minWidth: 0 }}>
                <Text type="supporting" size="xsm" maxLines={1}>🔒 tavola-baden.ch{has('page') ? t({ de: ' · /team', en: ' · /team' }) : ''}</Text>
              </Card>
            </Stack>
            {screen}
          </Stack>
        </Card>
      )}
      {chips.length > 0 && (
        <Stack gap={2} align="end" style={abs({ top: '28%', insetInlineEnd: 0, maxWidth: '85%', pointerEvents: 'none', zIndex: 2 })}>
          {chips.map(id => (
            <Card key={id} {...pop} padding={1.5} elevation="high">
              <Stack direction="horizontal" gap={1.5} align="center">
                <StatusDot variant={CHIPS[id].dot} label="" />
                <Text size="xsm" weight="medium">{t(CHIPS[id].text)}</Text>
              </Stack>
            </Card>
          ))}
        </Stack>
      )}
    </Stack>
  );
}

/** The print add-ons shown as the real finished pieces for the sample restaurant. */
function PrintShelf({ has }: { has: (id: string) => boolean }) {
  const t = useT();
  const items: ReactNode[] = [];
  const label = (s: T) => <Text size="xsm" color="secondary" justify="center">{t(s)}</Text>;
  if (has('flyer')) items.push(
    <Stack key="flyer" {...pop} gap={1} style={{ width: '7.5rem' }}>
      <Card padding={0} elevation="med" style={{ overflow: 'hidden' }}>
        <AspectRatio ratio={148 / 210} fit="cover"><img src="/print/restaurant-flyer.webp" alt={t({ de: 'Flyer A5 für Tavola', en: 'A5 flyer for Tavola' })} loading="lazy" /></AspectRatio>
      </Card>
      {label({ de: 'Flyer A5', en: 'A5 flyer' })}
    </Stack>,
  );
  if (has('cards')) items.push(
    <Stack key="cards" {...pop} gap={1} style={{ width: '10.5rem' }}>
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
    <Stack key="social" {...pop} gap={1} style={{ width: '9.5rem' }}>
      <Card padding={0} elevation="med" style={{ overflow: 'hidden' }}>
        <Stack>
          <Stack direction="horizontal" gap={1} align="center" padding={1.5}>
            <Avatar name="Tavola" size={20} tooltip={false} />
            <Text size="xsm" weight="semibold" maxLines={1}>tavola.baden</Text>
          </Stack>
          <AspectRatio ratio={1}>
            <Stack justify="center" align="center" gap={0.5} style={{
              backgroundImage: `linear-gradient(color-mix(in srgb, black 45%, transparent), color-mix(in srgb, black 45%, transparent)), url(${IMG})`,
              backgroundSize: 'cover', backgroundPosition: 'center', color: 'white' /* text sits on a darkened photo in both themes */,
            }}>
              <Text weight="bold" color="inherit" style={{ fontFamily: 'var(--font-family-heading, serif)', fontSize: '1.4em' }}>Tavola</Text>
              <Text size="xsm" color="inherit">{t({ de: 'Neue Herbstkarte', en: 'New autumn menu' })}</Text>
            </Stack>
          </AspectRatio>
          <Stack padding={1.5}><Text size="xsm">♡ 214</Text></Stack>
        </Stack>
      </Card>
      {label({ de: 'Social Media', en: 'Social media' })}
    </Stack>,
  );
  if (!items.length) return null;
  return <Stack direction="horizontal" gap={4} wrap="wrap" align="end" justify="center">{items}</Stack>;
}

function PriceTag({ line, price, inc }: { line?: Line; price: number; inc: boolean }) {
  const t = useT();
  if (inc) return <Text size="sm" weight="medium">{t({ de: 'Inklusive', en: 'Included' })}</Text>;
  if (line?.note === 'free') return (
    <Stack align="end" gap={0.5}>
      <Token size="sm" color="green" label={t({ de: 'Gratis', en: 'Free' })} />
      <Text size="xsm" color="secondary" hasTabularNumbers style={{ textDecoration: 'line-through' }}>{chf(price)}</Text>
    </Stack>
  );
  if (line?.note === 'third') return (
    <Stack align="end" gap={0.5}>
      <Text size="sm" weight="medium" hasTabularNumbers style={{ whiteSpace: 'nowrap' }}>+ {chf(line.price)}</Text>
      <Token size="sm" color="yellow" label="−75 %" />
    </Stack>
  );
  return <Text size="sm" weight="medium" hasTabularNumbers style={{ whiteSpace: 'nowrap' }}>+ {chf(price)}</Text>;
}

export default function Configurator() {
  const t = useT();
  const [tierId, setTierId] = useState<'basis' | 'pro'>('basis');
  const [device, setDevice] = useState<Device>('desktop');
  const [sel, setSel] = useState<Set<string>>(new Set());
  const tier = TIERS.find(x => x.id === tierId)!;
  const pro = tierId === 'pro';
  const toggle = (id: string, on: boolean) =>
    setSel(prev => {
      const n = new Set(prev);
      if (on) n.add(id); else n.delete(id);
      return n;
    });

  const all = lines(tier, sel);
  const byId = new Map(all.map(l => [l.addon.id, l]));
  const sum = total(tier, sel);
  const saved = all.reduce((s, l) => s + (l.note === 'free' || l.note === 'third' ? l.addon.price - l.price : 0), 0);
  const freeUsed = all.filter(l => l.note === 'free').length;
  const effective = new Set(all.map(l => l.addon.id));
  const has = (id: string) => effective.has(id);
  const noteText = (l: Line) =>
    l.note === 'included' ? t({ de: 'inklusive', en: 'included' })
      : l.note === 'free' ? t({ de: 'gratis (Pro-Bonus)', en: 'free (Pro bonus)' })
        : l.note === 'third' ? `${chf(l.price)} (${t({ de: '25 %, Pro-Bonus', en: '25 %, Pro bonus' })})`
          : chf(l.price);

  const body = [
    `${t({ de: 'Paket', en: 'Package' })}: ${t(tier.name)} (${chf(tier.price)})`,
    '',
    t({ de: 'Zusätze', en: 'Add-ons' }) + ':',
    ...(all.length ? all.map(l => `- ${t(l.addon.name)}: ${noteText(l)}`) : ['-']),
    '',
    `${t({ de: 'Total (einmalig)', en: 'Total (one-time)' })}: ${chf(sum)}`,
    '',
    t({ de: 'Name:', en: 'Name:' }),
    t({ de: 'Geschäft:', en: 'Business:' }),
    t({ de: 'Telefon:', en: 'Phone:' }),
  ].join('\n');

  return (
    <Stack as="section" id="konfigurator" gap={6} paddingInline={4} paddingBlock={10} style={{ maxWidth: '75rem', marginInline: 'auto', width: '100%' }}>
      <Stack gap={2}>
        <Eyebrow>{t({ de: 'Konfigurator', en: 'Configurator' })}</Eyebrow>
        <Heading level={2}>{t({ de: 'Stellen Sie Ihre Wunsch-Website zusammen', en: 'Build your dream website' })}</Heading>
        <Text color="secondary">{t({ de: 'Wählen Sie ein Paket und Zusätze. Vorschau und Preis passen sich sofort an.', en: 'Pick a package and add-ons. The preview and price update instantly.' })}</Text>
        <Link href="#beispiele" size="sm">{t({ de: 'Buchungs-Funnels live ausprobieren', en: 'Try the booking funnels live' })}</Link>
      </Stack>

      <Grid columns={{ minWidth: 340 }} gap={8} align="start">
        {/* options */}
        <Stack gap={6}>
          <Stack gap={2}>
            <Text weight="semibold">{t({ de: '1. Paket wählen', en: '1. Choose a package' })}</Text>
            <SegmentedControl label={t({ de: 'Paket', en: 'Package' })} value={tierId} onChange={v => setTierId(v as 'basis' | 'pro')} layout="fill">
              {TIERS.map(x => (
                <SegmentedControlItem key={x.id} value={x.id} label={`${t(x.name)} · ${chf(x.price)}`} />
              ))}
            </SegmentedControl>
            <Text type="supporting">{t(tier.tagline)}</Text>
          </Stack>

          {pro ? (
            <Card variant="yellow" padding={3}>
              <Stack gap={1.5}>
                <Stack direction="horizontal" justify="between" align="center" gap={2} wrap="wrap">
                  <Text weight="semibold">{t({ de: 'Pro-Bonus', en: 'Pro bonus' })}</Text>
                  <Token size="sm" color={freeUsed === PRO_FREE ? 'green' : 'default'} label={`${freeUsed} / ${PRO_FREE} ${t({ de: 'gratis gewählt', en: 'free picks used' })}`} />
                </Stack>
                <Text size="sm">{t({ de: 'Zwei Zusätze Ihrer Wahl sind gratis, der dritte kostet nur 25 %. Es zählen automatisch die teuersten.', en: 'Two add-ons of your choice are free, the third costs only 25 %. The priciest ones count automatically.' })}</Text>
              </Stack>
            </Card>
          ) : (
            <Card variant="muted" padding={3}>
              <Stack direction="horizontal" justify="between" align="center" gap={3} wrap="wrap">
                <Text size="sm" style={{ flex: '1 1 14rem' }}>{t({ de: 'Mit Pro: 2 Zusätze gratis, der 3. für 25 %.', en: 'With Pro: 2 add-ons free, the 3rd at 25 %.' })}</Text>
                <Button size="sm" variant="secondary" label={t({ de: 'Zu Pro wechseln', en: 'Switch to Pro' })} onClick={() => setTierId('pro')} />
              </Stack>
            </Card>
          )}

          <Stack gap={4}>
            <Text weight="semibold">{t({ de: '2. Zusätze wählen', en: '2. Choose add-ons' })}</Text>
            {GROUPS.map(g => (
              <Card key={g.id} padding={3} variant={g.id === 'automation' ? 'green' : 'default'}>
                <Stack gap={3}>
                  <Stack gap={0.5}>
                    <Stack direction="horizontal" gap={2} align="center" wrap="wrap">
                      <Text weight="semibold">{t(g.name)}</Text>
                      {g.id === 'automation' && <Token size="sm" color="green" label={t({ de: 'Empfohlen', en: 'Recommended' })} />}
                    </Stack>
                    <Text type="supporting" size="sm">
                      {g.id === 'automation' ? t({ de: 'Kosten im Betrieb fast nichts', en: 'Next to nothing to run' }) : t(g.desc)}
                    </Text>
                  </Stack>
                  {ADDONS.filter(a => a.group === g.id).map(a => {
                    const inc = a.includedIn === tierId;
                    return (
                      <Stack key={a.id} direction="horizontal" justify="between" align="start" gap={3}>
                        <CheckboxInput
                          label={t(a.name)}
                          description={t(a.desc)}
                          value={inc || sel.has(a.id)}
                          isDisabled={inc}
                          onChange={c => toggle(a.id, c)}
                        />
                        <PriceTag line={byId.get(a.id)} price={a.price} inc={inc} />
                      </Stack>
                    );
                  })}
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>

        {/* preview + summary */}
        <Stack gap={4} style={{ minWidth: 0 }}>
          <Stack direction="horizontal" justify="between" align="center" gap={2} wrap="wrap">
            <Text weight="semibold">{t({ de: 'Live-Vorschau (Beispiel)', en: 'Live preview (sample)' })}</Text>
            <SegmentedControl size="sm" label={t({ de: 'Ansicht', en: 'View' })} value={device} onChange={v => setDevice(v as Device)}>
              <SegmentedControlItem value="desktop" label="Desktop" />
              <SegmentedControlItem value="phone" label={t({ de: 'Handy', en: 'Phone' })} />
            </SegmentedControl>
          </Stack>
          <Preview pro={pro} sel={effective} device={device} />
          <PrintShelf has={has} />

          <Card padding={4} elevation="med">
            <Stack gap={3}>
              <Stack direction="horizontal" justify="between" gap={3}>
                <Text weight="semibold">{t(tier.name)}</Text>
                <Text hasTabularNumbers>{chf(tier.price)}</Text>
              </Stack>
              {all.filter(l => l.note !== 'included').map(l => (
                <Stack key={l.addon.id} direction="horizontal" justify="between" gap={3}>
                  <Text size="sm">{t(l.addon.name)}</Text>
                  <Text size="sm" hasTabularNumbers style={{ whiteSpace: 'nowrap' }} color={l.note ? 'accent' : undefined}>
                    {l.note === 'free' ? t({ de: 'Gratis', en: 'Free' }) : chf(l.price)}
                  </Text>
                </Stack>
              ))}
              {saved > 0 && (
                <Stack direction="horizontal" justify="between" gap={3}>
                  <Text size="sm" color="secondary">{t({ de: 'Pro-Bonus gespart', en: 'Saved with Pro bonus' })}</Text>
                  <Text size="sm" color="secondary" hasTabularNumbers>− {chf(saved)}</Text>
                </Stack>
              )}
              <Divider />
              <Stack direction="horizontal" justify="between" align="center" gap={3}>
                <Text weight="bold">{t({ de: 'Total', en: 'Total' })}</Text>
                <Heading level={3} hasCapsize={false} color="accent">{chf(sum)}</Heading>
              </Stack>
              <Text type="supporting" size="sm">{t({ de: 'Einmalig, inkl. Einrichtung. Preise in CHF.', en: 'One-time, setup included. Prices in CHF.' })}</Text>
              <Button
                variant="primary"
                width="100%"
                href={mailto(`${t({ de: 'Website-Anfrage', en: 'Website enquiry' })}: ${t(tier.name)}`, body)}
                label={t({ de: 'Anfrage senden', en: 'Send enquiry' })}
              />
              <Link href={mailto(t({ de: 'Website-Anfrage', en: 'Website enquiry' }))} size="sm">
                {t({ de: 'Etwas anderes im Kopf? Schreiben Sie mir.', en: 'Something else in mind? Write to me.' })}
              </Link>
            </Stack>
          </Card>
        </Stack>
      </Grid>
    </Stack>
  );
}
