import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { contactDraft, useT } from '../data';
import { usePhone } from './usePhone';
import NightTicker from './NightTicker';
import { CLIENTS } from './Projects';
import { UI, ic } from './uiIcons';
import { Stats } from './viz';

// The trading journal is my own product, not a client.
const REAL_CLIENTS = CLIENTS.filter(c => c.slug !== 'edge');

// Hero (2026-11-18 restructure): promise, one line, two actions; the proof (night ticker, numbers, client names) does the talking.
const PROOF = [
  { value: '< 1 Min', label: { de: 'bis zur ersten Antwort', en: 'to the first reply' } },
  { value: '24/7', label: { de: 'auch abends und am Wochenende', en: 'evenings and weekends too' } },
  { value: String(REAL_CLIENTS.length), label: { de: 'Kundenprojekte', en: 'client projects' } },
  { value: '1', label: { de: 'Ansprechpartner, vor Ort', en: 'contact, on site' } },
];

export default function Hero() {
  const t = useT();
  const phone = usePhone();
  return (
    <VStack id="top" as="section" gap={phone ? 8 : 10} paddingInline={4} paddingBlock={10} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
      <Grid columns={{ minWidth: 320, max: 2 }} gap={8} align="center">
        <VStack gap={5}>
          <Text size="sm" weight="semibold" color="accent" style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {t({ de: 'Automationen und Websites für KMU', en: 'Automations and websites for SMEs' })}
          </Text>
          <Heading level={1} type="display-1" textWrap="balance">
            {t({ de: 'Keine Anfrage geht mehr verloren.', en: 'No enquiry gets lost again.' })}
          </Heading>
          <Text type="large" color="secondary" textWrap="pretty">
            {t({
              de: 'Ich automatisiere Anfragen, Offerten und Termine für kleine und mittlere Unternehmen. Und baue die Website dazu.',
              en: 'I automate enquiries, quotes and bookings for small and medium-sized businesses. And build the website to match.',
            })}
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button icon={ic(UI.calendar)} size="lg" variant="primary" href="#kontakt"
              onClick={() => { contactDraft.subject = 'Kostenloses Gespräch'; }}
              label={t({ de: 'Kostenloses Gespräch', en: 'Free call' })} />
            <Button icon={ic(UI.play)} size="lg" href="#film" label={t({ de: 'Film ansehen, 1 Minute', en: 'Watch the film, 1 minute' })} />
          </HStack>
        </VStack>
        <NightTicker />
      </Grid>
      <Stats items={PROOF} />
      <HStack gap={phone ? 3 : 6} wrap="wrap" vAlign="center" paddingBlock={4} style={{ borderBlock: '1px solid var(--color-border)' }}>
        <Text size="sm" color="secondary" style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>{t({ de: 'Im Einsatz bei', en: 'Trusted by' })}</Text>
        {REAL_CLIENTS.map(c => <Text key={c.slug} weight="semibold">{t(c.title)}</Text>)}
      </HStack>
    </VStack>
  );
}
