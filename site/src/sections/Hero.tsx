import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { contactDraft, useT } from '../data';
import PromoFilm from './PromoFilm';
import { UI, ic } from './uiIcons';

export default function Hero() {
  const t = useT();
  return (
    <VStack id="top" as="section" hAlign="center" gap={8} paddingInline={4} paddingBlock={10}>
      <VStack gap={4} hAlign="center" maxWidth={760}>
        <Heading level={1} type="display-2" justify="center" textWrap="balance">
          {t({ de: 'Keine Anfrage geht mehr verloren.', en: 'No enquiry gets lost again.' })}
        </Heading>
        <Text type="large" color="secondary" justify="center" textWrap="balance">
          {t({
            de: 'Ich automatisiere die wiederkehrende Büroarbeit von KMU im Aargau: Anfragen, Offerten, Rechnungen, Termine. Mit den Programmen, die Sie schon haben.',
            en: 'I automate the recurring office work of small businesses in Aargau: enquiries, quotes, invoices, appointments. With the tools you already have.',
          })}
        </Text>
        <HStack gap={3} wrap="wrap" hAlign="center">
          <Button icon={ic(UI.calendar)}
            size="lg"
            variant="primary"
            href="#kontakt"
            onClick={() => { contactDraft.subject = 'Kostenloses Gespräch'; }}
            label={t({ de: 'Kostenloses Gespräch, 20 Minuten', en: 'Free call, 20 minutes' })}
          />
          <Button icon={ic(UI.arrow)} size="lg" href="#automationen" label={t({ de: 'Automationen ansehen', en: 'See automations' })} />
        </HStack>
        <Text type="supporting" justify="center">
          {t({
            de: 'Ein Ansprechpartner aus Brugg · Keine Offerte ohne Ihre Freigabe · Antwort innert 24 h',
            en: 'One contact in Brugg · No quote without your approval · Reply within 24 h',
          })}
        </Text>
      </VStack>
      <VStack width="100%" maxWidth={880}>
        <PromoFilm />
      </VStack>
    </VStack>
  );
}
