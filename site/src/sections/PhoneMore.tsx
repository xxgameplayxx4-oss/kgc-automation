import { useState, type ReactNode } from 'react';
import { HStack } from '@astryxdesign/core/Layout';
import { Button } from '@astryxdesign/core/Button';
import { useT } from '../data';
import { usePhone } from './usePhone';

/** On phones shows the first `limit` items plus a "show all" toggle; wider screens show everything. */
export default function PhoneMore<I>({ items, limit = 4, children }: { items: readonly I[]; limit?: number; children: (shown: readonly I[]) => ReactNode }) {
  const t = useT();
  const phone = usePhone();
  const [open, setOpen] = useState(false);
  const more = phone && items.length > limit;
  return (
    <>
      {children(more && !open ? items.slice(0, limit) : items)}
      {more && (
        <HStack>
          <Button variant="ghost" size="sm" aria-expanded={open} onClick={() => setOpen(o => !o)}
            label={open ? t({ de: 'Weniger anzeigen', en: 'Show less' }) : t({ de: `Alle ${items.length} anzeigen`, en: `Show all ${items.length}` })} />
        </HStack>
      )}
    </>
  );
}
