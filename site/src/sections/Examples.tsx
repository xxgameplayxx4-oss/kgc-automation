import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/VStack';
import { HStack } from '@astryxdesign/core/HStack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import Eyebrow from './Eyebrow';
import Funnels from './Funnels';
import Emails from './Emails';
import { useState } from 'react';
import { WORK, useT } from '../data';
import { HeroVideo, PreviewDialog } from './Projects';

type Work = (typeof WORK)[number];

function WorkCard({ w }: { w: Work }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const p = { slug: w.slug, video: w.video, url: w.url, title: { de: w.name, en: w.name }, kind: w.kind, place: '', tags: [] };
  return (
    <Card padding={0}>
      <VStack gap={0}>
        <AspectRatio ratio={16 / 10} fit="cover">
          {w.video
            ? <HeroVideo src={`${w.video}-desktop.mp4`} poster={w.img} label={`${w.name}, ${t(w.kind)}`} />
            : <img src={w.img} alt={`${w.name}, ${t(w.kind)}`} loading="lazy" decoding="async" />}
        </AspectRatio>
        <VStack gap={1} padding={4}>
          <Heading level={3}>{w.name}</Heading>
          <Text type="supporting">{t(w.kind)}</Text>
          <HStack gap={2} wrap="wrap">
            <Button variant="secondary" size="sm" onClick={() => setOpen(true)} label={t({ de: 'Vorschau', en: 'Preview' })} />
            {w.url && <Button variant="ghost" size="sm" href={w.url} target="_blank" rel="noopener noreferrer" label={t({ de: 'Website ansehen ↗', en: 'View website ↗' })} />}
          </HStack>
        </VStack>
      </VStack>
      <PreviewDialog p={p} title={w.name} open={open} setOpen={setOpen} />
    </Card>
  );
}

export default function Examples() {
  const t = useT();
  return (
    <Section id="beispiele" variant="transparent" padding={6}>
      <VStack gap={8} maxWidth={1200} style={{ marginInline: "auto", width: "100%" }}>
        <VStack gap={3}>
          <Eyebrow>{t({ de: 'Zusatz: Individueller Hero', en: 'Add-on: custom hero' })}</Eyebrow>
          <Heading level={2}>{t({ de: 'Hero-Bereiche, entwickelt für das Geschäft', en: 'Hero sections, engineered for the business' })}</Heading>
          <Text type="large" color="secondary">{t({ de: 'Der erste Eindruck Ihrer Website. Mit dem Zusatz «Individueller Hero-Bereich» entsteht er für Ihr Geschäft, in den Paketen Plus, Business und Komplett inklusive.', en: 'The first impression of your website. With the «custom hero» add-on it is built for your business, included in the Plus, Business and Complete packages.' })}</Text>
        </VStack>
        <Grid columns={{ minWidth: 280, max: 3 }} gap={4}>
          {WORK.map(w => <WorkCard key={w.img} w={w} />)}
        </Grid>

        <VStack gap={3}>
          <Eyebrow>{t({ de: 'Erweiterung', en: 'Add-on' })}</Eyebrow>
          <Heading level={2}>{t({ de: 'Buchungs-Funnels', en: 'Booking funnels' })}</Heading>
          <Text type="large" color="secondary">{t({ de: 'Kunden buchen selbst, Schritt für Schritt. Probieren Sie es gleich hier aus: Das ist ein echter Funnel, so wie er auf Ihrer Website läuft.', en: 'Customers book on their own, step by step. Try it right here: this is a real funnel, just as it runs on your website.' })}</Text>
        </VStack>
        <Funnels />
        <VStack gap={3}>
          <Eyebrow>{t({ de: 'Automation', en: 'Automation' })}</Eyebrow>
          <Heading level={2}>{t({ de: 'Bestätigungs-E-Mails mit Design', en: 'Confirmation emails with design' })}</Heading>
          <Text type="large" color="secondary">{t({ de: 'Dieselbe Reservation, zweimal. Links, wie sie von einem Standard-Formular ankommt. Rechts im Design Ihrer Website, für Sie und für Ihren Gast.', en: 'The same booking, twice. Left, as it arrives from a standard form. Right, in your website’s design, for you and your guest.' })}</Text>
        </VStack>
        <Emails />
        <HStack>
          <Button variant="primary" href="#konfigurator" label={t({ de: 'Im Konfigurator hinzufügen', en: 'Add in the configurator' })} />
        </HStack>
      </VStack>
    </Section>
  );
}
