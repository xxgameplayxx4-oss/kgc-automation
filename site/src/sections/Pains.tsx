import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Badge } from '@astryxdesign/core/Badge';
import Eyebrow from './Eyebrow';
import PromoFilm from './PromoFilm';
import { AUTOMATION_MONTHLY, AUTOPILOT_MONTHLY, CORE_PRICE, PRO_PRICE, UPGRADE_PRICE, chf, contactDraft, useT } from '../data';
import { UI, ic } from './uiIcons';
import { usePhone } from './usePhone';
import { Bars, Block, Flow, SectionHead, Tile, VIZ } from './viz';

// Start page story (2026-11-18 restructure): problem → solution → film → offer. Visuals first, one line of text each.
const PAINS = [
  { icon: UI.phone, title: { de: 'Anfragen gehen unter', en: 'Enquiries get lost' }, text: { de: 'Anruf verpasst, E-Mail bleibt liegen.', en: 'Call missed, email left unanswered.' } },
  { icon: UI.doc, title: { de: 'Offerten ohne Nachfassen', en: 'Quotes with no follow-up' }, text: { de: 'Verschickt und vergessen.', en: 'Sent and forgotten.' } },
  { icon: VIZ.coin, title: { de: 'Rechnungen gehen spät raus', en: 'Invoices go out late' }, text: { de: 'Mahnen ist unangenehm.', en: 'Chasing payment is awkward.' } },
  { icon: UI.calendar, title: { de: 'Termine und No-Shows', en: 'Bookings and no-shows' }, text: { de: 'Leere Lücken im Kalender.', en: 'Empty gaps in the calendar.' } },
];

export default function Pains() {
  const phone = usePhone();
  return (
    <Block>
      <SectionHead eyebrow={{ de: 'Das Problem', en: 'The problem' }} title={{ de: 'Hier verlieren KMU jede Woche Stunden', en: 'Where SMEs lose hours every week' }} />
      <Grid columns={phone ? 2 : { minWidth: 220, max: 4 }} gap={4}>
        {PAINS.map(p => <Tile key={p.title.de} {...p} />)}
      </Grid>
    </Block>
  );
}

const STEPS = [
  { icon: VIZ.inbox, title: { de: 'Anfrage kommt', en: 'Enquiry arrives' }, text: { de: 'Anruf, WhatsApp, E-Mail, Formular', en: 'Call, WhatsApp, email, form' } },
  { icon: VIZ.bolt, accent: true, title: { de: 'Autopilot antwortet', en: 'Autopilot replies' }, text: { de: 'Innert 1 Minute, rund um die Uhr', en: 'Within 1 minute, around the clock' } },
  { icon: VIZ.check, title: { de: 'Sie entscheiden', en: 'You decide' }, text: { de: 'Alles in einer Liste, nichts ohne Freigabe', en: 'All in one list, nothing without approval' } },
  { icon: VIZ.star, title: { de: 'Nachfassen', en: 'Follow-up' }, text: { de: 'Offerte, Erinnerung, Google-Bewertung', en: 'Quote, reminder, Google review' } },
];

export function HowItWorks() {
  const t = useT();
  return (
    <Block>
      <SectionHead eyebrow={{ de: 'Die Lösung', en: 'The solution' }} title={{ de: 'So läuft eine Anfrage ab', en: 'How an enquiry runs' }}
        sub={{ de: 'Mit den Programmen, die Sie schon haben.', en: 'With the tools you already have.' }} />
      <Flow steps={STEPS} />
      <Card variant="muted" padding={5}>
        <VStack gap={3}>
          <Text weight="semibold">{t({ de: 'Zeit bis zur ersten Antwort', en: 'Time to first reply' })}</Text>
          <Bars items={[
            { label: { de: 'Ohne Autopilot (Beispiel)', en: 'Without autopilot (example)' }, value: 100, display: t({ de: 'Stunden bis Tage', en: 'hours to days' }) },
            { label: { de: 'Mit Autopilot', en: 'With autopilot' }, value: 3, display: '< 1 Min', accent: true },
          ]} />
        </VStack>
      </Card>
    </Block>
  );
}

export function Film() {
  return (
    <Block id="film">
      <SectionHead center eyebrow={{ de: 'Film', en: 'Film' }} title={{ de: 'In einer Minute erklärt', en: 'Explained in one minute' }} />
      <VStack width="100%" maxWidth={960} style={{ marginInline: 'auto' }}><PromoFilm /></VStack>
    </Block>
  );
}

const Row = ({ name, price, strong = false, badge }: { name: string; price: string; strong?: boolean; badge?: string }) => (
  <HStack hAlign="between" vAlign="center" gap={3} paddingBlock={2} style={{ borderTop: '1px solid var(--color-border)' }}>
    <HStack gap={2} vAlign="center" wrap="wrap">
      <Text weight={strong ? 'semibold' : undefined}>{name}</Text>
      {badge && <Badge variant="yellow" label={badge} />}
    </HStack>
    <Text weight="semibold" color={strong ? 'accent' : undefined} hasTabularNumbers>{price}</Text>
  </HStack>
);

/** The offer in one view: two services, their price ladders, one main button each. */
export function Offers() {
  const t = useT();
  const phone = usePhone();
  const month = (n: number) => t({ de: `ab ${chf(n)} / Monat`, en: `from ${chf(n)} / month` });
  return (
    <Block>
      <SectionHead eyebrow={{ de: 'Das Angebot', en: 'The offer' }} title={{ de: 'Zwei Leistungen, klare Preise', en: 'Two services, clear prices' }} />
      <Grid columns={{ minWidth: 300, max: 2 }} gap={4} align="stretch">
        <Card id="autopilot-teaser" variant="yellow" elevation="low" padding={phone ? 4 : 6}>
          <VStack gap={4} height="100%">
            <VStack gap={1}>
              <Eyebrow>{t({ de: 'Monatlich', en: 'Monthly' })}</Eyebrow>
              <Heading level={3} type="display-3">{t({ de: 'Automationen', en: 'Automations' })}</Heading>
              <Text color="secondary">{t({ de: 'Anfragen, Offerten, Rechnungen und Termine laufen von selbst.', en: 'Enquiries, quotes, invoices and bookings run themselves.' })}</Text>
            </VStack>
            <VStack>
              <Row name={t({ de: 'Anfragen-Autopilot', en: 'Enquiry Autopilot' })} price={month(AUTOPILOT_MONTHLY)} />
              <Row strong name={t({ de: 'Alle Automationen', en: 'All automations' })} price={month(AUTOMATION_MONTHLY)} />
            </VStack>
            <HStack gap={3} wrap="wrap" style={{ marginTop: 'auto' }}>
              <Button icon={ic(UI.calendar)} variant="primary" href="#kontakt" onClick={() => { contactDraft.subject = 'Automationen'; }} label={t({ de: 'Kostenloses Gespräch', en: 'Free call' })} />
              <Button icon={ic(UI.arrow)} href="#automationen" label={t({ de: 'Automationen ansehen', en: 'See automations' })} />
            </HStack>
          </VStack>
        </Card>
        <Card padding={phone ? 4 : 6}>
          <VStack gap={4} height="100%">
            <VStack gap={1}>
              <Eyebrow>{t({ de: 'Fixpreis', en: 'Fixed price' })}</Eyebrow>
              <Heading level={3} type="display-3">Websites</Heading>
              <Text color="secondary">{t({ de: 'Schnell, mobil und gebaut, um Anfragen zu bringen.', en: 'Fast, mobile and built to bring enquiries.' })}</Text>
            </VStack>
            <VStack>
              <Row name={t({ de: 'Website-Upgrade', en: 'Website upgrade' })} price={t({ de: `ab ${chf(UPGRADE_PRICE)}`, en: `from ${chf(UPGRADE_PRICE)}` })} />
              <Row name="Core" price={chf(CORE_PRICE)} />
              <Row strong name={t({ de: 'Pro, mit Film', en: 'Pro, with film' })} price={chf(PRO_PRICE)} badge={t({ de: 'Empfohlen', en: 'Recommended' })} />
            </VStack>
            <HStack gap={3} wrap="wrap" style={{ marginTop: 'auto' }}>
              <Button icon={ic(UI.arrow)} variant="primary" href="#websites" label={t({ de: 'Pakete vergleichen', en: 'Compare packages' })} />
              <Button icon={ic(UI.eye)} href="#konfigurator" label={t({ de: 'Selbst zusammenstellen', en: 'Build your own' })} />
            </HStack>
          </VStack>
        </Card>
      </Grid>
    </Block>
  );
}
