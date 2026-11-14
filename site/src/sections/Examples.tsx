import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/VStack';
import { HStack } from '@astryxdesign/core/HStack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { Tab, TabList } from '@astryxdesign/core/TabList';
import Eyebrow from './Eyebrow';
import Funnels from './Funnels';
import Emails from './Emails';
import { useState } from 'react';
import { WORK, useT } from '../data';
import { PreviewDialog, Screen } from './Projects';

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
            ? <Screen p={p} kind="desktop" alt={`${w.name}, ${t(w.kind)}`} lazy />
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

const TABS = [
  { id: 'hero', label: { de: 'Startbereich', en: 'Hero' } },
  { id: 'funnel', label: { de: 'Buchungs-Funnel', en: 'Booking funnel' } },
  { id: 'mail', label: { de: 'E-Mails mit Design', en: 'Designed emails' } },
] as const;

// One example at a time keeps the Leistungen page short.
export default function Examples() {
  const t = useT();
  const [tab, setTab] = useState<string>('hero');
  return (
    <Section id="beispiele" variant="transparent" padding={6}>
      <VStack gap={6} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
        <VStack gap={3}>
          <Eyebrow>{t({ de: 'Beispiele', en: 'Examples' })}</Eyebrow>
          <Heading level={2}>{t({ de: 'So sehen die Zusätze aus', en: 'What the add-ons look like' })}</Heading>
        </VStack>
        <TabList value={tab} onChange={setTab} role="tablist" hasDivider>
          {TABS.map(x => <Tab key={x.id} value={x.id} label={t(x.label)} panelId={"ex-" + x.id} />)}
        </TabList>
        {tab === 'hero' && (
          <VStack id="ex-hero" role="tabpanel" gap={5}>
            <Text type="large" color="secondary">{t({ de: 'Der Startbereich (auch «Hero» genannt) ist der grosse Bereich ganz oben auf Ihrer Website, also das Erste, was Besucher sehen. Mit diesem Zusatz gestalte ich ihn mit Video, Animation oder Bildern speziell für Ihr Geschäft. In Pro, Business und Komplett inklusive.', en: 'The hero is the large area at the very top of your website, the first thing visitors see. With this add-on I design it with video, animation or imagery specifically for your business. Included in Pro, Business and Complete.' })}</Text>
            <Grid columns={{ minWidth: 280, max: 3 }} gap={4}>
              {WORK.map(w => <WorkCard key={w.img} w={w} />)}
            </Grid>
          </VStack>
        )}
        {tab === 'funnel' && (
          <VStack id="ex-funnel" role="tabpanel" gap={5}>
            <Text type="large" color="secondary">{t({ de: 'Kunden buchen selbst, Schritt für Schritt. Probieren Sie es gleich hier aus: Das ist ein echter Funnel, so wie er auf Ihrer Website läuft.', en: 'Customers book on their own, step by step. Try it right here: this is a real funnel, just as it runs on your website.' })}</Text>
            <Funnels />
          </VStack>
        )}
        {tab === 'mail' && (
          <VStack id="ex-mail" role="tabpanel" gap={5}>
            <Text type="large" color="secondary">{t({ de: 'Dieselbe Reservation, einmal ohne und einmal mit Design. Schalten Sie um und vergleichen Sie.', en: 'The same booking, once without and once with design. Switch and compare.' })}</Text>
            <Emails />
          </VStack>
        )}
        <HStack>
          <Button variant="primary" href="#konfigurator" label={t({ de: 'Im Konfigurator hinzufügen', en: 'Add in the configurator' })} />
        </HStack>
      </VStack>
    </Section>
  );
}
