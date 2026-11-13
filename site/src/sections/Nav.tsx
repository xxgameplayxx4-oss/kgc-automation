import { useContext, useEffect, useState } from 'react';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { Button } from '@astryxdesign/core/Button';
import { Drawer } from '@astryxdesign/core/Drawer';
import { LangContext, mailto, useT, type Lang } from '../data';
import type { Page } from '../App';

const LINKS: { id: Page; label: { de: string; en: string } }[] = [
  { id: 'start', label: { de: 'Start', en: 'Home' } },
  { id: 'leistungen', label: { de: 'Leistungen', en: 'Services' } },
  { id: 'projekte', label: { de: 'Projekte', en: 'Projects' } },
  { id: 'ueber-mich', label: { de: 'Über mich', en: 'About' } },
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
    <Button key={l} size="sm" label={l.toUpperCase()} variant={lang === l ? 'primary' : 'ghost'} onClick={() => setLang(l)} />
  ));
  const contactLabel = t({ de: 'Kontakt', en: 'Contact' });

  return (
    <VStack
      as="header"
      paddingInline={4}
      paddingBlock={2}
      style={{ position: 'sticky', top: 0, zIndex: 20, background: 'color-mix(in oklab, var(--color-background-surface) 72%, transparent)', backdropFilter: 'blur(18px) saturate(1.5)', WebkitBackdropFilter: 'blur(18px) saturate(1.5)', borderBottom: '1px solid color-mix(in oklab, var(--color-text-primary) 8%, transparent)' }}
    >
      <HStack hAlign="between" vAlign="center" gap={3} wrap="nowrap">
        <Button variant="ghost" href="#start" label="Cung Solutions">
          <Text weight="bold" type="large">Cung Solutions</Text>
        </Button>
        {narrow ? (
          <HStack gap={1} vAlign="center">
            {langSwitch}
            <Button size="sm" label={t({ de: 'Menü', en: 'Menu' })} onClick={() => setOpen(true)} />
          </HStack>
        ) : (
          <HStack gap={1} vAlign="center">
            {LINKS.map(l => <Button key={l.id} variant={page === l.id ? "secondary" : "ghost"} size="sm" href={`#${l.id}`} label={t(l.label)} />)}
            {langSwitch}
            <Button size="sm" variant="primary" label={contactLabel} href={mailto('Anfrage Website')} />
          </HStack>
        )}
      </HStack>
      <Drawer isOpen={open && narrow} onOpenChange={setOpen} label={t({ de: 'Menü', en: 'Menu' })}>
        <VStack gap={2} padding={4}>
          {LINKS.map(l => <Button key={l.id} variant={page === l.id ? "secondary" : "ghost"} width="100%" href={`#${l.id}`} label={t(l.label)} onClick={() => setOpen(false)} />)}
          <Button variant="primary" width="100%" label={contactLabel} href={mailto('Anfrage Website')} />
        </VStack>
      </Drawer>
    </VStack>
  );
}
