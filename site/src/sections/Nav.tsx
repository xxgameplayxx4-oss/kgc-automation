import { useContext, useEffect, useState } from 'react';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Button } from '@astryxdesign/core/Button';
import { Drawer } from '@astryxdesign/core/Drawer';
import { IconButton } from '@astryxdesign/core/IconButton';
import { UI, ic } from './uiIcons';
import { LangContext, ModeContext, useT, type Lang } from '../data';
import type { Page } from '../App';
import Logo from './Logo';

const LINKS: { id: Page; label: { de: string; en: string } }[] = [
  { id: 'start', label: { de: 'Start', en: 'Home' } },
  { id: 'automationen', label: { de: 'Automationen', en: 'Automations' } },
  { id: 'websites', label: { de: 'Websites', en: 'Websites' } },
  { id: 'projekte', label: { de: 'Projekte', en: 'Projects' } },
  { id: 'ueber-mich', label: { de: 'Über mich', en: 'About' } },
  { id: 'faq', label: { de: 'FAQ', en: 'FAQ' } },
];

const META: Record<Page, { title: { de: string; en: string }; desc: { de: string; en: string } }> = {
  start: { title: { de: 'Cung Solutions · Automationen und Websites für KMU', en: 'Cung Solutions · Automations and websites for small businesses' }, desc: { de: 'Ich automatisiere Anfragen, Offerten und Termine für KMU im Aargau und baue Websites zum Fixpreis.', en: 'I automate enquiries, quotes and appointments for small businesses in Aargau and build websites at a fixed price.' } },
  automationen: { title: { de: 'Automationen · Cung Solutions', en: 'Automations · Cung Solutions' }, desc: { de: 'Verpasster Anruf, neue Anfrage, Termin-Erinnerung: Automationen für KMU, ab CHF 300 im Monat.', en: 'Missed call, new enquiry, appointment reminder: automations for small businesses.' } },
  websites: { title: { de: 'Websites zum Fixpreis · Cung Solutions', en: 'Websites at a fixed price · Cung Solutions' }, desc: { de: 'Stellen Sie Ihre Website selbst zusammen: Core, Pro und Zusätze zum Fixpreis.', en: 'Build your own website: Core, Pro and add-ons at a fixed price.' } },
  projekte: { title: { de: 'Projekte · Cung Solutions', en: 'Projects · Cung Solutions' }, desc: { de: 'Kundenprojekte und Konzeptentwürfe: Websites und Web-Apps für KMU.', en: 'Client projects and concept designs: websites and web apps for small businesses.' } },
  'ueber-mich': { title: { de: 'Über mich · Cung Solutions', en: 'About · Cung Solutions' }, desc: { de: 'Khang Cung, Ihr Ansprechpartner für Automationen, Websites und IT in Brugg.', en: 'Khang Cung, your contact for automations, websites and IT in Brugg.' } },
  faq: { title: { de: 'Häufige Fragen · Cung Solutions', en: 'FAQ · Cung Solutions' }, desc: { de: 'Antworten zu Preisen, Ablauf, Hosting und Automationen.', en: 'Answers on pricing, process, hosting and automations.' } },
  kontakt: { title: { de: 'Kontakt · Cung Solutions', en: 'Contact · Cung Solutions' }, desc: { de: 'Kostenloses Gespräch, 20 Minuten. Antwort innert 24 Stunden.', en: 'Free 20-minute call. Reply within 24 hours.' } },
};

const useNarrow = () => {
  const [narrow, setNarrow] = useState(() => window.matchMedia('(max-width: 900px)').matches);
  useEffect(() => {
    const m = window.matchMedia('(max-width: 900px)');
    const f = () => setNarrow(m.matches);
    m.addEventListener('change', f);
    return () => m.removeEventListener('change', f);
  }, []);
  return narrow;
};

export default function Nav({ page }: { page: Page }) {
  const t = useT();
  const { lang, setLang } = useContext(LangContext);
  const { mode, setMode } = useContext(ModeContext);
  const narrow = useNarrow();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const m = META[page];
    if (!m) return;
    document.title = t(m.title);
    document.querySelector('meta[name="description"]')?.setAttribute('content', t(m.desc));
  }, [page, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // One globe button toggles DE/EN, one sun/moon button toggles the colour mode (KGC).
  const other: Lang = lang === 'de' ? 'en' : 'de';
  const langSwitch = (
    <Button size="sm" variant="ghost" icon={ic(UI.globe)} label={t({ de: 'Sprache: auf Englisch wechseln', en: 'Language: switch to German' })}
      tooltip={t({ de: 'English', en: 'Deutsch' })} onClick={() => setLang(other)}>{lang.toUpperCase()}</Button>
  );
  const modeSwitch = (
    <IconButton size="sm" variant="ghost" icon={ic(mode === 'dark' ? UI.sun : UI.moon)}
      label={mode === 'dark' ? t({ de: 'Hellen Modus einschalten', en: 'Switch to light mode' }) : t({ de: 'Dunklen Modus einschalten', en: 'Switch to dark mode' })}
      tooltip={mode === 'dark' ? t({ de: 'Hell', en: 'Light' }) : t({ de: 'Dunkel', en: 'Dark' })}
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')} />
  );
  const contactLabel = t({ de: 'Kontakt', en: 'Contact' });

  return (
    <VStack
      as="header"
      data-astryx-media="dark"
      paddingInline={4}
      paddingBlock={2}
      // Black frosted glass bar in both themes (KGC); colorScheme makes the tokens inside resolve to dark.
      style={{ position: 'sticky', top: 0, zIndex: 20, colorScheme: 'dark', background: 'rgba(0,0,0,.72)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', borderBottom: '1px solid rgba(255,255,255,.08)' }}
    >
      <HStack hAlign="between" vAlign="center" gap={3} wrap="nowrap">
        <Button variant="ghost" href="#start" label="Cung Solutions" style={{ flexShrink: 0 }}>
          <Logo height={narrow ? 26 : 30} />
        </Button>
        {narrow ? (
          <Button icon={ic(UI.menu)} label={t({ de: 'Menü', en: 'Menu' })} onClick={() => setOpen(true)} />
        ) : (
          <HStack gap={1} vAlign="center">
            {LINKS.map(l => <Button key={l.id} variant={page === l.id ? "secondary" : "ghost"} size="sm" href={`#${l.id}`} label={t(l.label)} />)}
            {langSwitch}
            {modeSwitch}
            <Button size="sm" variant="primary" icon={ic(UI.mail)} label={contactLabel} href="#kontakt" />
          </HStack>
        )}
      </HStack>
      <Drawer isOpen={open && narrow} onOpenChange={setOpen} label={t({ de: 'Menü', en: 'Menu' })}>
        <VStack gap={2} padding={4}>
          {LINKS.map(l => <Button key={l.id} variant={page === l.id ? "secondary" : "ghost"} width="100%" href={`#${l.id}`} label={t(l.label)} onClick={() => setOpen(false)} />)}
          <Button variant="primary" width="100%" icon={ic(UI.mail)} label={contactLabel} href="#kontakt" onClick={() => setOpen(false)} />
          <HStack gap={1} hAlign="center">{langSwitch}{modeSwitch}</HStack>
        </VStack>
      </Drawer>
    </VStack>
  );
}
