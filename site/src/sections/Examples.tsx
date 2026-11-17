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
import { SectionHead } from './viz';
import Funnels from './Funnels';
import Emails from './Emails';
import { useState } from 'react';
import PhoneMore from './PhoneMore';
import { WORK, useT } from '../data';
import { PreviewDialog, Screen } from './Projects';
import { UI, ic } from './uiIcons';

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
            <Button variant="secondary" size="sm" icon={ic(UI.eye)} onClick={() => setOpen(true)} label={t({ de: 'Vorschau', en: 'Preview' })} />
            {w.url && <Button icon={ic(UI.external)} variant="ghost" size="sm" href={w.url} target="_blank" rel="noopener noreferrer" label={t({ de: 'Website ansehen', en: 'View website' })} />}
          </HStack>
        </VStack>
      </VStack>
      <PreviewDialog p={p} title={w.name} open={open} setOpen={setOpen} />
    </Card>
  );
}

const TABS = [
  { id: 'hero', label: { de: 'Start', en: 'Hero' } },
  { id: 'funnel', label: { de: 'Buchung', en: 'Booking' } },
  { id: 'mail', label: { de: 'E-Mails', en: 'Emails' } },
] as const;

// One example at a time keeps the Leistungen page short.
export default function Examples() {
  const t = useT();
  const [tab, setTab] = useState<string>('hero');
  return (
    <Section id="beispiele" variant="transparent" padding={6}>
      <VStack gap={6} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
        <SectionHead eyebrow={{ de: 'Beispiele', en: 'Examples' }} title={{ de: 'So sieht das aus', en: 'What it looks like' }} />
        <TabList value={tab} onChange={setTab} role="tablist" hasDivider>
          {TABS.map(x => <Tab key={x.id} value={x.id} label={t(x.label)} panelId={"ex-" + x.id} />)}
        </TabList>
        {tab === 'hero' && (
          <VStack id="ex-hero" role="tabpanel" gap={5}>
            <Text color="secondary">{t({ de: 'Der erste Eindruck, im Pro-Paket individuell.', en: 'The first impression, custom in Pro.' })}</Text>
            <PhoneMore items={WORK} limit={3}>{shown => (
              <Grid columns={{ minWidth: 280, max: 3 }} gap={4}>
                {shown.map(w => <WorkCard key={w.img} w={w} />)}
              </Grid>
            )}</PhoneMore>
          </VStack>
        )}
        {tab === 'funnel' && (
          <VStack id="ex-funnel" role="tabpanel" gap={5}>
            <Text color="secondary">{t({ de: 'Buchen in 3 Schritten. Probieren Sie es aus.', en: 'Booking in 3 steps. Try it.' })}</Text>
            <Funnels />
          </VStack>
        )}
        {tab === 'mail' && (
          <VStack id="ex-mail" role="tabpanel" gap={5}>
            <Text color="secondary">{t({ de: 'Ohne und mit Design. Ziehen Sie den Regler.', en: 'Without and with design. Drag the slider.' })}</Text>
            <Emails />
          </VStack>
        )}
        <HStack>
          <Button icon={ic(UI.arrow)} variant="primary" href="#konfigurator" label={t({ de: 'Paket zusammenstellen', en: 'Build your package' })} />
        </HStack>
      </VStack>
    </Section>
  );
}
