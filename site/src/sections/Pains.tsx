import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import Eyebrow from './Eyebrow';
import { AUTOPILOT_MONTHLY, BASE_PRICE, UPGRADE_PRICE, chf, contactDraft, useT } from '../data';

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
    title: { de: 'Offerten am Abend, und niemand fasst nach', en: 'Quotes at night, and nobody follows up' },
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
  return (
    <VStack as="section" gap={6} paddingInline={4} paddingBlock={10} maxWidth={1200} style={wrap}>
      <VStack gap={2} maxWidth={760}>
        <Eyebrow>{t({ de: 'Wo KMU Zeit verlieren', en: 'Where small businesses lose time' })}</Eyebrow>
        <Heading level={2}>{t({ de: 'Das kostet Sie jede Woche Stunden', en: 'This costs you hours every week' })}</Heading>
        <Text color="secondary">
          {t({
            de: 'Eine neue Website allein bringt keinen Auftrag mehr, wenn Anfragen danach im Posteingang liegen bleiben. Deshalb fange ich dort an, wo Zeit und Geld verloren gehen.',
            en: 'A new website alone no longer wins jobs if enquiries then sit unanswered in your inbox. That is why I start where time and money are lost.',
          })}
        </Text>
      </VStack>
      <Grid columns={{ minWidth: 240 }} gap={4}>
        {PAINS.map(p => (
          <Card key={p.title.de} variant="muted" padding={5}>
            <VStack gap={2}>
              <Text weight="semibold">{t(p.title)}</Text>
              <Text size="sm" color="secondary">{t(p.text)}</Text>
            </VStack>
          </Card>
        ))}
      </Grid>
    </VStack>
  );
}

const AUTOPILOT_POINTS = [
  { de: 'Verpasster Anruf → SMS in einer Minute mit Rückruf- oder Buchungslink', en: 'Missed call → SMS within a minute with a callback or booking link' },
  { de: 'E-Mail, WhatsApp und Kontaktformular → sofortige Antwort, alles in einer Liste', en: 'Email, WhatsApp and contact form → instant reply, everything in one list' },
  { de: 'Erinnerung an Sie, wenn eine Anfrage 24 Stunden offen ist', en: 'Reminder to you when an enquiry has been open for 24 hours' },
  { de: 'Offerte verschickt → freundliches Nachfassen nach 5 Tagen', en: 'Quote sent → friendly follow-up after 5 days' },
  { de: 'Auftrag erledigt → Bitte um eine Google-Bewertung', en: 'Job done → request for a Google review' },
  { de: 'Kurzer Monatsbericht: Anfragen, Antwortzeit, Aufträge', en: 'Short monthly report: enquiries, response time, jobs' },
];

export function AutopilotTeaser() {
  const t = useT();
  return (
    <VStack id="autopilot-teaser" as="section" paddingInline={4} paddingBlock={10} maxWidth={1200} style={wrap}>
      <Card variant="yellow" elevation="low" padding={6}>
        <VStack gap={4}>
          <VStack gap={2}>
            <Eyebrow>{t({ de: 'Das Hauptangebot', en: 'The main offer' })}</Eyebrow>
            <Heading level={2}>{t({ de: 'Anfragen-Autopilot', en: 'Enquiry Autopilot' })}</Heading>
            <Text weight="semibold">{t({ de: `ab ${chf(AUTOPILOT_MONTHLY)} / Monat`, en: `from ${chf(AUTOPILOT_MONTHLY)} / month` })}</Text>
            <Text color="secondary">
              {t({
                de: 'Jede Anfrage bekommt sofort eine Antwort und wird nachverfolgt, ohne dass Sie daran denken müssen.',
                en: 'Every enquiry gets an immediate reply and is followed up, without you having to remember.',
              })}
            </Text>
          </VStack>
          <VStack gap={1.5} as="ul" style={{ margin: 0, paddingInlineStart: 'var(--spacing-4)' }}>
            {AUTOPILOT_POINTS.map(p => (
              <li key={p.de}><Text size="sm">{t(p)}</Text></li>
            ))}
          </VStack>
          <HStack gap={3} wrap="wrap">
            <Button
              variant="primary"
              href="#kontakt"
              onClick={() => { contactDraft.subject = 'Anfragen-Autopilot'; }}
              label={t({ de: 'Kostenloses Gespräch', en: 'Free call' })}
            />
            <Button href="#automationen" label={t({ de: 'Alle Automationen', en: 'All automations' })} />
          </HStack>
        </VStack>
      </Card>
    </VStack>
  );
}

export function WebsitesTeaser() {
  const t = useT();
  const base = chf(BASE_PRICE);
  const upgrade = chf(UPGRADE_PRICE);
  return (
    <VStack as="section" paddingInline={4} paddingBlock={10} maxWidth={1200} style={wrap}>
      <Card variant="muted" padding={6}>
        <VStack gap={3} hAlign="start" maxWidth={760}>
          <Eyebrow>{t({ de: 'Auch das', en: 'That too' })}</Eyebrow>
          <Heading level={2}>{t({ de: 'Websites, die Anfragen bringen', en: 'Websites that bring enquiries' })}</Heading>
          <Text color="secondary">
            {t({
              de: `Ist die Website der Engpass, weil es keine gibt, sie auf dem Handy nicht funktioniert oder veraltet ist, baue ich sie ebenfalls. Jedes Formular auf Ihrer Website kann den Anfragen-Autopilot speisen. Neue Website ab ${base}, Upgrade Ihrer bestehenden Website ab ${upgrade}.`,
              en: `If the website is the bottleneck because there is none, it does not work on phones or it is outdated, I build it too. Every form on your website can feed the Enquiry Autopilot. New website from ${base}, upgrade of your existing website from ${upgrade}.`,
            })}
          </Text>
          <Button href="#websites" label={t({ de: 'Websites ansehen', en: 'See websites' })} />
        </VStack>
      </Card>
    </VStack>
  );
}
