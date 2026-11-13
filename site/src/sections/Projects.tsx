import { Section } from '@astryxdesign/core/Section';
import { VStack } from '@astryxdesign/core/VStack';
import { HStack } from '@astryxdesign/core/HStack';
import { Stack } from '@astryxdesign/core/Stack';
import { Grid } from '@astryxdesign/core/Grid';
import { Card } from '@astryxdesign/core/Card';
import { Heading } from '@astryxdesign/core/Heading';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Token } from '@astryxdesign/core/Token';
import { AspectRatio } from '@astryxdesign/core/AspectRatio';
import { useT, type T } from '../data';
import Eyebrow from './Eyebrow';

// Screenshots live in public/projects/<slug>-desktop.webp and <slug>-phone.webp.
// Only paid client sites get a name and a link; concept drafts stay anonymised.
type Project = { slug: string; title: T; kind: T; place: string; tags: T[]; url?: string };

export const CLIENTS: Project[] = [
  {
    slug: 'stps', title: { de: 'SwissTech Precision Solutions', en: 'SwissTech Precision Solutions' }, url: 'https://www.stps.ch', place: 'Schweiz',
    kind: { de: 'Präzisionstechnik · Website und CRM', en: 'Precision engineering · website and CRM' },
    tags: [{ de: 'Zweisprachig DE/EN', en: 'Bilingual DE/EN' }, { de: 'Eigenes CRM', en: 'Custom CRM' }, { de: 'Offerten & Rechnungen', en: 'Quotes & invoices' }],
  },
  {
    slug: 'boxschule', title: { de: 'Boxschule Gebenstorf', en: 'Boxschule Gebenstorf' }, url: 'https://boxschule-gebenstorf.ch', place: 'Gebenstorf AG',
    kind: { de: 'Boxclub · offizielle Website', en: 'Boxing club · official website' },
    tags: [{ de: 'Trainingsplan', en: 'Training schedule' }, { de: 'Responsive', en: 'Responsive' }, { de: 'Betreuung & Wartung', en: 'Support & maintenance' }],
  },
  {
    slug: 'mjgroup', title: { de: 'MJ Group', en: 'MJ Group' }, place: 'Tessin',
    kind: { de: 'Family Office · Website', en: 'Family office · website' },
    tags: [{ de: 'Seriöser Auftritt', en: 'Premium look' }, { de: 'Mehrsprachig', en: 'Multilingual' }],
  },
];

const CONCEPTS: Project[] = [
  { slug: 'barber-leone', place: 'Brugg', title: { de: 'Barbier', en: 'Barber' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Live «Jetzt geöffnet»', en: 'Live “open now”' }, { de: 'Online-Termin', en: 'Online booking' }] },
  { slug: 'barbershop', place: 'Brugg', title: { de: 'Barbershop', en: 'Barbershop' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Öffnungszeiten', en: 'Opening hours' }, { de: 'Terminbuchung', en: 'Booking' }] },
  { slug: 'souperbe', place: 'Brugg', title: { de: 'Restaurant', en: 'Restaurant' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Tischreservation', en: 'Table booking' }, { de: 'Menü-Filter', en: 'Menu filter' }, { de: 'Newsletter', en: 'Newsletter' }] },
  { slug: 'yushu', place: 'Brugg', title: { de: 'Sushi & Momo', en: 'Sushi & momo' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Bestellen', en: 'Ordering' }, { de: 'Reservieren', en: 'Reservations' }] },
  { slug: 'iservice', place: 'Wildegg', title: { de: 'Handy-Reparatur', en: 'Phone repair' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Preisrechner', en: 'Price finder' }, { de: 'Reservation mit Bestätigung', en: 'Booking with confirmation' }] },
  { slug: 'mobilemaster', place: 'Baden', title: { de: 'Handy-Shop', en: 'Phone shop' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Reparaturpreise', en: 'Repair prices' }] },
  { slug: 'halimi', place: 'Aarau', title: { de: 'Reinigungsfirma', en: 'Cleaning company' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Offertanfrage', en: 'Quote request' }, { de: 'Abgabeprotokoll', en: 'Handover protocol' }] },
  { slug: 'reve', place: 'Brugg', title: { de: 'Facility Management', en: 'Facility management' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Vorher/Nachher-Slider', en: 'Before/after slider' }] },
  { slug: 'dd-informatic', place: 'Aargau', title: { de: 'IT-Dienstleister', en: 'IT services' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Dreisprachig', en: 'Trilingual' }, { de: 'Offertanfrage', en: 'Quote request' }] },
  { slug: 'freestar', place: 'Zürich', title: { de: 'IT-Personalvermittlung', en: 'IT recruiting' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Stellenbörse', en: 'Job board' }, { de: 'Mehrseitig', en: 'Multi-page' }] },
];

const TOOLS: Project[] = [
  { slug: 'edge', place: 'Web-App', title: { de: 'Trading-Journal', en: 'Trading journal' }, kind: { de: 'Eigenes Tool', en: 'Own tool' }, tags: [{ de: 'CSV- und Screenshot-Import', en: 'CSV & screenshot import' }, { de: 'KI-Auswertung', en: 'AI parsing' }, { de: 'Statistiken', en: 'Analytics' }] },
];

/** Laptop with the desktop screenshot, phone in front at the bottom right. */
export function Devices({ p, alt }: { p: Project; alt: string }) {
  return (
    <Stack style={{ position: 'relative', paddingRight: '8%', paddingBottom: '6%' }}>
      <Card padding={1} elevation="high" style={{ background: 'black' /* bezel stays black in both themes */, borderRadius: 'var(--radius-page) var(--radius-page) 0.25rem 0.25rem' }}>
        <AspectRatio ratio={16 / 10} fit="cover">
          <img src={`/projects/${p.slug}-desktop.webp`} alt={`${alt}, Desktop`} loading="lazy" decoding="async" style={{ objectPosition: 'top' }} />
        </AspectRatio>
      </Card>
      <Card variant="gray" padding={0.5} style={{ marginInline: '-4%', borderRadius: '0 0 0.75rem 0.75rem' }} />
      <Card padding={0.5} elevation="high" style={{ position: 'absolute', right: 0, bottom: 0, width: '24%', background: 'black', borderRadius: '1rem' }}>
        <AspectRatio ratio={390 / 844} fit="cover" style={{ borderRadius: '0.7rem', overflow: 'hidden' }}>
          <img src={`/projects/${p.slug}-phone.webp`} alt={`${alt}, Handy`} loading="lazy" decoding="async" style={{ objectPosition: 'top' }} />
        </AspectRatio>
      </Card>
    </Stack>
  );
}

function ProjectCard({ p, paid }: { p: Project; paid?: boolean }) {
  const t = useT();
  const title = t(p.title);
  return (
    <VStack gap={4}>
      <Devices p={p} alt={title} />
      <VStack gap={2}>
        <HStack gap={2} wrap="wrap" vAlign="center">
          <Heading level={3}>{title}</Heading>
          {paid && <Token label={t({ de: 'Kundenprojekt', en: 'Client project' })} size="sm" color="orange" />}
        </HStack>
        <Text type="supporting">{t(p.kind)} · {p.place}</Text>
        <HStack gap={1} wrap="wrap">
          {p.tags.map(tag => <Token key={tag.de} label={t(tag)} size="sm" />)}
        </HStack>
        {p.url && (
          <HStack>
            <Button variant="ghost" size="sm" href={p.url} target="_blank" rel="noopener noreferrer" label={t({ de: 'Website ansehen ↗', en: 'View website ↗' })} />
          </HStack>
        )}
      </VStack>
    </VStack>
  );
}

function Group({ eyebrow, heading, intro, items, paid, min }: { eyebrow: T; heading: T; intro: T; items: Project[]; paid?: boolean; min: number }) {
  const t = useT();
  return (
    <VStack gap={6}>
      <VStack gap={2}>
        <Eyebrow>{t(eyebrow)}</Eyebrow>
        <Heading level={2}>{t(heading)}</Heading>
        <Text color="secondary" style={{ maxWidth: "42rem" }}>{t(intro)}</Text>
      </VStack>
      <Grid columns={{ minWidth: min, max: 3 }} gap={8}>
        {items.map(p => <ProjectCard key={p.slug} p={p} paid={paid} />)}
      </Grid>
    </VStack>
  );
}

export default function Projects() {
  return (
    <Section id="projekte" variant="transparent" padding={6}>
      <VStack gap={10} maxWidth={1200} style={{ marginInline: 'auto', width: '100%' }}>
        <Group
          eyebrow={{ de: 'Projekte', en: 'Projects' }}
          heading={{ de: 'Kundenprojekte', en: 'Client projects' }}
          intro={{ de: 'Websites, die ich für zahlende Kunden umgesetzt habe, auf dem Laptop und dem Handy.', en: 'Websites I built for paying clients, on laptop and phone.' }}
          items={CLIENTS} paid min={300}
        />
        <Group
          eyebrow={{ de: 'Entwürfe', en: 'Drafts' }}
          heading={{ de: 'Konzeptentwürfe', en: 'Concept designs' }}
          intro={{ de: 'Entwürfe für lokale Geschäfte, um zu zeigen, was möglich ist. Namen und Links sind bewusst weggelassen.', en: 'Drafts for local businesses to show what is possible. Names and links are left out on purpose.' }}
          items={CONCEPTS} min={280}
        />
        <Group
          eyebrow={{ de: 'Eigene Tools', en: 'Own tools' }}
          heading={{ de: 'Selbst gebaut', en: 'Built for myself' }}
          intro={{ de: 'Eine Web-App, die ich für mich selbst entwickelt habe.', en: 'A web app I built for my own use.' }}
          items={TOOLS} min={300}
        />
      </VStack>
    </Section>
  );
}
