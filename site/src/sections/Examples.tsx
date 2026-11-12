import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/VStack';
import { HStack } from '@astryxdesign/core/HStack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { Badge } from '@astryxdesign/core/Badge';
import { WORK, FUNNELS, useT, type T } from '../data';

const FUNNEL_ALT: T[] = [
  { de: 'Beispiel eines Buchungs-Funnels, Schritt 2 von 3: Datum und Zeit wählen', en: 'Example booking funnel, step 2 of 3: choose date and time' },
  { de: 'Beispiel eines Buchungs-Funnels für eine Reparatur, Schritt 2 von 4', en: 'Example repair booking funnel, step 2 of 4' },
];
const FUNNEL_STEPS: T[] = [
  { de: '3 Schritte: Leistung wählen, Datum und Zeit, Kontaktdaten.', en: '3 steps: choose service, date and time, contact details.' },
  { de: '4 Schritte: Marke, Modell, Problem, Kontakt.', en: '4 steps: brand, model, problem, contact.' },
];

export default function Examples() {
  const t = useT();
  return (
    <Section id="beispiele" variant="transparent" padding={6}>
      <VStack gap={8} maxWidth={1200} style={{ marginInline: "auto", width: "100%" }}>
        <VStack gap={3}>
          <Heading level={2}>{t({ de: 'Hero-Bereiche, entwickelt für das Geschäft', en: 'Hero sections, engineered for the business' })}</Heading>
          <Text type="large" color="secondary">{t({ de: 'Der erste Eindruck Ihrer Website. Mit dem Pro-Paket entsteht er individuell für Ihr Geschäft.', en: 'The first impression of your website. With the Pro package it is built individually for your business.' })}</Text>
        </VStack>
        <Grid columns={{ minWidth: 280, max: 3 }} gap={4}>
          {WORK.map(w => (
            <Card key={w.img} padding={0}>
              <VStack gap={0}>
                <AspectRatio ratio={16 / 10} fit="cover">
                  <img src={w.img} alt={`${w.name}, ${t(w.kind)}`} loading="lazy" decoding="async" />
                </AspectRatio>
                <VStack gap={1} padding={4}>
                  <Heading level={3}>{w.name}</Heading>
                  <Text type="supporting">{t(w.kind)}</Text>
                  {w.url && (
                    <HStack>
                      <Button variant="ghost" size="sm" href={w.url} target="_blank" rel="noopener noreferrer" label={t({ de: 'Website ansehen ↗', en: 'View website ↗' })} />
                    </HStack>
                  )}
                </VStack>
              </VStack>
            </Card>
          ))}
        </Grid>

        <VStack gap={3}>
          <Heading level={2}>{t({ de: 'Buchungs-Funnels', en: 'Booking funnels' })}</Heading>
          <Text type="large" color="secondary">{t({ de: 'Kunden buchen selbst, Schritt für Schritt. Danach folgt automatisch die Bestätigung per E-Mail und der Eintrag in Ihrem Kalender.', en: 'Customers book on their own, step by step. Then the email confirmation and your calendar entry follow automatically.' })}</Text>
        </VStack>
        <Grid columns={{ minWidth: 300, max: 2 }} gap={4}>
          {FUNNELS.map((f, i) => (
            <Card key={f.img} padding={0}>
              <VStack gap={0}>
                <AspectRatio ratio={i === 0 ? 1010 / 820 : 1315 / 694} fit="cover">
                  <img src={f.img} alt={t(FUNNEL_ALT[i])} loading="lazy" decoding="async" />
                </AspectRatio>
                <VStack gap={2} padding={4}>
                  <HStack gap={2} align="center" wrap="wrap">
                    <Heading level={3}>{t(f.name)}</Heading>
                    <Badge label={t(f.style)} />
                  </HStack>
                  <Text type="supporting">{t(FUNNEL_STEPS[i])}</Text>
                </VStack>
              </VStack>
            </Card>
          ))}
        </Grid>
        <HStack>
          <Button variant="primary" href="#konfigurator" label={t({ de: 'Im Konfigurator hinzufügen', en: 'Add in the configurator' })} />
        </HStack>
      </VStack>
    </Section>
  );
}
