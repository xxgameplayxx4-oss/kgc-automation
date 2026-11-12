import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Divider } from '@astryxdesign/core/Divider';
import { WORK, useT, type T } from '../data';
import Eyebrow from './Eyebrow';

// Drop the photo at public/about/khang.webp; until it exists the Avatar shows the initials "KC".
const PORTRAIT = '/about/khang.webp';
const NAME = 'Khang Cung';

const LINES: T[] = [
  { de: 'Ich bin Khang und baue Websites für Kleinunternehmen in der Region Aargau. Jede Seite entsteht bei mir in Brugg, von mir selbst.', en: 'I’m Khang and I build websites for small businesses in the Aargau region. Every site is made by me, here in Brugg.' },
  { de: 'Sie haben einen einzigen Ansprechpartner, vom ersten Gespräch bis zum Launch. Keine Agentur, kein Weiterreichen.', en: 'You have one single contact, from the first call to launch. No agency, no hand-offs.' },
  { de: 'Und Sie wissen von Anfang an, was es kostet: Fixpreise statt Stundenzettel.', en: 'And you know what it costs from the start: fixed prices instead of timesheets.' },
];

// Only numbers that can be checked against this repo.
const STATS: { value: string; label: T }[] = [
  { value: String(WORK.length), label: { de: 'Projekte und Entwürfe im Portfolio', en: 'Projects and drafts in the portfolio' } },
  { value: '2', label: { de: 'Sprachen: Deutsch und Englisch', en: 'Languages: German and English' } },
  { value: '24 h', label: { de: 'Antwort auf Ihre Anfrage', en: 'Reply to your enquiry' } },
];

export default function About() {
  const t = useT();
  return (
    <VStack id="ueber-mich" as="section" gap={6} paddingInline={4} paddingBlock={10} maxWidth={1000} style={{ marginInline: 'auto', width: '100%' }}>
      <HStack gap={8} wrap="wrap" vAlign="center">
        <Avatar src={PORTRAIT} name={NAME} size={180} tooltip={false} />
        <VStack gap={3} style={{ flex: '1 1 20rem' }}>
          <Eyebrow>{t({ de: 'Über mich', en: 'About me' })}</Eyebrow>
          <Heading level={2} type="display-3" textWrap="balance">
            {t({ de: 'Ein Ansprechpartner, vom ersten Gespräch bis zum Launch.', en: 'One contact, from the first call to launch.' })}
          </Heading>
          {LINES.map((l, i) => <Text key={i} type="large" color="secondary">{t(l)}</Text>)}
          <Text type="supporting">Khang Cung · Cung Solutions · Made in Brugg</Text>
        </VStack>
      </HStack>
      <Divider />
      <Grid columns={{ minWidth: 180, max: 3 }} gap={4}>
        {STATS.map(s => (
          <VStack key={s.value} gap={1}>
            <Heading level={3} type="display-2" color="accent">{s.value}</Heading>
            <Text color="secondary">{t(s.label)}</Text>
          </VStack>
        ))}
      </Grid>
    </VStack>
  );
}
