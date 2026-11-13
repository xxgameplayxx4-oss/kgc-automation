import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/VStack';
import { HStack } from '@astryxdesign/core/HStack';
import { Grid } from '@astryxdesign/core/Grid';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Avatar } from '@astryxdesign/core/Avatar';
import { useT } from '../data';
import Eyebrow from './Eyebrow';
import { CLIENTS, Preview } from './Projects';

/** Start page: three client projects and a short intro, each linking to its own page. */
export default function Teaser() {
  const t = useT();
  return (
    <Section variant="transparent" padding={6}>
      <VStack gap={10} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
        <VStack gap={6}>
          <HStack gap={3} wrap="wrap" hAlign="between" vAlign="end">
            <VStack gap={2}>
              <Eyebrow>{t({ de: 'Projekte', en: 'Projects' })}</Eyebrow>
              <Heading level={2}>{t({ de: 'Websites für echte Kunden', en: 'Websites for real clients' })}</Heading>
            </VStack>
            <Button href="#projekte" label={t({ de: 'Alle Projekte ansehen', en: 'See all projects' })} />
          </HStack>
          <Grid columns={{ minWidth: 240, max: 4 }} gap={8}>
            {CLIENTS.map(p => (
              <VStack key={p.slug} gap={2}>
                <Preview p={p} />
                <Text weight="semibold">{t(p.title)}</Text>
                <Text type="supporting">{t(p.kind)}</Text>
              </VStack>
            ))}
          </Grid>
        </VStack>
        <HStack gap={6} wrap="wrap" vAlign="center">
          <Avatar src="/about/khang.jpg" name="Khang Cung" size={128} tooltip={false} />
          <VStack gap={2} style={{ flex: '1 1 20rem' }}>
            <Eyebrow>{t({ de: 'Über mich', en: 'About me' })}</Eyebrow>
            <Heading level={2}>{t({ de: 'Ein Ansprechpartner, von A bis Z', en: 'One contact, end to end' })}</Heading>
            <Text color="secondary">{t({ de: 'Ich bin Khang Cung, Informatiker EFZ aus Brugg. Ich plane, gestalte und baue Ihre Website selbst.', en: 'I’m Khang Cung, a certified IT specialist from Brugg. I plan, design and build your website myself.' })}</Text>
            <HStack><Button variant="ghost" href="#ueber-mich" label={t({ de: 'Mehr über mich →', en: 'More about me →' })} /></HStack>
          </VStack>
        </HStack>
      </VStack>
    </Section>
  );
}
