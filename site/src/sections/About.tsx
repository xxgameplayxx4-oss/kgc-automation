import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Divider } from '@astryxdesign/core/Divider';
import { Token } from '@astryxdesign/core/Token';
import { Link } from '@astryxdesign/core/Link';
import { useT, type T } from '../data';
import Eyebrow from './Eyebrow';

// Portrait taken from the owner's CV (public/about/khang.jpg). Content below follows the CV.
const PORTRAIT = '/about/khang.jpg';
const NAME = 'Khang Cung';

const LINES: T[] = [
  { de: 'Mein Name ist Khang, Informatiker EFZ (Applikationsentwicklung) mit Berufsmaturität. Von Brugg aus automatisiere ich Büroarbeit für KMU im Aargau und baue Websites, von A bis Z und alles selbst.', en: 'My name is Khang, a certified IT specialist (application development) with a vocational baccalaureate. From Brugg, I automate office work for small businesses in Aargau and build websites, end to end and all by myself.' },
  { de: 'Dazu kommt meine Erfahrung aus IT-Support und Cyber Security. Sie haben einen einzigen Ansprechpartner, vom ersten Gespräch bis zum Launch, und Fixpreise statt Stundenzettel.', en: 'I also bring experience in IT support and cyber security. You have one single contact from the first call to launch, and fixed prices instead of timesheets.' },
];

type Job = { role: T; org: string; when: string; points: T[]; url?: string };
const JOBS: Job[] = [
  {
    role: { de: 'Website- und CRM-Entwicklung', en: 'Website and CRM development' }, org: 'SwissTech Precision Solutions (STPS)', when: '2026', url: 'https://www.stps.ch',
    points: [
      { de: 'Zweisprachige Firmenwebsite (DE/EN) konzipiert und umgesetzt', en: 'Designed and built the bilingual company website (DE/EN)' },
      { de: 'Eigenes CRM für Kunden, Offerten und Rechnungen entwickelt', en: 'Developed a custom CRM for customers, quotes and invoices' },
    ],
  },
  {
    role: { de: 'Webdesign und Entwicklung', en: 'Web design and development' }, org: 'Boxschule Gebenstorf', when: '05/2026 – 07/2026', url: 'https://boxschule-gebenstorf.ch',
    points: [
      { de: 'Offizielle Website konzipiert und entwickelt', en: 'Designed and developed the official website' },
      { de: 'Responsives Webdesign, technische Betreuung und Wartung', en: 'Responsive web design, technical support and maintenance' },
    ],
  },
  {
    role: { de: 'Webdesign und Entwicklung', en: 'Web design and development' }, org: 'MJ Group · Family Office, Tessin', when: '2026',
    points: [
      { de: 'Website für ein Family Office konzipiert und umgesetzt', en: 'Designed and built the website for a family office' },
    ],
  },
  {
    role: { de: 'Praktikant IT-Support', en: 'IT support intern' }, org: 'Siamp Ltd · Ho-Chi-Minh-Stadt, Vietnam', when: '09/2025 – 05/2026',
    points: [
      { de: 'Betrieb von Netzwerken, Servern und IT-Equipment', en: 'Ran networks, servers and IT equipment' },
      { de: 'Benutzerkonten, E-Mail-Systeme und Software verwaltet', en: 'Managed user accounts, email systems and software' },
    ],
  },
  {
    role: { de: 'Praktikant Cyber Security', en: 'Cyber security intern' }, org: 'SECURNITE GmbH · Windisch', when: '08/2023 – 07/2024',
    points: [
      { de: 'Anwendung zur Erkennung potenzieller Schadsoftware entwickelt', en: 'Built an application to detect potential malware' },
      { de: 'IT-Support und Mitarbeit an Sicherheitslösungen', en: 'IT support and work on security solutions' },
    ],
  },
];

const EDUCATION: { title: T; place: string; when: string }[] = [
  { title: { de: 'Informatiker EFZ, Applikationsentwicklung', en: 'IT specialist (EFZ), application development' }, place: 'BBBaden, Baden', when: '2020 – 2024' },
  { title: { de: 'Berufsmaturität Wirtschaft', en: 'Vocational baccalaureate, business' }, place: 'Kantonsschule Baden', when: '2020 – 2024' },
];

const SKILLS = ['HTML5', 'CSS3', 'JavaScript', 'React', 'C#', '.NET', 'Java', 'SQL', 'PowerShell', 'Microsoft 365', 'Windows Server', 'Active Directory', 'Netzwerke (TCP/IP)', 'Git'];

const LANGUAGES: { name: T; level: T }[] = [
  { name: { de: 'Deutsch', en: 'German' }, level: { de: 'Fliessend', en: 'Fluent' } },
  { name: { de: 'Englisch', en: 'English' }, level: { de: 'Fliessend (C2)', en: 'Fluent (C2)' } },
  { name: { de: 'Vietnamesisch', en: 'Vietnamese' }, level: { de: 'Muttersprache', en: 'Native' } },
  { name: { de: 'Französisch', en: 'French' }, level: { de: 'Grundkenntnisse', en: 'Basic' } },
];

export default function About() {
  const t = useT();
  return (
    <VStack id="ueber-mich" as="section" gap={8} paddingInline={4} paddingBlock={10} maxWidth={1000} style={{ marginInline: 'auto', width: '100%' }}>
      <HStack gap={8} wrap="wrap" vAlign="center">
        <Avatar src={PORTRAIT} name={NAME} size={180} tooltip={false} />
        <VStack gap={3} style={{ flex: '1 1 20rem' }}>
          <Eyebrow>{t({ de: 'Über mich', en: 'About me' })}</Eyebrow>
          <Heading level={2} type="display-3" textWrap="balance">Khang Cung</Heading>
          <Text type="large" weight="medium">{t({ de: 'Webentwicklung · IT-Support · Cyber Security', en: 'Web development · IT support · Cyber security' })}</Text>
          {LINES.map((l, i) => <Text key={i} color="secondary">{t(l)}</Text>)}
          <Text type="supporting">Cung Solutions · Brugg AG</Text>
        </VStack>
      </HStack>

      <Divider />

      <VStack gap={5}>
        <Heading level={3}>{t({ de: 'Erfahrung', en: 'Experience' })}</Heading>
        {JOBS.map(j => (
          <VStack key={j.org} gap={1}>
            <HStack gap={2} wrap="wrap" hAlign="between">
              <Text weight="semibold">{t(j.role)}</Text>
              <Text type="supporting" hasTabularNumbers>{j.when}</Text>
            </HStack>
            {j.url
              ? <Link href={j.url} target="_blank" rel="noopener noreferrer" size="sm">{j.org} ↗</Link>
              : <Text color="accent" size="sm">{j.org}</Text>}
            {j.points.map((p, i) => <Text key={i} color="secondary" size="sm">· {t(p)}</Text>)}
          </VStack>
        ))}
      </VStack>

      <Grid columns={{ minWidth: 260, max: 2 }} gap={8}>
        <VStack gap={3}>
          <Heading level={3}>{t({ de: 'Ausbildung', en: 'Education' })}</Heading>
          {EDUCATION.map(e => (
            <VStack key={e.place} gap={0.5}>
              <Text weight="semibold">{t(e.title)}</Text>
              <Text color="secondary" size="sm">{e.place} · {e.when}</Text>
            </VStack>
          ))}
        </VStack>
        <VStack gap={3}>
          <Heading level={3}>{t({ de: 'Sprachen', en: 'Languages' })}</Heading>
          {LANGUAGES.map(l => (
            <HStack key={l.name.de} gap={2} hAlign="between">
              <Text weight="semibold">{t(l.name)}</Text>
              <Text color="secondary" size="sm">{t(l.level)}</Text>
            </HStack>
          ))}
        </VStack>
      </Grid>

      <VStack gap={3}>
        <Heading level={3}>{t({ de: 'Kenntnisse', en: 'Skills' })}</Heading>
        <HStack gap={2} wrap="wrap">
          {SKILLS.map(s => <Token key={s} label={s} size="sm" />)}
        </HStack>
      </VStack>
    </VStack>
  );
}
