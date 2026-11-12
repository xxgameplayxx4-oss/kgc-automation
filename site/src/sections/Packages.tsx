import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Card } from '@astryxdesign/core/Card';
import { Badge } from '@astryxdesign/core/Badge';
import Eyebrow from './Eyebrow';
import { chf, mailto, TIERS, useT } from '../data';

export default function Packages() {
  const t = useT();
  return (
    <VStack id="pakete" as="section" gap={6} paddingInline={4} paddingBlock={10} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
      <VStack gap={2}>
        <Eyebrow>{t({ de: 'Fixpreise', en: 'Fixed prices' })}</Eyebrow>
        <Heading level={2} type="display-3">{t({ de: 'Pakete', en: 'Packages' })}</Heading>
        <Text color="secondary">{t({ de: 'Zwei Fixpreis-Pakete. Erweiterungen wählen Sie im Konfigurator.', en: 'Two fixed-price packages. Pick extras in the configurator.' })}</Text>
      </VStack>
      <Grid columns={{ minWidth: 300 }} gap={4} align="stretch">
        {TIERS.map(tier => {
          const pro = tier.id === 'pro';
          return (
            <Card key={tier.id} variant={pro ? 'yellow' : 'default'} elevation={pro ? 'low' : 'none'} padding={5}>
              <VStack gap={4}>
                <HStack gap={2} vAlign="center">
                  <Heading level={3}>{t(tier.name)}</Heading>
                  {pro && <Badge variant="yellow" label={t({ de: 'Empfohlen', en: 'Recommended' })} />}
                </HStack>
                <Heading level={2} type="display-3" color="accent">{chf(tier.price)}</Heading>
                <Text color="secondary">{t(tier.tagline)}</Text>
                <VStack gap={2} as="ul" style={{ margin: 0, paddingInlineStart: 'var(--spacing-4)' }}>
                  {tier.features.map((f, i) => <li key={i}><Text>{t(f)}</Text></li>)}
                </VStack>
                <Button variant={pro ? 'primary' : 'secondary'} href="#konfigurator" label={t({ de: 'Im Konfigurator wählen', en: 'Choose in configurator' })} />
              </VStack>
            </Card>
          );
        })}
      </Grid>
      <Card variant="muted" padding={5}>
        <HStack gap={4} vAlign="center" hAlign="between" wrap="wrap">
          <VStack gap={1}>
            <Heading level={3}>{t({ de: 'Individuell', en: 'Custom' })}</Heading>
            <Text color="secondary">{t({ de: 'Sie brauchen mehr? Schreiben Sie mir.', en: 'Need more? Write to me.' })}</Text>
          </VStack>
          <Button href={mailto('Individuelle Anfrage')} label={t({ de: 'Anfrage senden', en: 'Send enquiry' })} />
        </HStack>
      </Card>
      <Text type="supporting">
        {t({
          de: 'Preise einmalig in CHF. Domain und Drittkosten zum Selbstkostenpreis. Die Hälfte bei Auftrag, der Rest bei Fertigstellung.',
          en: 'Prices are one-time in CHF. Domain and third-party costs at cost. Half on order, the rest on completion.',
        })}
      </Text>
    </VStack>
  );
}
