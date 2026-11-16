import type { ReactNode } from 'react';
import { Stack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { AUTOMATION_MONTHLY, CORE_PRICE, PRO_PRICE, UPGRADE_PRICE, chf, useT } from '../data';
import { Big, Center, Chip, F, FilmPlayer, Row, type Line } from './AutomationFilm';

// Website promo for the start page, same scene player as the automations film.
// Voiceover by ElevenLabs (de: Markus, en: Ryan), new prices from 2026-11-14.
const LINES: Line[] = [
  { at: { de: 0, en: 0 }, text: { de: 'Ihr Geschäft ist gut. Ihre Website sollte es auch sein.', en: 'Your business is good. Your website should be too.' } },
  { at: { de: 3.6, en: 3.75 }, text: { de: 'Ich baue Websites für KMU in der Schweiz, zum Fixpreis.', en: 'I build websites for small businesses in Switzerland, at a fixed price.' } },
  { at: { de: 7.95, en: 9.05 }, text: { de: `Website-Upgrade ab ${UPGRADE_PRICE} Franken: Ich mache Ihre bestehende Seite neu, schnell und mobil.`, en: `Website upgrade from ${UPGRADE_PRICE} francs: I rebuild your existing site, fast and mobile.` } },
  { at: { de: 14, en: 17.1 }, text: { de: `Core für ${CORE_PRICE} Franken: alles, was Ihr Betrieb online braucht, mit Formular, E-Mail und Google-Bewertungen.`, en: `Core for ${CORE_PRICE} francs: everything your business needs online, with a contact form, email and Google reviews.` } },
  { at: { de: 20.95, en: 25.3 }, text: { de: `Pro für ${PRO_PRICE} Franken: alle Funktionen, mit Buchungs-Funnel und einem Film als Startbereich. Ich komme vorbei und filme, wie man Ihr Geschäft betritt.`, en: `Pro for ${PRO_PRICE} francs: every feature, with a booking funnel and a film as your hero. I come by and film walking into your business.` } },
  { at: { de: 30, en: 35.9 }, text: { de: 'Dazu Flyer und Visitenkarten im gleichen Look, je 100 Franken.', en: 'Plus flyers and business cards in the same look, 100 francs each.' } },
  { at: { de: 34.7, en: 40.5 }, text: { de: `Und damit keine Anfrage mehr verloren geht: Automationen ab ${AUTOMATION_MONTHLY} Franken im Monat.`, en: `And so no enquiry gets lost again: automations from ${AUTOMATION_MONTHLY} francs a month.` } },
  { at: { de: 40.5, en: 45.95 }, text: { de: 'Live bei SwissTech, der Boxschule Gebenstorf, MJ Group und Mobile Master.', en: 'Live for SwissTech, Boxschule Gebenstorf, MJ Group and Mobile Master.' } },
  { at: { de: 46.35, en: 51 }, text: { de: 'Stellen Sie jetzt Ihre Website zusammen. Direkt hier auf der Seite.', en: 'Build your website now. Right here on this page.' } },
];
const VOICE = { de: '/media/promo2-de.mp3', en: '/media/promo2-en.mp3' };

const Shot = ({ src, w = '46%', delay = 0 }: { src: string; w?: string; delay?: number }) => (
  <Stack data-pop="" style={{ width: w, borderRadius: '0.6rem', overflow: 'hidden', boxShadow: `0 0 0 1px ${F.line}, 0 24px 60px -20px rgba(0,0,0,.9)`, animationDelay: `${delay}s` }}>
    <img src={src} alt="" style={{ width: '100%', display: 'block', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' }} />
  </Stack>
);
const Price = ({ name, price, children }: { name: string; price: string; children: ReactNode }) => (
  <Stack gap={1} padding={3} style={{ width: 'min(26rem, 80%)', background: F.panel, borderRadius: '1rem', boxShadow: `0 0 0 1px ${F.line}`, textAlign: 'left' }}>
    <Text color="inherit" weight="semibold">{name}</Text>
    <Big color={F.orange}>{price}</Big>
    {children}
  </Stack>
);
const Ticks = ({ items }: { items: string[] }) => (
  <Stack gap={0.5}>{items.map((x, i) => <Text key={x} data-pop="" size="sm" color="inherit" style={{ color: F.soft, animationDelay: `${0.3 + i * 0.35}s` }}>✓ {x}</Text>)}</Stack>
);

function Scene({ i }: { i: number }) {
  const t = useT();
  switch (i) {
    case 0: return <Row><Shot src="/projects/stps-desktop.webp" w="56%" /></Row>;
    case 1: return (
      <Center>
        <Text color="inherit" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', color: F.orange }}>Cung Solutions · Brugg</Text>
        <Big>{t({ de: 'Websites für KMU', en: 'Websites for small businesses' })}<br /><span style={{ color: F.orange }}>{t({ de: 'zum Fixpreis', en: 'at a fixed price' })}</span></Big>
      </Center>
    );
    case 2: return (
      <Center>
        <Stack direction="horizontal" gap={2} align="center" justify="center" style={{ width: '100%' }}>
          <Stack style={{ width: '34%', filter: 'grayscale(1) blur(1px)', opacity: 0.5 }}><Shot src="/work/cleaning.webp" w="100%" /></Stack>
          <Text color="inherit" style={{ color: F.orange, fontSize: '1.6rem' }}>→</Text>
          <Stack style={{ width: '40%' }}><Shot src="/projects/halimi-desktop.webp" w="100%" delay={0.4} /></Stack>
        </Stack>
        <Chip on>{t({ de: `Website-Upgrade ab ${chf(UPGRADE_PRICE)}`, en: `Website upgrade from ${chf(UPGRADE_PRICE)}` })}</Chip>
      </Center>
    );
    case 3: return (
      <Center>
        <Price name="Core" price={chf(CORE_PRICE)}>
          <Ticks items={[t({ de: 'Schnell und mobil', en: 'Fast and mobile' }), t({ de: 'Kontaktformular', en: 'Contact form' }), t({ de: 'E-Mail mit eigener Domain', en: 'Email on your domain' }), t({ de: 'Google-Bewertungen', en: 'Google reviews' })]} />
        </Price>
      </Center>
    );
    case 4: return (
      <Row>
        <Stack gap={1} style={{ width: '32%', textAlign: 'left' }}>
          <Text color="inherit" weight="semibold">Pro</Text>
          <Big color={F.orange}>{chf(PRO_PRICE)}</Big>
          <Ticks items={[t({ de: 'Alle Funktionen', en: 'Every feature' }), t({ de: 'Buchungs-Funnel', en: 'Booking funnel' }), t({ de: 'Film als Startbereich', en: 'Film hero' })]} />
        </Stack>
        <Stack style={{ width: '56%', aspectRatio: '16 / 10', borderRadius: '0.6rem', overflow: 'hidden', boxShadow: `0 0 0 1px ${F.line}` }}>{/* Real walk-in footage from client Mobile Master (KGC, 2026-11-16) */}
          <video src="/work/video/mobilemaster-walkin.mp4" poster="/projects/mobilemaster-desktop.webp" autoPlay muted loop playsInline aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></Stack>
      </Row>
    );
    case 5: return (
      <Row>
        <Stack data-pop="" style={{ width: '24%', transform: 'rotate(-3deg)' }}><img src="/print/restaurant-flyer.webp" alt="" style={{ width: '100%', borderRadius: '0.3rem', boxShadow: '0 20px 50px -15px #000' }} /></Stack>
        <Stack gap={2} style={{ width: '30%' }}>
          <img data-pop="" src="/print/restaurant-card-front.webp" alt="" style={{ width: '100%', borderRadius: '0.3rem', transform: 'rotate(2deg)', boxShadow: '0 20px 50px -15px #000', animationDelay: '0.4s' }} />
          <img data-pop="" src="/print/restaurant-card-back.webp" alt="" style={{ width: '100%', borderRadius: '0.3rem', transform: 'rotate(-2deg)', boxShadow: '0 20px 50px -15px #000', animationDelay: '0.8s' }} />
        </Stack>
        <Chip on>{t({ de: `je ${chf(100)}`, en: `${chf(100)} each` })}</Chip>
      </Row>
    );
    case 6: return (
      <Center>
        <Stack direction="horizontal" gap={1} wrap="wrap" justify="center" style={{ maxWidth: '34rem' }}>
          {[t({ de: 'Verpasster Anruf → SMS', en: 'Missed call → text' }), t({ de: 'WhatsApp-Agent', en: 'WhatsApp agent' }), t({ de: 'Termin-Erinnerung', en: 'Appointment reminder' }), t({ de: 'Offerte nachfassen', en: 'Quote follow-up' }), t({ de: 'Google-Bewertung', en: 'Google review' })].map((x, k) => (
            <Stack key={x} data-pop="" style={{ animationDelay: `${k * 0.3}s` }}><Chip>{x}</Chip></Stack>
          ))}
        </Stack>
        <Big color={F.orange}>{t({ de: `ab ${chf(AUTOMATION_MONTHLY)} / Monat`, en: `from ${chf(AUTOMATION_MONTHLY)} / month` })}</Big>
      </Center>
    );
    case 7: return (
      <Center gap={2}>
        <Stack direction="horizontal" gap={1.5} wrap="wrap" justify="center" style={{ width: '90%' }}>
          {['stps', 'boxschule', 'mjgroup', 'mobilemaster'].map((s, k) => <Stack key={s} style={{ width: '22%' }}><Shot src={`/projects/${s}-desktop.webp`} w="100%" delay={k * 0.3} /></Stack>)}
        </Stack>
        <Text size="sm" color="inherit" style={{ color: F.soft }}>SwissTech · Boxschule Gebenstorf · MJ Group · Mobile Master</Text>
      </Center>
    );
    default: return (
      <Center gap={2}>
        <Big>{t({ de: 'Stellen Sie Ihre Website zusammen', en: 'Build your website' })}</Big>
        <Chip on>{t({ de: 'Zum Konfigurator →', en: 'To the configurator →' })}</Chip>
      </Center>
    );
  }
}

export default function PromoFilm() {
  return <FilmPlayer lines={LINES} voice={VOICE} scene={i => <Scene i={i} />} label={{ de: 'Film ansehen · unter 1 Minute, mit Ton', en: 'Watch the film · under 1 minute, with sound' }} />;
}
