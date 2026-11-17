import { Stack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { AUTOMATION_MONTHLY, UPGRADE_PRICE, chf, useT } from '../data';
import { Big, Center, Chip, F, FilmPlayer, Row, type Line } from './AutomationFilm';

// Website promo for the start page, same scene player as the automations film.
// KGC 2026-11-17: short cut, about 22 s. Only the projects, the price from CHF 1'000 on screen, and a brief automations line.
// The voice (de: Markus, en: Ryan) is cut from the earlier ElevenLabs takes; at = second in the cut audio.
const LINES: Line[] = [
  { at: { de: 0, en: 0 }, text: { de: 'Ihr Geschäft ist gut. Ihre Website sollte es auch sein.', en: 'Your business is good. Your website should be too.' } },
  { at: { de: 3.4, en: 3.7 }, text: { de: 'Ich baue Websites für KMU in der Schweiz, zum Fixpreis.', en: 'I build websites for small businesses in Switzerland, at a fixed price.' } },
  { at: { de: 7.8, en: 9 }, text: { de: 'Live bei SwissTech, der Boxschule Gebenstorf, MJ Group und Mobile Master.', en: 'Live for SwissTech, Boxschule Gebenstorf, MJ Group and Mobile Master.' } },
  { at: { de: 13.5, en: 14.05 }, text: { de: `Und damit keine Anfrage mehr verloren geht: Automationen ab ${AUTOMATION_MONTHLY} Franken im Monat.`, en: `And so no enquiry gets lost again: automations from ${AUTOMATION_MONTHLY} francs a month.` } },
  { at: { de: 19, en: 19.5 }, text: { de: 'Stellen Sie jetzt Ihre Website zusammen. Direkt hier auf der Seite.', en: 'Build your website now. Right here on this page.' } },
];
const VOICE = { de: '/media/promo3-de.mp3', en: '/media/promo3-en.mp3' };

const Shot = ({ src, w = '46%', delay = 0 }: { src: string; w?: string; delay?: number }) => (
  <Stack data-pop="" style={{ width: w, borderRadius: '0.6rem', overflow: 'hidden', boxShadow: `0 0 0 1px ${F.line}, 0 24px 60px -20px rgba(0,0,0,.9)`, animationDelay: `${delay}s` }}>
    <img src={src} alt="" style={{ width: '100%', display: 'block', aspectRatio: '16 / 10', objectFit: 'cover', objectPosition: 'top' }} />
  </Stack>
);
function Scene({ i }: { i: number }) {
  const t = useT();
  switch (i) {
    case 0: return <Row><Shot src="/projects/stps-desktop.webp" w="56%" /></Row>;
    case 1: return (
      <Center>
        <Text color="inherit" style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', color: F.orange }}>Cung Solutions · Brugg</Text>
        <Big>{t({ de: 'Websites für KMU', en: 'Websites for small businesses' })}<br /><span style={{ color: F.orange }}>{t({ de: 'zum Fixpreis', en: 'at a fixed price' })}</span></Big>
        <Stack data-pop="" style={{ animationDelay: '0.6s' }}><Chip on>{t({ de: `ab ${chf(UPGRADE_PRICE)}`, en: `from ${chf(UPGRADE_PRICE)}` })}</Chip></Stack>
      </Center>
    );
    case 2: return (
      <Center gap={2}>
        <Stack direction="horizontal" gap={1.5} wrap="wrap" justify="center" style={{ width: '90%' }}>
          {['stps', 'boxschule', 'mjgroup', 'mobilemaster'].map((s, k) => <Stack key={s} style={{ width: '22%' }}><Shot src={`/projects/${s}-desktop.webp`} w="100%" delay={k * 0.3} /></Stack>)}
        </Stack>
        <Text size="sm" color="inherit" style={{ color: F.soft }}>SwissTech · Boxschule Gebenstorf · MJ Group · Mobile Master</Text>
      </Center>
    );
    case 3: return (
      <Center>
        <Stack direction="horizontal" gap={1} wrap="wrap" justify="center" style={{ maxWidth: '34rem' }}>
          {[t({ de: 'Verpasster Anruf → SMS', en: 'Missed call → text' }), t({ de: 'WhatsApp-Agent', en: 'WhatsApp agent' }), t({ de: 'Termin-Erinnerung', en: 'Appointment reminder' }), t({ de: 'Google-Bewertung', en: 'Google review' })].map((x, k) => (
            <Stack key={x} data-pop="" style={{ animationDelay: `${k * 0.3}s` }}><Chip>{x}</Chip></Stack>
          ))}
        </Stack>
        <Big color={F.orange}>{t({ de: `ab ${chf(AUTOMATION_MONTHLY)} / Monat`, en: `from ${chf(AUTOMATION_MONTHLY)} / month` })}</Big>
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
  return <FilmPlayer lines={LINES} voice={VOICE} scene={i => <Scene i={i} />} label={{ de: 'Film ansehen · 20 Sekunden, mit Ton', en: 'Watch the film · 20 seconds, with sound' }} />;
}
