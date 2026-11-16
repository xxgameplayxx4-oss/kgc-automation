import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import Eyebrow from './Eyebrow';
import { AUTOMATION_MONTHLY, AUTOPILOT_MONTHLY, BASE_PRICE, UPGRADE_PRICE, chf, contactDraft, useT } from '../data';
import { UI, ic } from './uiIcons';
import { usePhone } from './usePhone';
import PhoneMore from './PhoneMore';

const wrap = { marginInline: 'auto', width: '100%' } as const;

const PAINS = [
  {
    title: { de: 'Anfragen gehen unter', en: 'Enquiries get lost' },
    text: {
      de: 'Anrufe verpasst, weil Sie auf der Baustelle sind. E-Mails und WhatsApp werden erst Tage später beantwortet.',
      en: 'Calls missed because you are on site. Emails and WhatsApp messages answered days later.',
    },
  },
  {
    title: { de: 'Niemand fasst bei Offerten nach', en: 'Nobody follows up on quotes' },
    text: {
      de: 'Die Offerte geht raus, dann kommt der nächste Auftrag. Nachfragen bleibt liegen.',
      en: 'The quote goes out, then the next job comes. Following up gets left behind.',
    },
  },
  {
    title: { de: 'Rechnungen gehen spät raus', en: 'Invoices go out late' },
    text: {
      de: 'Und Mahnen ist unangenehm, also wartet man lieber noch eine Woche.',
      en: 'And chasing payment is awkward, so you wait another week.',
    },
  },
  {
    title: { de: 'Termine und No-Shows', en: 'Appointments and no-shows' },
    text: {
      de: 'Absagen in letzter Minute hinterlassen leere Lücken im Kalender.',
      en: 'Last-minute cancellations leave empty gaps in your calendar.',
    },
  },
];

export default function Pains() {
  const t = useT();
  const phone = usePhone();
  return (
    <VStack as="section" gap={6} paddingInline={4} paddingBlock={10} maxWidth={1200} style={wrap}>
      <VStack gap={2} maxWidth={760}>
        <Eyebrow>{t({ de: 'Wo KMU Zeit verlieren', en: 'Where small businesses lose time' })}</Eyebrow>
        <Heading level={2}>{t({ de: 'Das kostet Sie jede Woche Stunden', en: 'This costs you hours every week' })}</Heading>
        {!phone && (
          <Text color="secondary">
            {t({
              de: 'Eine neue Website allein bringt keinen Auftrag, wenn Anfragen liegen bleiben. Deshalb fange ich hier an.',
              en: 'A new website alone wins no jobs if enquiries sit unanswered. So I start here.',
            })}
          </Text>
        )}
      </VStack>
      <Grid columns={phone ? 2 : { minWidth: 240 }} gap={4}>
        {PAINS.map(p => (
          <Card key={p.title.de} variant="muted" padding={phone ? 3 : 5}>
            <VStack gap={2}>
              <Text weight="semibold">{t(p.title)}</Text>
              {!phone && <Text size="sm" color="secondary">{t(p.text)}</Text>}
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}

const AUTOPILOT_POINTS = [
  { de: 'Verpasster Anruf → SMS in 1 Minute', en: 'Missed call → SMS within 1 minute' },
  { de: 'E-Mail, WhatsApp, Formular → sofortige Antwort', en: 'Email, WhatsApp, form → instant reply' },
  { de: 'Offerte verschickt → Nachfassen nach 5 Tagen', en: 'Quote sent → follow-up after 5 days' },
  { de: 'Auftrag erledigt → Bitte um Google-Bewertung', en: 'Job done → Google review request' },
  { de: 'Anfrage 24 Std. offen → Erinnerung an Sie', en: 'Enquiry open 24 h → reminder to you' },
  { de: 'Monatsbericht: Anfragen, Antwortzeit, Aufträge', en: 'Monthly report: enquiries, response time, jobs' },
];

export function AutopilotTeaser() {
  const t = useT();
  const phone = usePhone();
  return (
    <VStack id="autopilot-teaser" as="section" paddingInline={4} paddingBlock={10} maxWidth={1200} style={wrap}>
      <Card variant="yellow" elevation="low" padding={phone ? 4 : 6}>
        <VStack gap={4}>
          <VStack gap={2}>
            <Eyebrow>{t({ de: 'Das Hauptangebot', en: 'The main offer' })}</Eyebrow>
            <Heading level={2}>{t({ de: 'Anfragen-Autopilot', en: 'Enquiry Autopilot' })}</Heading>
            <Text weight="semibold">{t({ de: `ab ${chf(AUTOPILOT_MONTHLY)} / Monat`, en: `from ${chf(AUTOPILOT_MONTHLY)} / month` })}</Text>
            <Text color="secondary">
              {t({
                de: 'Jede Anfrage wird sofort beantwortet und nachverfolgt, ohne dass Sie daran denken müssen.',
                en: 'Every enquiry gets an instant reply and a follow-up, without you having to remember.',
              })}
            </Text>
          </VStack>
          <PhoneMore items={AUTOPILOT_POINTS} limit={3}>
            {shown => (
              <VStack gap={1.5} as="ul" style={{ margin: 0, paddingInlineStart: 'var(--spacing-4)' }}>
                {shown.map(p => (
                  <li key={p.de}><Text size="sm">{t(p)}</Text></li>
                ))}
              </VStack>
            )}
          </PhoneMore>
          <Text type="supporting">
            {t({
              de: `Weitere Automationen (Offerte, Rechnung, Mahnwesen, Termine): Add-on ab ${chf(AUTOMATION_MONTHLY)} / Monat.`,
              en: `More automations (quotes, invoices, reminders, bookings): add-on from ${chf(AUTOMATION_MONTHLY)} / month.`,
            })}
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button icon={ic(UI.calendar)}
              variant="primary"
              href="#kontakt"
              onClick={() => { contactDraft.subject = 'Anfragen-Autopilot'; }}
              label={t({ de: 'Kostenloses Gespräch', en: 'Free call' })}
            />
            <Button icon={ic(UI.arrow)} href="#automationen" label={t({ de: 'Alle Automationen', en: 'All automations' })} />
          </HStack>
        </VStack>
      </Card>
    </VStack>
  );
}

export function WebsitesTeaser() {
  const t = useT();
  const phone = usePhone();
  const base = chf(BASE_PRICE);
  const upgrade = chf(UPGRADE_PRICE);
  return (
    <VStack as="section" paddingInline={4} paddingBlock={10} maxWidth={1200} style={wrap}>
      <Card variant="muted" padding={phone ? 4 : 6}>
        <VStack gap={3} hAlign="start" maxWidth={760}>
          <Eyebrow>{t({ de: 'Auch das', en: 'That too' })}</Eyebrow>
          <Heading level={2}>{t({ de: 'Websites, die Anfragen bringen', en: 'Websites that bring enquiries' })}</Heading>
          <Text color="secondary">
            {t({
              de: `Keine Website, veraltet oder auf dem Handy unbrauchbar? Die baue ich auch. Neue Website ab ${base}, Upgrade ab ${upgrade}.`,
              en: `No website, outdated, or broken on phones? I build that too. New website from ${base}, upgrade from ${upgrade}.`,
            })}
          </Text>
          <Button icon={ic(UI.arrow)} href="#websites" label={t({ de: 'Websites ansehen', en: 'See websites' })} />
        </VStack>
      </Card>
    </VStack>
  );
}
