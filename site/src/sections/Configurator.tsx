import { useState, type CSSProperties } from 'react';
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
import Eyebrow from './Eyebrow';
import { Token } from '@astryxdesign/core/Token';
import { ADDONS, GROUPS, TIERS, chf, mailto, total, useT, type T } from '../data';

// Dev-only self-check of the pricing maths (prices come from data.ts).
if (import.meta.env.DEV) {
  const set = (...ids: string[]) => new Set(ids);
  console.assert(total(TIERS[0], set('booking', 'calendar')) === 2650, 'Basis+booking+calendar should be 2650');
  console.assert(total(TIERS[1], set('email')) === 2000, 'Pro+email (included) should be 2000');
  console.assert(total(TIERS[0], set()) === 1500, 'Basis alone should be 1500');
}

const abs = (s: CSSProperties): CSSProperties => ({ position: 'absolute', ...s });
const edge = 'calc(var(--spacing-3) * -1)';

// Floating notification chips for automations, overlapping the preview frame edge.
const CHIPS: Record<string, { text: T; dot: 'success' | 'accent' }> = {
  sheet: { text: { de: 'Neue Anfrage · über die Website', en: 'New enquiry · via the website' }, dot: 'accent' },
  autoreply: { text: { de: 'Bestätigung gesendet · automatisch', en: 'Confirmation sent · automatic' }, dot: 'success' },
  calendar: { text: { de: 'Termin im Kalender · Do., 14:00', en: 'Appointment in calendar · Thu, 2 pm' }, dot: 'success' },
  reminder: { text: { de: 'Erinnerung gesendet · 24 h vorher', en: 'Reminder sent · 24 h before' }, dot: 'success' },
  'review-request': { text: { de: '★★★★★ Neue Google-Bewertung', en: '★★★★★ New Google review' }, dot: 'accent' },
};

function Preview({ tier, sel }: { tier: 'basis' | 'pro'; sel: Set<string> }) {
  const t = useT();
  const pro = tier === 'pro';
  const has = (id: string) => sel.has(id);
  const heroStyle: CSSProperties = pro
    ? {
        backgroundImage:
          'linear-gradient(color-mix(in srgb, var(--color-background-inverted) 60%, transparent), color-mix(in srgb, var(--color-background-inverted) 60%, transparent)), url(/work/restaurant.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'var(--color-background-card)',
      }
    : {};
  const chips = Object.keys(CHIPS).filter(id => has(id));

  return (
    <Stack style={{ position: 'relative' }}>
      <Card padding={0} elevation="med" style={{ overflow: 'hidden' }}>
        <Stack>
          {/* browser chrome */}
          <Stack direction="horizontal" gap={2} align="center" padding={2} style={{ background: 'var(--color-background-muted)' }}>
            <StatusDot variant="error" label="" />
            <StatusDot variant="warning" label="" />
            <StatusDot variant="success" label="" />
            <Card variant="default" padding={1} style={{ flex: 1, minWidth: 0 }}>
              <Text type="supporting" size="xsm" maxLines={1}>🔒 cafe-muster.ch</Text>
            </Card>
          </Stack>
          {/* site nav */}
          <Stack direction="horizontal" justify="between" align="center" wrap="wrap" gap={2} paddingInline={3} paddingBlock={2}>
            <Text weight="bold" size="sm">Café Muster</Text>
            <Stack direction="horizontal" gap={2} align="center">
              <Text size="xsm" color="secondary">{t({ de: 'Start', en: 'Home' })}</Text>
              <Text size="xsm" color="secondary">{t({ de: 'Karte', en: 'Menu' })}</Text>
              <Text size="xsm" color="secondary">{t({ de: 'Kontakt', en: 'Contact' })}</Text>
              {has('lang') && <Token label="DE | EN" size="sm" color="blue" />}
            </Stack>
          </Stack>
          {/* hero */}
          <Stack gap={2} padding={4} paddingBlock={pro ? 8 : 4} style={heroStyle}>
            <Heading level={3} color="inherit">
              {pro ? t({ de: 'Ihr Café im Herzen von Brugg', en: 'Your café in the heart of Brugg' }) : t({ de: 'Willkommen im Café Muster', en: 'Welcome to Café Muster' })}
            </Heading>
            <Text size="sm" color="inherit">{t({ de: 'Frischer Kaffee, hausgemachter Kuchen, Brugg AG.', en: 'Fresh coffee, homemade cake, Brugg AG.' })}</Text>
            <Stack direction="horizontal" gap={2} wrap="wrap" align="center">
              <Button size="sm" variant="primary" label={t({ de: 'Termin buchen', en: 'Book a table' })} />
              {has('reviews') && <Text size="xsm" color="inherit">★★★★★ 4,8 · Google</Text>}
            </Stack>
            {pro && <Text size="xsm" color="inherit">info@cafe-muster.ch</Text>}
          </Stack>
          <Stack gap={3} padding={3}>
            {has('booking') && (
              <Card variant="muted" padding={2}>
                <Stack gap={1.5}>
                  <Text weight="semibold" size="sm">{t({ de: 'Termin buchen', en: 'Book an appointment' })}</Text>
                  <Stack direction="horizontal" gap={1} wrap="wrap">
                    <Token size="sm" color="green" label={t({ de: '1 Leistung', en: '1 Service' })} />
                    <Token size="sm" label={t({ de: '2 Datum', en: '2 Date' })} />
                    <Token size="sm" label={t({ de: '3 Zeit', en: '3 Time' })} />
                  </Stack>
                </Stack>
              </Card>
            )}
            {/* services: 3 placeholder cards */}
            <Grid columns={3} gap={2}>
              {[
                { de: 'Kaffee', en: 'Coffee' },
                { de: 'Frühstück', en: 'Breakfast' },
                { de: 'Kuchen', en: 'Cake' },
              ].map(s => (
                <Card key={s.en} variant="muted" padding={2}>
                  <Stack gap={1}>
                    <Card variant="gray" padding={3} />
                    <Text size="xsm" weight="semibold">{t(s)}</Text>
                  </Stack>
                </Card>
              ))}
            </Grid>
            {has('menu') && (
              <Stack gap={0.5}>
                {[
                  [{ de: 'Cappuccino', en: 'Cappuccino' }, '4.50'],
                  [{ de: 'Gipfeli', en: 'Croissant' }, '2.80'],
                  [{ de: 'Tagesmenü', en: 'Daily special' }, '18.50'],
                ].map(([n, p]) => (
                  <Stack key={p as string} direction="horizontal" justify="between">
                    <Text size="xsm">{t(n as T)}</Text>
                    <Text size="xsm" hasTabularNumbers>{p as string}</Text>
                  </Stack>
                ))}
              </Stack>
            )}
            <Divider />
            <Text size="xsm" color="secondary">{t({ de: 'Öffnungszeiten: Mo bis Fr 07:00 bis 18:00, Sa 08:00 bis 16:00', en: 'Opening hours: Mon to Fri 7 am to 6 pm, Sat 8 am to 4 pm' })}</Text>
            {has('form') ? (
              <Stack gap={1}>
                <Card variant="muted" padding={1.5}><Text size="xsm" color="placeholder">{t({ de: 'Name', en: 'Name' })}</Text></Card>
                <Card variant="muted" padding={1.5}><Text size="xsm" color="placeholder">{t({ de: 'Nachricht', en: 'Message' })}</Text></Card>
                <Button size="sm" variant="secondary" label={t({ de: 'Senden', en: 'Send' })} />
              </Stack>
            ) : (
              <Button size="sm" variant="secondary" label={t({ de: 'E-Mail schreiben', en: 'Send an email' })} />
            )}
          </Stack>
          {has('whatsapp') && (
            <Stack align="end" paddingInline={3} paddingBlockEnd={3}>
              <Button size="sm" variant="primary" label="WhatsApp" />
            </Stack>
          )}
        </Stack>
      </Card>
      {chips.length > 0 && (
        <Stack gap={2} align="end" style={abs({ top: '30%', insetInlineEnd: edge, maxWidth: '85%', pointerEvents: 'none' })}>
          {chips.map(id => (
            <Card key={id} padding={1.5} elevation="high">
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

export default function Configurator() {
  const t = useT();
  const [tierId, setTierId] = useState<'basis' | 'pro'>('basis');
  const [sel, setSel] = useState<Set<string>>(new Set());
  const tier = TIERS.find(x => x.id === tierId)!;
  const toggle = (id: string, on: boolean) =>
    setSel(prev => {
      const n = new Set(prev);
      if (on) n.add(id); else n.delete(id);
      return n;
    });

  const included = (a: (typeof ADDONS)[number]) => a.includedIn === tierId;
  const chosen = ADDONS.filter(a => included(a) || sel.has(a.id));
  const paid = chosen.filter(a => !included(a));
  const sum = total(tier, sel);
  const effective = new Set(chosen.map(a => a.id));

  const body = [
    `${t({ de: 'Paket', en: 'Package' })}: ${t(tier.name)} (${chf(tier.price)})`,
    '',
    t({ de: 'Zusätze', en: 'Add-ons' }) + ':',
    ...(chosen.length ? chosen.map(a => `- ${t(a.name)}: ${included(a) ? t({ de: 'inklusive', en: 'included' }) : chf(a.price)}`) : ['-']),
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
        <Text color="secondary">{t({ de: 'Wählen Sie ein Paket und Zusätze. Die Vorschau und der Preis passen sich sofort an.', en: 'Pick a package and add-ons. The preview and price update instantly.' })}</Text>
        <Link href="#beispiele" size="sm">{t({ de: 'Beispiele für Buchungs-Funnels ansehen', en: 'See booking funnel examples' })}</Link>
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
                    const inc = included(a);
                    return (
                      <Stack key={a.id} direction="horizontal" justify="between" align="start" gap={3}>
                        <CheckboxInput
                          label={t(a.name)}
                          description={t(a.desc)}
                          value={inc || sel.has(a.id)}
                          isDisabled={inc}
                          onChange={c => toggle(a.id, c)}
                        />
                        <Text size="sm" weight="medium" hasTabularNumbers style={{ whiteSpace: 'nowrap' }}>
                          {inc ? t({ de: 'Inklusive', en: 'Included' }) : `+ ${chf(a.price)}`}
                        </Text>
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
          <Text weight="semibold">{t({ de: 'Vorschau Ihrer Website (Beispiel)', en: 'Preview of your website (sample)' })}</Text>
          <Stack paddingInlineEnd={3}>
            <Preview tier={tierId} sel={effective} />
          </Stack>
          {(effective.has('cards') || effective.has('flyer') || effective.has('social')) && (
            <Stack direction="horizontal" gap={2} wrap="wrap">
              {[
                ['cards', { de: 'Visitenkarte', en: 'Business card' }],
                ['flyer', { de: 'Flyer', en: 'Flyer' }],
                ['social', { de: 'Social Media', en: 'Social media' }],
              ]
                .filter(([id]) => effective.has(id as string))
                .map(([id, n]) => (
                  <Card key={id as string} variant="muted" padding={2} width={96}>
                    <Stack gap={1} align="center">
                      <Card variant="gray" padding={3} width="100%" />
                      <Text size="xsm">{t(n as T)}</Text>
                    </Stack>
                  </Card>
                ))}
            </Stack>
          )}

          <Card padding={4} elevation="low">
            <Stack gap={3}>
              <Stack direction="horizontal" justify="between" gap={3}>
                <Text weight="semibold">{t(tier.name)}</Text>
                <Text hasTabularNumbers>{chf(tier.price)}</Text>
              </Stack>
              {paid.map(a => (
                <Stack key={a.id} direction="horizontal" justify="between" gap={3}>
                  <Text size="sm">{t(a.name)}</Text>
                  <Text size="sm" hasTabularNumbers style={{ whiteSpace: 'nowrap' }}>{chf(a.price)}</Text>
                </Stack>
              ))}
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
