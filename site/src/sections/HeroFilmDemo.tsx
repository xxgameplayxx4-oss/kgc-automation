import { VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { useT } from '../data';

// Demo of the cinematic walk-in hero, using the real walk-in film from the Mobile Master site (KGC, 2026-11-16).
const CSS = `
.kgc-film{position:relative;overflow:hidden;width:100%;aspect-ratio:16/9;border-radius:var(--radius-4);background:#000}
@media (max-width:640px){.kgc-film{aspect-ratio:4/5}}
.kgc-film video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform-origin:50% 60%;animation:kgc-zoom 12s ease-out forwards}
@keyframes kgc-zoom{from{transform:scale(1)}to{transform:scale(1.08)}}
.kgc-film .shade{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.15) 40%,rgba(0,0,0,.75) 100%)}
.kgc-film .bar{position:absolute;left:0;right:0;height:9%;background:#000}
@media (prefers-reduced-motion:reduce){.kgc-film video{animation:none}}
`;

export default function HeroFilmDemo() {
  const t = useT();
  const reduce = typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  return (
    <VStack id="film-demo" gap={3} style={{ scrollMarginTop: 'var(--spacing-8)' }}>
      <style>{CSS}</style>
      <Heading level={3}>{t({ de: 'So wirkt ein Film im Startbereich', en: 'How a film looks in the hero' })}</Heading>
      <Text color="secondary">{t({ de: 'Ein kurzer, ruhiger Film statt eines Stockfotos: Besucher sehen sofort, wo sie hineingehen.', en: 'A short, calm film instead of a stock photo: visitors see right away where they are walking in.' })}</Text>
      <div className="kgc-film">
        <video src="/work/video/mobilemaster-walkin.mp4" poster="/projects/mobilemaster-desktop.webp" muted loop playsInline autoPlay={!reduce} preload="metadata" aria-hidden="true" />
        <div className="shade" />
        <div className="bar" style={{ top: 0 }} />
        <div className="bar" style={{ bottom: 0 }} />
        <VStack gap={2} hAlign="start" vAlign="end" style={{ position: 'absolute', inset: 0, padding: 'var(--spacing-6)', paddingBottom: '12%', color: '#fff' }}>
          <Text size="sm" style={{ color: '#fff', opacity: 0.8, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Mobile Master · Baden-Turgi</Text>
          <Heading level={2} type="display-3" style={{ color: '#fff' }}>{t({ de: 'Willkommen. Treten Sie ein.', en: 'Welcome. Step inside.' })}</Heading>
        </VStack>
        <Text size="sm" style={{ position: 'absolute', top: '11%', left: 'var(--spacing-4)', color: '#fff', background: 'rgba(0,0,0,.55)', padding: '2px var(--spacing-2)', borderRadius: 'var(--radius-2)' }}>
          {t({ de: 'Beispiel: Kundenprojekt Mobile Master', en: 'Example: client project Mobile Master' })}
        </Text>
      </div>
    </VStack>
  );
}
