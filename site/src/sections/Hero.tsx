import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { contactDraft, useT } from '../data';
import { usePhone } from './usePhone';
import PromoFilm from './PromoFilm';
import NightTicker from './NightTicker';
import { UI, ic } from './uiIcons';

// Hero (2026-11-16 redesign): the promise on the left, the proof on the right — a night of enquiries that answer themselves.
export default function Hero() {
  const t = useT();
  const phone = usePhone();
  return (
    <VStack id="top" as="section" gap={10} paddingInline={4} paddingBlock={10} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
      <Grid columns={{ minWidth: 320, max: 2 }} gap={8} align="center">
        <VStack gap={4}>
          <Text size="sm" weight="semibold" color="accent" style={{ letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            {t({ de: 'Automationen für KMU · Brugg AG', en: 'Automations for small businesses · Brugg AG' })}
          </Text>
          <Heading level={1} type="display-1" textWrap="balance">
            {t({ de: 'Keine Anfrage geht mehr verloren.', en: 'No enquiry gets lost again.' })}
          </Heading>
          <Text type="large" color="secondary" textWrap="pretty">
            {t({
              de: 'Ich automatisiere die Büroarbeit von KMU im Aargau, mit den Programmen, die Sie schon haben.',
              en: 'I automate office work for small businesses in Aargau, with the tools you already have.',
            })}
          </Text>
          <HStack gap={3} wrap="wrap">
            <Button icon={ic(UI.calendar)}
              size="lg"
              variant="primary"
              href="#kontakt"
              onClick={() => { contactDraft.subject = 'Kostenloses Gespräch'; }}
              label={t({ de: 'Kostenloses Gespräch, 20 Minuten', en: 'Free call, 20 minutes' })}
            />
            <Button icon={ic(UI.arrow)} size="lg" href="#automationen" label={t({ de: 'Automationen ansehen', en: 'See automations' })} />
          </HStack>
          {!phone && (
            <Text type="supporting">
              {t({
                de: 'Ein Ansprechpartner aus Brugg · Keine Offerte ohne Ihre Freigabe · Antwort innert 24 h',
                en: 'One contact in Brugg · No quote without your approval · Reply within 24 h',
              })}
            </Text>
          )}
        </VStack>
        <NightTicker />
      </Grid>
      <VStack width="100%" maxWidth={960} style={{ marginInline: 'auto' }}>
        <PromoFilm />
      </VStack>
    </VStack>
  );
}
