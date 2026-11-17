import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import WorkflowPreviews from './WorkflowPreviews';
import AutomationFilm from './AutomationFilm';
import { Bars, Block, Chips, Flow, SectionHead, Tile, VIZ, type Glyph } from './viz';
import { AUTOMATION_MONTHLY, AUTOPILOT_MONTHLY, chf, contactDraft, useT, type T } from '../data';
import { UI, ic } from './uiIcons';
import { usePhone } from './usePhone';

const CHANNELS: { icon: Glyph; label: T }[] = [
  { icon: UI.phone, label: { de: 'Anruf', en: 'Call' } },
  { icon: UI.chat, label: { de: 'WhatsApp', en: 'WhatsApp' } },
  { icon: UI.mail, label: { de: 'E-Mail', en: 'Email' } },
  { icon: UI.doc, label: { de: 'Formular', en: 'Form' } },
];

const IDEA = [
  { icon: VIZ.inbox, title: { de: 'Anfrage kommt', en: 'Enquiry arrives' } },
  { icon: VIZ.bolt, title: { de: 'Autopilot', en: 'Autopilot' }, accent: true },
  { icon: VIZ.check, title: { de: 'Beantwortet, erfasst, nachgefasst', en: 'Answered, listed, followed up' } },
];

const AUTOPILOT_FACTS: { icon: Glyph; label: T }[] = [
  { icon: VIZ.clock, label: { de: 'Antwort in 1 Minute', en: 'Reply in 1 minute' } },
  { icon: VIZ.inbox, label: { de: 'Eine Liste', en: 'One list' } },
  { icon: VIZ.chart, label: { de: 'Monatsbericht', en: 'Monthly report' } },
];

const MORE: { icon: Glyph; title: T }[] = [
  { icon: UI.doc, title: { de: 'Offerte in 10 Minuten', en: 'Quote in 10 minutes' } },
  { icon: VIZ.coin, title: { de: 'Rapport zu Rechnung', en: 'Report to invoice' } },
  { icon: UI.mail, title: { de: 'Mahnwesen', en: 'Payment reminders' } },
  { icon: UI.calendar, title: { de: 'Termin-Erinnerung und Lückenfüller', en: 'Appointment reminders and gap filler' } },
  { icon: VIZ.rocket, title: { de: 'Probetraining-Nachfassen', en: 'Trial class follow-up' } },
  { icon: VIZ.star, title: { de: 'Bewertungs-Anfrage', en: 'Review request' } },
];

const STEPS = [
  { icon: UI.calendar, title: { de: 'Kostenloses Gespräch', en: 'Free call' }, text: { de: '20 Minuten', en: '20 minutes' } },
  { icon: VIZ.screen, title: { de: 'Einrichtung', en: 'Setup' } },
  { icon: VIZ.check, title: { de: 'Läuft', en: 'Running' }, text: { de: 'Monatsbericht', en: 'Monthly report' } },
];

const TRUST: { icon: Glyph; label: T }[] = [
  { icon: VIZ.pin, label: { de: 'Ansprechpartner aus Brugg', en: 'Contact from Brugg' } },
  { icon: VIZ.check, label: { de: 'Freigabe durch Sie', en: 'Your approval first' } },
  { icon: VIZ.lock, label: { de: 'Daten in CH oder EU', en: 'Data in CH or EU' } },
  { icon: VIZ.clock, label: { de: 'Monatlich, kein Vorschuss', en: 'Monthly, no up-front fee' } },
];

export default function Automations() {
  const t = useT();
  const phone = usePhone();
  const ask = (subject: string) => () => { contactDraft.subject = subject; };
  return (
    <VStack gap={0}>
      <Block gap={8}>
        <SectionHead level={1} eyebrow={{ de: 'Automationen', en: 'Automations' }} title={{ de: 'Büroarbeit, die sich selbst erledigt', en: 'Office work that takes care of itself' }} sub={{ de: 'Mit den Werkzeugen, die Sie schon haben.', en: 'With the tools you already have.' }} />
        <VStack gap={4}>
          <Chips items={CHANNELS} />
          <Flow steps={IDEA} />
        </VStack>
        <Card variant="muted" padding={phone ? 4 : 5}>
          <VStack gap={3}>
            <Text weight="semibold">{t({ de: 'Zeit bis zur ersten Antwort (Beispiel)', en: 'Time to first reply (example)' })}</Text>
            <Bars items={[
              { label: { de: 'Ohne Autopilot', en: 'Without Autopilot' }, value: 100, display: t({ de: 'Stunden bis Tage', en: 'Hours to days' }) },
              { label: { de: 'Mit Autopilot', en: 'With Autopilot' }, value: 2, accent: true, display: t({ de: 'unter 1 Minute', en: 'under 1 minute' }) },
            ]} />
          </VStack>
        </Card>
      </Block>

      {/* Scene player synced to the voiceover (AutomationFilm.tsx). */}
      <Block><AutomationFilm /></Block>

      <Block gap={4}>
        <SectionHead title={{ de: 'So läuft es ab', en: 'How it runs' }} />
        <WorkflowPreviews />
      </Block>

      <Block gap={4}>
        <SectionHead title={{ de: 'Zwei Pakete', en: 'Two plans' }} />
        <Grid columns={{ minWidth: 300, max: 2 }} gap={4} align="stretch">
          <Card id="autopilot" variant="yellow" elevation="low" padding={phone ? 4 : 5}>
            <VStack gap={3}>
              <Heading level={3}>{t({ de: 'Anfragen-Autopilot', en: 'Enquiry Autopilot' })}</Heading>
              <Text type="large" weight="semibold" color="accent">{t({ de: `ab ${chf(AUTOPILOT_MONTHLY)} / Monat`, en: `from ${chf(AUTOPILOT_MONTHLY)} / month` })}</Text>
              <Chips items={AUTOPILOT_FACTS} />
              <HStack>
                <Button icon={ic(UI.calendar)} variant="primary" href="#kontakt" label={t({ de: 'Kostenloses Gespräch', en: 'Free call' })} onClick={ask('Anfragen-Autopilot')} />
              </HStack>
            </VStack>
          </Card>
          <Card variant="default" padding={phone ? 4 : 5}>
            <VStack gap={3}>
              <Heading level={3}>{t({ de: 'Automation Add-on', en: 'Automation Add-on' })}</Heading>
              <Text type="large" weight="semibold" color="accent">{t({ de: `ab ${chf(AUTOMATION_MONTHLY)} / Monat`, en: `from ${chf(AUTOMATION_MONTHLY)} / month` })}</Text>
              <Text color="secondary">{t({ de: 'Alle Automationen inklusive.', en: 'All automations included.' })}</Text>
              <HStack>
                <Button icon={ic(UI.chat)} variant="secondary" href="#kontakt" label={t({ de: 'Darüber sprechen', en: 'Talk about this' })} onClick={ask('Automation Add-on')} />
              </HStack>
            </VStack>
          </Card>
        </Grid>
      </Block>

      <Block gap={4}>
        <SectionHead title={{ de: 'Weitere Automationen', en: 'More automations' }} />
        <Grid columns={phone ? 2 : { minWidth: 200, max: 3 }} gap={phone ? 3 : 4} align="stretch">
          {MORE.map(m => <Tile key={m.title.de} icon={m.icon} title={m.title} />)}
        </Grid>
      </Block>

      <Block gap={4}>
        <SectionHead title={{ de: 'Ablauf', en: 'Process' }} />
        <Flow steps={STEPS} numbered />
      </Block>

      <Block gap={4}>
        <Chips items={TRUST} />
      </Block>
    </VStack>
  );
}
