import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import Eyebrow from './Eyebrow';
import { AUTOPILOT_MONTHLY, chf, contactDraft, useT } from '../data';

type L = { de: string; en: string };

const STEPS: L[] = [
  { de: 'Verpasster Anruf: Der Anrufer bekommt innert einer Minute eine SMS mit Rückruf- oder Buchungslink.', en: 'Missed call: the caller gets an SMS within a minute with a callback or booking link.' },
  { de: 'E-Mail, WhatsApp und Kontaktformular: sofortige Antwort, alles in einer Liste.', en: 'Email, WhatsApp and contact form: instant reply, everything in one list.' },
  { de: 'Erinnerung an Sie, wenn eine Anfrage 24 Stunden offen ist.', en: 'A reminder to you when an enquiry has been open for 24 hours.' },
  { de: 'Offerte verschickt: freundliches Nachfassen nach 5 Tagen.', en: 'Quote sent: a friendly nudge after 5 days.' },
  { de: 'Auftrag erledigt: Bitte um eine Google-Bewertung.', en: 'Job done: a request for a Google review.' },
  { de: 'Kurzer Monatsbericht: Anfragen, Antwortzeit, Aufträge.', en: 'Short monthly report: enquiries, response time, jobs.' },
];

const MORE: { name: L; what: L; who: L }[] = [
  { name: { de: 'Offerte in 10 Minuten', en: 'Quote in 10 minutes' }, what: { de: 'Sprachnachricht oder Fotos per WhatsApp werden zum Offerten-Entwurf. Sie geben frei, das PDF geht raus, nach 5 Tagen wird nachgefasst.', en: 'A voice message or photos via WhatsApp become a draft quote. You approve it, the PDF goes out, and it is followed up after 5 days.' }, who: { de: 'Handwerk, Reinigung', en: 'Trades, cleaning' } },
  { name: { de: 'Rapport zu Rechnung', en: 'Report to invoice' }, what: { de: 'Stunden und Material per WhatsApp werden zum Rechnungsentwurf in bexio.', en: 'Hours and materials via WhatsApp become a draft invoice in bexio.' }, who: { de: 'Handwerk, Reinigung', en: 'Trades, cleaning' } },
  { name: { de: 'Mahnwesen', en: 'Payment reminders' }, what: { de: 'Freundliche Zahlungserinnerungen nach 7, 14 und 30 Tagen, danach ein Hinweis an Sie.', en: 'Friendly payment reminders after 7, 14 and 30 days, then a note to you.' }, who: { de: 'Alle', en: 'Everyone' } },
  { name: { de: 'Termin-Erinnerung und Lückenfüller', en: 'Appointment reminders and gap filler' }, what: { de: 'Erinnerung 24 Stunden vorher. Abgesagte Termine gehen an die Warteliste.', en: 'Reminder 24 hours before. Cancelled slots go to the waiting list.' }, who: { de: 'Coiffeur, Kosmetik, Physio-Termine', en: 'Hairdressers, beauty, physio appointments' } },
  { name: { de: 'Probetraining-Nachfassen', en: 'Trial class follow-up' }, what: { de: 'Anfrage, sofortige Antwort mit Terminwahl, Erinnerung, nach dem Training ein Mitgliedschaftsangebot.', en: 'Enquiry, instant reply with date choice, reminder, and a membership offer after the class.' }, who: { de: 'Fitness, Kampfsport, Tanzschulen', en: 'Fitness, martial arts, dance schools' } },
  { name: { de: 'Bewertungs-Anfrage', en: 'Review request' }, what: { de: 'Nach dem Auftrag kommt die Bitte um eine Google-Bewertung.', en: 'After the job, a request for a Google review goes out.' }, who: { de: 'Lokale Betriebe', en: 'Local businesses' } },
];

const TRUST: L[] = [
  { de: 'Ein Ansprechpartner aus Brugg, ich komme bei Ihnen vorbei.', en: 'One contact from Brugg, I come to see you in person.' },
  { de: 'Nichts geht ohne Ihre Freigabe an Kunden raus.', en: 'Nothing goes out to customers without your approval.' },
  { de: 'Ihre Daten bleiben in der Schweiz oder der EU, ich sage Ihnen genau, wo.', en: 'Your data stays in Switzerland or the EU, and I tell you exactly where.' },
  { de: 'Wenn ein günstiges Programm reicht, sage ich Ihnen das.', en: 'If a cheap tool is enough, I will tell you so.' },
  { de: 'Monatlich, kein grosser Betrag im Voraus.', en: 'Monthly, no large amount up front.' },
];

const FLOW: { title: L; text: L }[] = [
  { title: { de: 'Kostenloses Gespräch', en: 'Free call' }, text: { de: '20 Minuten: Wo verlieren Sie Zeit?', en: '20 minutes: where do you lose time?' } },
  { title: { de: 'Einrichtung', en: 'Setup' }, text: { de: 'Mit Ihren bestehenden Programmen.', en: 'Using the tools you already have.' } },
  { title: { de: 'Läuft', en: 'Running' }, text: { de: 'Sie bekommen jeden Monat einen kurzen Bericht.', en: 'You get a short report every month.' } },
];

export default function Automations() {
  const t = useT();
  const ask = (subject: string) => () => { contactDraft.subject = subject; };
  return (
    <VStack as="section" gap={10} paddingInline={4} paddingBlock={10} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
      <VStack gap={2}>
        <Eyebrow>{t({ de: 'Automationen', en: 'Automations' })}</Eyebrow>
        <Heading level={1} type="display-3">{t({ de: 'Büroarbeit, die sich selbst erledigt', en: 'Office work that takes care of itself' })}</Heading>
        <Text color="secondary">
          {t({
            de: 'Ich arbeite mit den Werkzeugen, die Sie schon haben: Telefon, E-Mail, WhatsApp, bexio, Ihr Buchungstool. Sie müssen keine neue App lernen.',
            en: 'I work with the tools you already have: phone, email, WhatsApp, bexio, your booking tool. There is no new app to learn.',
          })}
        </Text>
      </VStack>

      <Card id="autopilot" variant="yellow" elevation="low" padding={5}>
        <VStack gap={3}>
          <Heading level={2}>{t({ de: 'Anfragen-Autopilot', en: 'Enquiry autopilot' })}</Heading>
          <Heading level={3} color="accent">{t({ de: `ab ${chf(AUTOPILOT_MONTHLY)} / Monat`, en: `from ${chf(AUTOPILOT_MONTHLY)} / month` })}</Heading>
          <Text>{t({ de: 'Keine Anfrage bleibt mehr liegen. Das läuft im Hintergrund:', en: 'No enquiry gets left behind. This runs in the background:' })}</Text>
          <VStack gap={1.5} as="ol" style={{ margin: 0, paddingInlineStart: 'var(--spacing-4)' }}>
            {STEPS.map((s, i) => <li key={i}><Text size="sm">{t(s)}</Text></li>)}
          </VStack>
          <HStack>
            <Button variant="primary" href="#kontakt" label={t({ de: 'Kostenloses Gespräch, 20 Minuten', en: 'Free call, 20 minutes' })} onClick={ask('Anfragen-Autopilot')} />
          </HStack>
        </VStack>
      </Card>

      <VStack gap={4}>
        <Heading level={2} type="display-3">{t({ de: 'Weitere Automationen', en: 'More automations' })}</Heading>
        <Grid columns={{ minWidth: 260 }} gap={4} align="stretch">
          {MORE.map(m => (
            <Card key={m.name.de} variant="default" padding={5}>
              <VStack gap={2}>
                <Heading level={3}>{t(m.name)}</Heading>
                <Text color="secondary">{t(m.what)}</Text>
                <Text size="sm">{`${t({ de: 'Für: ', en: 'For: ' })}${t(m.who)}`}</Text>
                <Text size="sm" weight="medium">{t({ de: 'Preis je nach Umfang, monatlich', en: 'Price depends on scope, monthly' })}</Text>
                <HStack>
                  <Button variant="secondary" href="#kontakt" label={t({ de: 'Darüber sprechen', en: 'Talk about this' })} onClick={ask(m.name.de)} />
                </HStack>
              </VStack>
            </Card>
          ))}
        </Grid>
      </VStack>

      <VStack gap={3}>
        <Heading level={2} type="display-3">{t({ de: 'So arbeite ich', en: 'How I work' })}</Heading>
        <VStack gap={1.5} as="ul" style={{ margin: 0, paddingInlineStart: 'var(--spacing-4)' }}>
          {TRUST.map((s, i) => <li key={i}><Text>{t(s)}</Text></li>)}
        </VStack>
      </VStack>

      <VStack gap={4}>
        <Heading level={2} type="display-3">{t({ de: 'Ablauf', en: 'Process' })}</Heading>
        <Grid columns={{ minWidth: 240, max: 3 }} gap={4} align="stretch">
          {FLOW.map((f, i) => (
            <Card key={i} variant="muted" padding={5}>
              <VStack gap={1.5}>
                <Text type="label" color="accent" weight="semibold" hasTabularNumbers>{i + 1}</Text>
                <Heading level={3}>{t(f.title)}</Heading>
                <Text color="secondary">{t(f.text)}</Text>
              </VStack>
            </Card>
          ))}
        </Grid>
      </VStack>
    </VStack>
  );
}
