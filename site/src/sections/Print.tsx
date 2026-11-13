import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/VStack';
import { HStack } from '@astryxdesign/core/HStack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { useState } from 'react';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import Eyebrow from './Eyebrow';
import { ADDONS, addonPrice, useT } from '../data';

// Finished sample designs, rendered from fictional brands that match the concept drafts in /work.
const SETS = [
  { id: 'barber', name: 'Ferro Barbershop', label: { de: 'Barbier', en: 'Barber' } },
  { id: 'restaurant', name: 'Tavola', label: { de: 'Restaurant', en: 'Restaurant' } },
  { id: 'phone-repair', name: 'FixPoint', label: { de: 'Handyshop', en: 'Phone shop' } },
];

export default function Print() {
  const t = useT();
  const [id, setId] = useState(SETS[0].id);
  const set = SETS.find(x => x.id === id) ?? SETS[0];
  const items = ADDONS.filter(a => a.group === 'print');
  return (
    <Section id="print" variant="muted" padding={6}>
      <VStack gap={6} maxWidth={1200} style={{ marginInline: "auto", width: "100%" }}>
        <VStack gap={3}>
          <Eyebrow>Print</Eyebrow>
          <Heading level={2}>{t({ de: 'Flyer und Visitenkarten im Design Ihrer Website', en: 'Flyers and business cards in your website’s design' })}</Heading>
          <Text type="large" color="secondary">{t({ de: 'Gleiche Farben, gleiche Schrift, gleicher Auftritt. Alles aus einem Guss.', en: 'Same colors, same type, same look. All of one piece.' })}</Text>
        </VStack>
        <Grid columns={{ minWidth: 300, max: 2 }} gap={6}>
          <VStack gap={4}>
            <SegmentedControl label={t({ de: 'Beispiel wählen', en: 'Choose an example' })} value={set.id} onChange={v => setId(v)} layout="fill">
              {SETS.map(x => <SegmentedControlItem key={x.id} value={x.id} label={t(x.label)} />)}
            </SegmentedControl>
            <Grid columns={2} gap={3}>
              <Card padding={0} elevation="med" style={{ overflow: 'hidden' }}>
                <AspectRatio ratio={148 / 210} fit="cover">
                  <img src={`/print/${set.id}-flyer.webp`} alt={t({ de: `Flyer A5 für ${set.name}`, en: `A5 flyer for ${set.name}` })} loading="lazy" decoding="async" />
                </AspectRatio>
              </Card>
              <VStack gap={3} justify="center">
                {(['front', 'back'] as const).map(side => (
                  <Card key={side} padding={0} elevation="med" style={{ overflow: 'hidden' }}>
                    <AspectRatio ratio={85 / 55} fit="cover">
                      <img src={`/print/${set.id}-card-${side}.webp`} alt={t({ de: `Visitenkarte ${set.name}, ${side === 'front' ? 'Vorderseite' : 'Rückseite'}`, en: `${set.name} business card, ${side}` })} loading="lazy" decoding="async" />
                    </AspectRatio>
                  </Card>
                ))}
                <Text type="supporting">{t({ de: 'Visitenkarte 85 × 55 mm, Vorder- und Rückseite', en: 'Business card 85 × 55 mm, front and back' })}</Text>
              </VStack>
            </Grid>
            <Text type="supporting">{t({ de: 'Beispiele mit erfundenen Firmen. Ihre Version entsteht in den Farben und Schriften Ihrer Website.', en: 'Examples use made-up businesses. Yours is made in your website’s colors and fonts.' })}</Text>
          </VStack>
          <VStack gap={4}>
            {items.map(a => (
              <Card key={a.id}>
                <HStack justify="between" align="start" gap={3}>
                  <VStack gap={1}>
                    <Heading level={3}>{t(a.name)}</Heading>
                    <Text type="supporting">{t(a.desc)}</Text>
                  </VStack>
                  <Text weight="semibold" hasTabularNumbers>{addonPrice(a)}</Text>
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
