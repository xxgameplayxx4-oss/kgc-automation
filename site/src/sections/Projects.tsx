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
import { ClickableCard } from '@astryxdesign/core/ClickableCard';
import { Dialog, DialogHeader } from '@astryxdesign/core/Dialog';
import { useState, useSyncExternalStore } from 'react';
import { useT, type T } from '../data';
import Eyebrow from './Eyebrow';

// Screenshots live in public/projects/<slug>-desktop.webp and <slug>-phone.webp.
// Only paid client sites get a name and a link; concept drafts stay anonymised.
export type Project = { slug: string; title: T; kind: T; place: string; tags: T[]; url?: string; video?: string };

export const CLIENTS: Project[] = [
  {
    slug: 'stps', video: '/work/video/stps-site', title: { de: 'SwissTech Precision Solutions', en: 'SwissTech Precision Solutions' }, url: 'https://www.stps.ch', place: 'Schweiz',
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
  {
    slug: 'mobilemaster', title: { de: 'Mobile Master', en: 'Mobile Master' }, url: 'https://mobile-master-entwurf.netlify.app', place: 'Baden-Turgi',
    kind: { de: 'Handy-Shop & Reparatur · Website', en: 'Phone shop & repair · website' },
    tags: [{ de: 'Reparaturpreise', en: 'Repair prices' }, { de: 'Responsive', en: 'Responsive' }],
  },
  {
    slug: 'edge', title: { de: 'Trading-Journal', en: 'Trading journal' }, place: 'Web-App',
    kind: { de: 'Web-App für einen Kunden', en: 'Web app for a client' },
    tags: [{ de: 'Kalender mit Tages-P&L', en: 'Calendar with daily P&L' }, { de: 'CSV- und Screenshot-Import', en: 'CSV & screenshot import' }, { de: 'KI-Auswertung', en: 'AI parsing' }],
  },
];

const CONCEPTS: Project[] = [
  { slug: 'barber-leone', place: 'Brugg', title: { de: 'Barbier', en: 'Barber' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Live «Jetzt geöffnet»', en: 'Live “open now”' }, { de: 'Online-Termin', en: 'Online booking' }] },
  { slug: 'barbershop', place: 'Brugg', title: { de: 'Barbershop', en: 'Barbershop' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Öffnungszeiten', en: 'Opening hours' }, { de: 'Terminbuchung', en: 'Booking' }] },
  { slug: 'souperbe', place: 'Brugg', title: { de: 'Restaurant', en: 'Restaurant' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Tischreservation', en: 'Table booking' }, { de: 'Menü-Filter', en: 'Menu filter' }, { de: 'Newsletter', en: 'Newsletter' }] },
  { slug: 'yushu', place: 'Brugg', title: { de: 'Sushi & Momo', en: 'Sushi & momo' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Bestellen', en: 'Ordering' }, { de: 'Reservieren', en: 'Reservations' }] },
  { slug: 'iservice', place: 'Wildegg', title: { de: 'Handy-Reparatur', en: 'Phone repair' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Preisrechner', en: 'Price finder' }, { de: 'Reservation mit Bestätigung', en: 'Booking with confirmation' }] },
  { slug: 'halimi', place: 'Aarau', title: { de: 'Reinigungsfirma', en: 'Cleaning company' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Offertanfrage', en: 'Quote request' }, { de: 'Abgabeprotokoll', en: 'Handover protocol' }] },
  { slug: 'reve', place: 'Brugg', title: { de: 'Facility Management', en: 'Facility management' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Vorher/Nachher-Slider', en: 'Before/after slider' }] },
  { slug: 'dd-informatic', place: 'Aargau', title: { de: 'IT-Dienstleister', en: 'IT services' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Dreisprachig', en: 'Trilingual' }, { de: 'Offertanfrage', en: 'Quote request' }] },
  { slug: 'freestar', place: 'Zürich', title: { de: 'IT-Personalvermittlung', en: 'IT recruiting' }, kind: { de: 'Konzeptentwurf', en: 'Concept' }, tags: [{ de: 'Stellenbörse', en: 'Job board' }, { de: 'Mehrseitig', en: 'Multi-page' }] },
];


const reduceQuery = '(prefers-reduced-motion: reduce)';
const useReducedMotion = () => useSyncExternalStore(
  cb => { const m = window.matchMedia(reduceQuery); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb); },
  () => window.matchMedia(reduceQuery).matches,
  () => false,
);

/** Muted looping hero clip; poster only for reduced motion. */
export function HeroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <img src={poster} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />;
  return <video src={src} poster={poster} aria-label={label} autoPlay muted loop playsInline preload="metadata" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />;
}

/** Screenshot of a site; for video sites a recording of the live hero (header and moving video) is laid over its top. */
const HERO_RATIO = { desktop: 1100 / 572, phone: 390 / 605 } as const;
export function Screen({ p, kind, alt, lazy }: { p: Project; kind: 'desktop' | 'phone'; alt: string; lazy?: boolean }) {
  const reduce = useReducedMotion();
  const img = `/projects/${p.slug}-${kind}.webp`;
  return (
    <Stack style={{ position: 'relative' }}>
      <img src={img} alt={alt} loading={lazy ? 'lazy' : undefined} decoding="async" style={{ width: '100%', display: 'block' }} />
      {p.video && !reduce && (
        <video src={`${p.video}-${kind}.mp4`} aria-hidden autoPlay muted loop playsInline preload="metadata"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', aspectRatio: HERO_RATIO[kind], objectFit: 'cover', display: 'block' }} />
      )}
    </Stack>
  );
}

/** Laptop with the desktop screenshot, phone in front at the bottom right. */
export function Devices({ p, alt }: { p: Project; alt: string }) {
  return (
    <Stack style={{ position: 'relative', paddingRight: '8%', paddingBottom: '6%' }}>
      <Card padding={1} elevation="high" style={{ background: 'black' /* bezel stays black in both themes */, borderRadius: 'var(--radius-page) var(--radius-page) 0.25rem 0.25rem' }}>
        <AspectRatio ratio={16 / 10} fit="cover">
          <Screen p={p} kind="desktop" alt={`${alt}, Desktop`} lazy />
        </AspectRatio>
      </Card>
      <Card variant="gray" padding={0.5} style={{ marginInline: '-4%', borderRadius: '0 0 0.75rem 0.75rem' }} />
      <Card padding={0.5} elevation="high" style={{ position: 'absolute', right: 0, bottom: 0, width: '24%', background: 'black', borderRadius: '1rem' }}>
        <AspectRatio ratio={390 / 844} fit="cover" style={{ borderRadius: '0.7rem', overflow: 'hidden' }}>
          <Screen p={p} kind="phone" alt={`${alt}, Handy`} lazy />
        </AspectRatio>
      </Card>
    </Stack>
  );
}

/** Full-length screenshots in device frames, each screen scrolls on its own. */
function Viewer({ p, alt }: { p: Project; alt: string }) {
  const screen = { overflowY: 'auto', overscrollBehavior: 'contain' } as const;
  return (
    <HStack gap={6} wrap="wrap" hAlign="center" vAlign="start">
      <Card padding={1} elevation="high" style={{ flex: '3 1 26rem', minWidth: 0, background: 'black', borderRadius: 'var(--radius-page)' }}>
        <Stack style={{ ...screen, aspectRatio: '16 / 10', maxHeight: '60vh', borderRadius: '0.25rem' }}>
          <Screen p={p} kind="desktop" alt={`${alt}, Desktop`} />
        </Stack>
      </Card>
      <Card padding={1} elevation="high" style={{ flex: '1 1 13rem', maxWidth: '17rem', background: 'black', borderRadius: '1.6rem' }}>
        <Stack style={{ ...screen, aspectRatio: '390 / 844', maxHeight: '60vh', borderRadius: '1.1rem' }}>
          <Screen p={p} kind="phone" alt={`${alt}, Handy`} />
        </Stack>
      </Card>
    </HStack>
  );
}

/** Scrollable preview dialog: laptop and phone captures, with the live hero moving on video sites. */
export function PreviewDialog({ p, title, open, setOpen }: { p: Project; title: string; open: boolean; setOpen: (o: boolean) => void }) {
  const t = useT();
  return (
    <Dialog isOpen={open} onOpenChange={setOpen} width="min(72rem, calc(100vw - 2rem))" padding={4}>
      <VStack gap={4}>
        <DialogHeader title={title} subtitle={t({ de: 'Scrollen Sie in Laptop und Handy durch die Website.', en: 'Scroll through the site on laptop and phone.' })} onOpenChange={setOpen} />
        <Viewer p={p} alt={title} />
        {p.url && <HStack><Button variant="ghost" size="sm" href={p.url} target="_blank" rel="noopener noreferrer" label={t({ de: 'Live-Website öffnen ↗', en: 'Open live website ↗' })} /></HStack>}
      </VStack>
    </Dialog>
  );
}

/** Device mockup that opens the scrollable viewer, plus an explicit preview button. */
export function Preview({ p }: { p: Project }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const title = t(p.title);
  return (
    <>
      <ClickableCard variant="transparent" padding={0} label={t({ de: `${title}: Vorschau öffnen`, en: `${title}: open preview` })} onClick={() => setOpen(true)}>
        <Devices p={p} alt={title} />
      </ClickableCard>
      <HStack><Button variant="secondary" size="sm" onClick={() => setOpen(true)} label={t({ de: 'Vorschau', en: 'Preview' })} /></HStack>
      <PreviewDialog p={p} title={title} open={open} setOpen={setOpen} />
    </>
  );
}

function ProjectCard({ p, paid }: { p: Project; paid?: boolean }) {
  const t = useT();
  const title = t(p.title);
  return (
    <VStack gap={4}>
      <Preview p={p} />
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
          intro={{ de: 'Websites und Web-Apps, die ich für zahlende Kunden umgesetzt habe. Klicken Sie auf eine Vorschau, um durch die ganze Seite zu scrollen.', en: 'Websites and web apps I built for paying clients. Click a preview to scroll through the whole page.' }}
          items={CLIENTS} paid min={420}
        />
        <Group
          eyebrow={{ de: 'Entwürfe', en: 'Drafts' }}
          heading={{ de: 'Konzeptentwürfe', en: 'Concept designs' }}
          intro={{ de: 'Entwürfe für lokale Geschäfte, um zu zeigen, was möglich ist. Namen und Links sind bewusst weggelassen.', en: 'Drafts for local businesses to show what is possible. Names and links are left out on purpose.' }}
          items={CONCEPTS} min={280}
        />
      </VStack>
    </Section>
  );
}
