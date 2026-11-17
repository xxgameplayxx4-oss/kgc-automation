import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Avatar } from '@astryxdesign/core/Avatar';
import { Divider } from '@astryxdesign/core/Divider';
import { useT, type T } from '../data';
import Eyebrow from './Eyebrow';
import { usePhone } from './usePhone';
import PhoneMore from './PhoneMore';
import { Block, Chips, Stats, VIZ } from './viz';

// Portrait taken from the owner's CV (public/about/khang.jpg). Content below follows the CV.
const PORTRAIT = '/about/khang.jpg';
const NAME = 'Khang Cung';

// Only facts from the CV: 3 client websites (STPS, Boxschule, MJ Group), EFZ 2024, 4 languages.
const STATS: { value: string; label: T }[] = [
  { value: '4', label: { de: 'Kundenprojekte', en: 'Client projects' } },
  { value: 'EFZ', label: { de: 'Informatiker, 2024', en: 'IT specialist, 2024' } },
  { value: '4', label: { de: 'Sprachen', en: 'Languages' } },
];

const JOBS: { when: string; role: T; org: string }[] = [
  { when: '2026', role: { de: 'Website und CRM', en: 'Website and CRM' }, org: 'SwissTech Precision Solutions' },
  { when: '2026', role: { de: 'Website, Boxclub', en: 'Website, boxing club' }, org: 'Boxschule Gebenstorf' },
  { when: '2026', role: { de: 'Website, Family Office', en: 'Website, family office' }, org: 'MJ Group' },
  { when: '2025', role: { de: 'IT-Support', en: 'IT support' }, org: 'Siamp, Vietnam' },
  { when: '2023', role: { de: 'Cyber Security', en: 'Cyber security' }, org: 'SECURNITE, Windisch' },
];

const SKILLS: T[] = ['HTML/CSS', 'JavaScript', 'React', 'C#/.NET', 'Java', 'SQL', 'PowerShell', 'Microsoft 365', 'Windows Server', 'Active Directory', 'Git'].map(s => ({ de: s, en: s }));

export default function About() {
  const t = useT();
  const phone = usePhone();
  return (
    <Block id="ueber-mich" gap={8}>
      <HStack gap={6} wrap="wrap" vAlign="center">
        <Avatar src={PORTRAIT} name={NAME} size={phone ? 96 : 180} tooltip={false} />
        <VStack gap={2} style={{ flex: '1 1 20rem' }}>
          <Eyebrow>{t({ de: 'Über mich', en: 'About me' })}</Eyebrow>
          <Heading level={1} type="display-3" textWrap="balance">{NAME}</Heading>
          <Text color="secondary" textWrap="pretty">{t({ de: 'Informatiker EFZ aus Brugg. Ich automatisiere Büroarbeit und baue Websites für KMU im Aargau, alles aus einer Hand.', en: 'Certified IT specialist from Brugg. I automate office work and build websites for businesses in Aargau, all from one hand.' })}</Text>
        </VStack>
      </HStack>

      <Stats items={STATS} />
      <Divider />

      <VStack gap={4}>
        <Heading level={3}>{t({ de: 'Stationen', en: 'Career' })}</Heading>
        {JOBS.map(j => (
          <HStack key={j.org} gap={4} vAlign="start" wrap="nowrap">
            <Text weight="semibold" color="accent" hasTabularNumbers style={{ width: '3rem', flexShrink: 0 }}>{j.when}</Text>
            <VStack gap={0} style={{ minWidth: 0, paddingInlineStart: 'var(--spacing-4)', borderInlineStart: '0.125rem solid var(--color-border)' }}>
              <Text weight="medium">{t(j.role)}</Text>
              <Text size="sm" color="secondary">{j.org}</Text>
            </VStack>
          </HStack>
        ))}
      </VStack>

      <PhoneMore items={SKILLS} limit={6}>
        {shown => <Chips items={shown.map(label => ({ icon: VIZ.check, label }))} />}
      </PhoneMore>
    </Block>
  );
}
