import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/VStack';
import { HStack } from '@astryxdesign/core/HStack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { ADDONS, chf, useT } from '../data';

const NAME = 'Café Muster';
const OFFERS = [
  { de: '2 für 1 Kaffee am Montag', en: '2-for-1 coffee on Mondays' },
  { de: 'Mittagsmenü ab CHF 16', en: 'Lunch menu from CHF 16' },
  { de: 'Gratis Dessert zum Geburtstag', en: 'Free dessert on your birthday' },
];

export default function Print() {
  const t = useT();
  const items = ADDONS.filter(a => a.group === 'print');
  return (
    <Section id="print" variant="muted" padding={6}>
      <VStack gap={6} maxWidth={1200} style={{ marginInline: "auto", width: "100%" }}>
        <VStack gap={3}>
          <Heading level={2}>{t({ de: 'Flyer und Visitenkarten im Design Ihrer Website', en: 'Flyers and business cards in your website’s design' })}</Heading>
          <Text type="large" color="secondary">{t({ de: 'Gleiche Farben, gleiche Schrift, gleicher Auftritt. Alles aus einem Guss.', en: 'Same colors, same type, same look. All of one piece.' })}</Text>
        </VStack>
        <Grid columns={{ minWidth: 300, max: 2 }} gap={6}>
          <VStack gap={4}>
            <Grid columns={{ minWidth: 200, max: 2 }} gap={3}>
              <Card padding={0} elevation="low">
                <AspectRatio ratio={85.6 / 54}>
                  <VStack padding={3} justify="center" align="center" height="100%">
                    <Heading level={3}>{NAME}</Heading>
                    <Text type="supporting">{t({ de: 'Frühstück · Mittag · Kuchen', en: 'Breakfast · lunch · cake' })}</Text>
                  </VStack>
                </AspectRatio>
              </Card>
              <Card variant="blue" padding={0} elevation="low">
                <AspectRatio ratio={85.6 / 54}>
                  <VStack padding={3} justify="center" gap={0.5} height="100%">
                    <Text type="label" weight="semibold">Anna Muster</Text>
                    <Text size="xsm">+41 56 000 00 00</Text>
                    <Text size="xsm">info@cafe-muster.ch</Text>
                    <Text size="xsm">www.cafe-muster.ch</Text>
                  </VStack>
                </AspectRatio>
              </Card>
            </Grid>
            <Card padding={0} elevation="med" maxWidth={360}>
              <VStack gap={0}>
                <VStack padding={3}>
                  <Heading level={3}>{t({ de: 'Frisch. Lokal. Ihr Café.', en: 'Fresh. Local. Your café.' })}</Heading>
                </VStack>
                <AspectRatio ratio={16 / 10} fit="cover">
                  <img src="/work/restaurant.webp" alt={t({ de: 'Innenraum eines Cafés als Flyer-Bild', en: 'Café interior as flyer image' })} loading="lazy" decoding="async" />
                </AspectRatio>
                <VStack padding={3} gap={1}>
                  {OFFERS.map(o => <Text key={o.en} size="sm">• {t(o)}</Text>)}
                </VStack>
                <HStack padding={3} gap={3} align="center">
                  <Card variant="muted" width={72} height={72} padding={1}>
                    <VStack align="center" justify="center" height="100%"><Text size="xsm">QR</Text></VStack>
                  </Card>
                  <VStack gap={0}>
                    <Text size="xsm" weight="semibold">{NAME}</Text>
                    <Text size="xsm">Bahnhofstrasse 1, 5200 Brugg</Text>
                  </VStack>
                </HStack>
              </VStack>
            </Card>
          </VStack>
          <VStack gap={4}>
            {items.map(a => (
              <Card key={a.id}>
                <HStack justify="between" align="start" gap={3}>
                  <VStack gap={1}>
                    <Heading level={3}>{t(a.name)}</Heading>
                    <Text type="supporting">{t(a.desc)}</Text>
                  </VStack>
                  <Text weight="semibold" hasTabularNumbers>{chf(a.price)}</Text>
                </HStack>
              </Card>
            ))}
            <Text type="supporting">{t({ de: 'Die Designs liefere ich als druckfertiges PDF. Der Druck kann auf Wunsch zum Selbstkostenpreis organisiert werden.', en: 'Designs are delivered as print-ready PDF. Printing can be arranged at cost on request.' })}</Text>
            <HStack>
              <Button variant="primary" href="#konfigurator" label={t({ de: 'Im Konfigurator hinzufügen', en: 'Add in the configurator' })} />
            </HStack>
          </VStack>
        </Grid>
      </VStack>
    </Section>
  );
}
