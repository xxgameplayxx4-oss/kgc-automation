import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Badge } from '@astryxdesign/core/Badge';
import { Icon } from '@astryxdesign/core/Icon';
import { Table } from '@astryxdesign/core/Table';
import HeroFilmDemo from './HeroFilmDemo';
import PhoneMore from './PhoneMore';
import { usePhone } from './usePhone';
import { Block, Chips, Flow, SectionHead, VIZ } from './viz';
import { AUTOMATION_MONTHLY, CARE, CARE_HOURS, DOMAIN_FEE, FEATURES, TIERS, UPGRADE_PRICE, chf, contactDraft, useT, type T } from '../data';
import { UI, ic } from './uiIcons';

const [CORE, PRO] = TIERS;
const feat = (id: string) => FEATURES.find(f => f.id === id)!.name;
const cta = (subject: string, body = '') => () => { contactDraft.subject = subject; contactDraft.body = body; };

const Points = ({ items }: { items: T[] }) => {
  const t = useT();
  return (
    <VStack gap={1.5}>
      {items.map(x => (
        <HStack key={x.de} gap={2} vAlign="center" wrap="nowrap">
          <Icon icon={VIZ.check} size="sm" color="accent" />
          <Text size="sm">{t(x)}</Text>
        </HStack>
      ))}
    </VStack>
  );
};

type Row = { key: string; name: T; upgrade: boolean; core: boolean; pro: boolean };
const ROWS: Row[] = [
  { key: 'base', name: { de: 'Basis: mobil, schnell, SEO, Impressum, SSL', en: 'Basics: mobile, fast, SEO, legal pages, SSL' }, upgrade: true, core: true, pro: true },
  ...FEATURES.map(f => ({ key: f.id, name: f.name, upgrade: false, core: CORE.includes.includes(f.id), pro: true })),
];

function Matrix() {
  const t = useT();
  const mark = (on: boolean) => on
    ? <Icon icon={VIZ.check} size="sm" color="accent" aria-label={t({ de: 'Enthalten', en: 'Included' })} />
    : <Text color="secondary" aria-label={t({ de: 'Nicht enthalten', en: 'Not included' })}>-</Text>;
  return (
    <PhoneMore items={ROWS} limit={7}>{shown => (
      <Table
        data={[...shown] as unknown as Record<string, unknown>[]}
        idKey="key"
        density="compact"
        columns={[
          { key: 'name', header: t({ de: 'Leistung', en: 'Feature' }), renderCell: (r: Record<string, unknown>) => <Text size="sm">{t((r as Row).name)}</Text> },
          { key: 'upgrade', header: 'Upgrade', align: 'center', renderCell: (r: Record<string, unknown>) => mark((r as Row).upgrade) },
          { key: 'core', header: 'Core', align: 'center', renderCell: (r: Record<string, unknown>) => mark((r as Row).core) },
          { key: 'pro', header: 'Pro', align: 'center', renderCell: (r: Record<string, unknown>) => mark((r as Row).pro) },
        ]}
      />
    )}</PhoneMore>
  );
}

export default function Packages() {
  const t = useT();
  const phone = usePhone();
  const pad = phone ? 4 : 5;
  return (
    <Block id="pakete">
      <SectionHead level={1} eyebrow={{ de: 'Fixpreise', en: 'Fixed prices' }} title={{ de: 'Websites zum Fixpreis', en: 'Websites at a fixed price' }} sub={{ de: 'Wählen Sie Ihr Paket, den Rest erledige ich.', en: 'Pick your package, I take care of the rest.' }} />
      <Grid columns={{ minWidth: 260, max: 3 }} gap={4} align="stretch">
        <Card variant="muted" padding={pad} style={phone ? { order: 3 } : undefined}>
          <VStack gap={3} height="100%">
            <Heading level={3}>{t({ de: 'Website-Upgrade', en: 'Website upgrade' })}</Heading>
            <Text type="large" weight="semibold" color="accent">{t({ de: `ab ${chf(UPGRADE_PRICE)}`, en: `from ${chf(UPGRADE_PRICE)}` })}</Text>
            <Text color="secondary">{t({ de: 'Für Betriebe mit bestehender, veralteter Website.', en: 'For businesses with a dated website.' })}</Text>
            <Points items={[
              { de: 'Aus Ihren Texten und Bildern', en: 'Built from your texts and images' },
              { de: 'Neu, schnell, mobil', en: 'New, fast, mobile' },
              { de: 'Domain und Hosting verbunden', en: 'Domain and hosting connected' },
            ]} />
            <Button icon={ic(UI.chat)} variant="secondary" href="#kontakt" label={t({ de: 'Upgrade anfragen', en: 'Request upgrade' })}
              onClick={cta('Website-Upgrade', t({ de: 'Meine aktuelle Website: ', en: 'My current website: ' }))} />
          </VStack>
        </Card>
        <Card padding={pad} style={phone ? { order: 2 } : undefined}>
          <VStack gap={3} height="100%">
            <Heading level={3}>{t(CORE.name)}</Heading>
            <Text type="large" weight="semibold" color="accent">{chf(CORE.price)}</Text>
            <Text color="secondary">{t({ de: 'Für Betriebe, die online überzeugen wollen.', en: 'For businesses that want to impress online.' })}</Text>
            <Points items={[feat('email'), feat('form'), feat('reviews'), feat('hours')]} />
            <Button icon={ic(UI.chat)} variant="secondary" href="#kontakt" label={t({ de: 'Core anfragen', en: 'Request Core' })} onClick={cta('Website Core')} />
          </VStack>
        </Card>
        <Card variant="yellow" elevation="med" padding={phone ? 5 : 6} style={phone ? { order: 1 } : undefined}>
          <VStack gap={3} height="100%">
            <HStack gap={2} vAlign="center" wrap="wrap">
              <Heading level={3}>{t(PRO.name)}</Heading>
              <Badge variant="yellow" label={t({ de: 'Empfohlen', en: 'Recommended' })} />
            </HStack>
            <Text type="large" weight="semibold" color="accent" style={{ fontSize: 'var(--font-size-3xl, 2rem)' }}>{chf(PRO.price)}</Text>
            <Text color="secondary">{t({ de: 'Für Betriebe, die sich abheben und mehr Anfragen wollen.', en: 'For businesses that want to stand out and win more enquiries.' })}</Text>
            <Points items={[
              { de: 'Alles aus Core', en: 'Everything in Core' },
              feat('hero'),
              feat('booking'),
              { de: 'Alle weiteren Funktionen', en: 'All further features' },
            ]} />
            <Button icon={ic(UI.chat)} variant="primary" href="#kontakt" label={t({ de: 'Pro anfragen', en: 'Request Pro' })} onClick={cta('Website Pro')} />
            <Button icon={ic(UI.play)} size="sm" variant="ghost" href="#film-demo" label={t({ de: 'Demo ansehen', en: 'View demo' })} />
          </VStack>
        </Card>
      </Grid>
      <Matrix />
      <Flow numbered steps={[
        { title: { de: 'Gespräch', en: 'Call' }, text: { de: 'Ziel und Inhalte', en: 'Goals and content' } },
        { title: { de: 'Entwurf', en: 'Draft' }, text: { de: 'Hälfte bei Auftrag', en: 'Half on order' } },
        { title: { de: 'Korrektur', en: 'Revision' }, text: { de: 'Eine Runde inklusive', en: 'One round included' } },
        { title: { de: 'Live', en: 'Live' }, text: { de: 'Rest bei Fertigstellung', en: 'Rest on completion' }, accent: true },
      ]} />
      <HeroFilmDemo />
      <Card variant="muted" padding={phone ? 4 : 5}>
        <HStack gap={4} vAlign="center" hAlign="between" wrap="wrap">
          <Text weight="semibold">{t({ de: `Automationen dazu: ab ${chf(AUTOMATION_MONTHLY)} / Monat`, en: `Add automations: from ${chf(AUTOMATION_MONTHLY)} / month` })}</Text>
          <Button icon={ic(UI.arrow)} variant="secondary" href="#automationen" label={t({ de: 'Automationen ansehen', en: 'View automations' })} />
        </HStack>
      </Card>
    </Block>
  );
}

export function Care() {
  const t = useT();
  const phone = usePhone();
  const names: [keyof typeof CARE, T][] = [['upgrade', { de: 'Upgrade', en: 'Upgrade' }], ['core', CORE.name], ['pro', PRO.name]];
  return (
    <Block id="wartung">
      <SectionHead title={{ de: 'Monatliche Wartung', en: 'Monthly maintenance' }} sub={{ de: 'Optional. Ihre Website bleibt aktuell und sicher.', en: 'Optional. Your website stays current and secure.' }} />
      <Chips items={[
        { icon: VIZ.screen, label: { de: 'Hosting', en: 'Hosting' } },
        { icon: VIZ.lock, label: { de: 'Updates und Sicherheit', en: 'Updates and security' } },
        { icon: VIZ.clock, label: { de: `${CARE_HOURS} Stunden Änderungen`, en: `${CARE_HOURS} hours of changes` } },
      ]} />
      <Grid columns={3} gap={phone ? 2 : 4}>
        {names.map(([k, n]) => (
          <Card key={k} variant="muted" padding={phone ? 3 : 4}>
            <VStack gap={0.5}>
              <Text size="sm" color="secondary">{t(n)}</Text>
              <Text weight="semibold" hasTabularNumbers>{chf(CARE[k])}</Text>
              <Text size="sm" color="secondary">{t({ de: 'pro Monat', en: 'per month' })}</Text>
            </VStack>
          </Card>
        ))}
      </Grid>
      <Text size="sm" color="secondary">{t({ de: `Domain: + ${chf(DOMAIN_FEE)} pro Monat über mich, oder Sie verwalten sie selbst.`, en: `Domain: + ${chf(DOMAIN_FEE)} per month through me, or you manage it yourself.` })}</Text>
      <Card variant="muted" padding={phone ? 4 : 5}>
        <HStack gap={4} vAlign="center" hAlign="between" wrap="wrap">
          <VStack gap={1}>
            <Heading level={3}>{t({ de: 'Individuell', en: 'Custom' })}</Heading>
            <Text color="secondary">{t({ de: 'Sie brauchen mehr? Schreiben Sie mir.', en: 'Need more? Write to me.' })}</Text>
          </VStack>
          <Button icon={ic(UI.send)} href="#kontakt" label={t({ de: 'Anfrage senden', en: 'Send enquiry' })} />
        </HStack>
      </Card>
      <Text type="supporting">{t({ de: 'Website-Preise einmalig in CHF, Automationen monatlich. Drittkosten zum Selbstkostenpreis.', en: 'Website prices are one-time in CHF, automations monthly. Third-party costs at cost.' })}</Text>
    </Block>
  );
}
