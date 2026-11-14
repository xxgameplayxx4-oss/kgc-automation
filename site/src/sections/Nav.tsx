import { useContext, useEffect, useState } from 'react';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Button } from '@astryxdesign/core/Button';
import { Drawer } from '@astryxdesign/core/Drawer';
import { LangContext, useT, type Lang } from '../data';
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
  const narrow = useNarrow();
  const [open, setOpen] = useState(false);

  const langSwitch = (['de', 'en'] as Lang[]).map(l => (
    <Button key={l} size="sm" label={l.toUpperCase()} variant={lang === l ? 'secondary' : 'ghost'} onClick={() => setLang(l)} />
  ));
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
          <Button size="sm" label={t({ de: 'Menü', en: 'Menu' })} onClick={() => setOpen(true)} />
        ) : (
          <HStack gap={1} vAlign="center">
            {LINKS.map(l => <Button key={l.id} variant={page === l.id ? "secondary" : "ghost"} size="sm" href={`#${l.id}`} label={t(l.label)} />)}
            {langSwitch}
            <Button size="sm" variant="primary" label={contactLabel} href="#kontakt" style={{ background: "var(--color-accent)", color: "var(--color-on-accent)" }} />
          </HStack>
        )}
      </HStack>
      <Drawer isOpen={open && narrow} onOpenChange={setOpen} label={t({ de: 'Menü', en: 'Menu' })}>
        <VStack gap={2} padding={4}>
          {LINKS.map(l => <Button key={l.id} variant={page === l.id ? "secondary" : "ghost"} width="100%" href={`#${l.id}`} label={t(l.label)} onClick={() => setOpen(false)} />)}
          <Button variant="primary" width="100%" label={contactLabel} href="#kontakt" onClick={() => setOpen(false)} />
          <HStack gap={1} hAlign="center">{langSwitch}</HStack>
        </VStack>
      </Drawer>
    </VStack>
  );
}
