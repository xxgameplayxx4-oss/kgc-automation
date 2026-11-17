import type { ComponentType, ReactNode, SVGProps } from 'react';
import { Grid } from '@astryxdesign/core/Grid';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Heading, Text } from '@astryxdesign/core/Text';
import { Card } from '@astryxdesign/core/Card';
import { Icon } from '@astryxdesign/core/Icon';
import Eyebrow from './Eyebrow';
import { UI } from './uiIcons';
import { usePhone } from './usePhone';
import { useT, type T } from '../data';

// Shared visual building blocks (2026-11-18 restructure): every page uses these instead of paragraphs and bullet lists.
export type Glyph = ComponentType<SVGProps<SVGSVGElement>>;
const mk = (d: string): Glyph => props => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}><path d={d} /></svg>
);
/** Extra glyphs for diagrams; button glyphs stay in uiIcons. */
export const VIZ = {
  bolt: mk('M13 2L4 14h7l-1 8 9-12h-7z'),
  clock: mk('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 6v6l4 2'),
  check: mk('M20 6L9 17l-5-5'),
  star: mk('M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8-6.2-3.2L5.8 21 7 14.2 2 9.3l6.9-1z'),
  inbox: mk('M22 12h-6l-2 3h-4l-2-3H2M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z'),
  screen: mk('M3 4h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM8 21h8M12 17v4'),
  coin: mk('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM15 9.5a3 3 0 1 0 0 5M8 11h5M8 13h5'),
  pin: mk('M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 7.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z'),
  lock: mk('M6 11h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2zM8 11V7a4 4 0 0 1 8 0v4'),
  chart: mk('M4 20V10M10 20V4M16 20v-8M22 20H2'),
  brush: mk('M18 3l3 3-9.5 9.5-3.5.5.5-3.5zM7 17c-2 0-3 1.5-3 4 2.5 0 4-1 4-3'),
  rocket: mk('M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 13l2 2c5-2 9-6 10-12-6 1-10 5-12 10zM9 13H5l2-4h4M11 15v4l4-2v-4'),
} satisfies Record<string, Glyph>;

const wrap = { marginInline: 'auto', width: '100%' } as const;

/** Standard page section: 1200 wide, same padding everywhere. */
export function Block({ id, children, gap = 6 }: { id?: string; children: ReactNode; gap?: 4 | 6 | 8 | 10 }) {
  return <VStack id={id} as="section" gap={gap} paddingInline={4} paddingBlock={10} maxWidth={1200} style={wrap}>{children}</VStack>;
}

/** Eyebrow + heading + at most one short line. `level={1}` for the page title. */
export function SectionHead({ eyebrow, title, sub, level = 2, center = false }: { eyebrow?: T; title: T; sub?: T; level?: 1 | 2; center?: boolean }) {
  const t = useT();
  return (
    <VStack gap={2} maxWidth={760} hAlign={center ? 'center' : undefined} style={center ? { marginInline: 'auto' } : undefined}>
      {eyebrow && <Eyebrow>{t(eyebrow)}</Eyebrow>}
      <Heading level={level} type={level === 1 ? 'display-2' : 'display-3'} justify={center ? 'center' : undefined} textWrap="balance">{t(title)}</Heading>
      {sub && <Text color="secondary" justify={center ? 'center' : undefined} textWrap="pretty">{t(sub)}</Text>}
    </VStack>
  );
}

/** Round accent badge holding an icon (or a step number). */
export function Dot({ icon, n, accent = true }: { icon?: Glyph; n?: number; accent?: boolean }) {
  return (
    <HStack hAlign="center" vAlign="center" style={{
      width: '2.75rem', height: '2.75rem', flexShrink: 0, borderRadius: '50%',
      background: accent ? 'var(--color-background-yellow)' : 'var(--color-background-muted)',
      border: '1px solid var(--color-border)',
    }}>
      {icon ? <Icon icon={icon} size="md" color={accent ? 'accent' : 'secondary'} /> : <Text weight="semibold" color="accent" hasTabularNumbers>{n}</Text>}
    </HStack>
  );
}

export type FlowStep = { icon?: Glyph; title: T; text?: T; accent?: boolean };
/** Step diagram: nodes joined by arrows. A row on wide screens, a column on phones. Keep to 3–5 steps, titles ≤ 3 words. */
export function Flow({ steps, numbered = false }: { steps: FlowStep[]; numbered?: boolean }) {
  const t = useT();
  const phone = usePhone();
  const Dir = phone ? VStack : HStack;
  return (
    <Dir gap={phone ? 1.5 : 2} wrap="nowrap" width="100%" style={{ alignItems: 'stretch' }}>
      {steps.map((s, i) => (
        <Dir key={s.title.de} gap={phone ? 1.5 : 2} vAlign="center" hAlign={phone ? 'center' : undefined} wrap="nowrap" style={{ flex: '1 1 0', minWidth: 0 }}>
          {i > 0 && <Icon icon={UI.arrow} size="md" color="accent" className={phone ? 'viz-down' : undefined} />}
          <Card variant={s.accent ? 'yellow' : 'muted'} padding={4} style={{ flex: '1 1 0', minWidth: 0, width: phone ? '100%' : undefined, height: phone ? undefined : '100%' }}>
            <Dir gap={3} vAlign={phone ? 'center' : undefined} hAlign={phone ? undefined : 'start'} wrap="nowrap">
              <Dot icon={s.icon} n={numbered || !s.icon ? i + 1 : undefined} accent={!s.accent} />
              <VStack gap={0.5} style={{ minWidth: 0 }}>
                <Text weight="semibold">{t(s.title)}</Text>
                {s.text && <Text size="sm" color="secondary">{t(s.text)}</Text>}
              </VStack>
            </Dir>
          </Card>
        </Dir>
      ))}
    </Dir>
  );
}

/** Big number with a short caption, e.g. value "41 s", label "bis zur Antwort". */
export function Stat({ value, label }: { value: string; label: T }) {
  const t = useT();
  return (
    <VStack gap={0.5}>
      <Text weight="semibold" color="accent" hasTabularNumbers style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', lineHeight: 1.1, fontFamily: 'var(--font-family-heading, inherit)' }}>{value}</Text>
      <Text size="sm" color="secondary">{t(label)}</Text>
    </VStack>
  );
}
export function Stats({ items }: { items: { value: string; label: T }[] }) {
  const phone = usePhone();
  return <Grid columns={phone ? 2 : { minWidth: 160, max: 4 }} gap={phone ? 4 : 6}>{items.map(s => <Stat key={s.label.de} {...s} />)}</Grid>;
}

/** Row of small icon + label facts; replaces "trust" sentences and bullet lists. Labels ≤ 4 words. */
export function Chips({ items, center = false }: { items: { icon: Glyph; label: T }[]; center?: boolean }) {
  const t = useT();
  return (
    <HStack gap={2} wrap="wrap" hAlign={center ? 'center' : undefined}>
      {items.map(c => (
        <HStack key={c.label.de} gap={1.5} vAlign="center" paddingInline={3} paddingBlock={1.5} style={{ borderRadius: '999px', border: '1px solid var(--color-border)', background: 'var(--color-background-muted)' }}>
          <Icon icon={c.icon} size="sm" color="accent" />
          <Text size="sm">{t(c.label)}</Text>
        </HStack>
      ))}
    </HStack>
  );
}

/** Icon tile: icon on top, title, optional one line. For grids of 3–6 items instead of text cards. */
export function Tile({ icon, title, text, children }: { icon: Glyph; title: T; text?: T; children?: ReactNode }) {
  const t = useT();
  const phone = usePhone();
  return (
    <Card variant="muted" padding={phone ? 3 : 4}>
      <VStack gap={2}>
        <Dot icon={icon} />
        <Text weight="semibold">{t(title)}</Text>
        {text && !phone && <Text size="sm" color="secondary">{t(text)}</Text>}
        {children}
      </VStack>
    </Card>
  );
}

/** Horizontal bars comparing a few values (e.g. before/after minutes). `value` is relative to the largest. */
export function Bars({ items, unit = '' }: { items: { label: T; value: number; accent?: boolean; display?: string }[]; unit?: string }) {
  const t = useT();
  const max = Math.max(...items.map(i => i.value));
  return (
    <VStack gap={3} width="100%">
      {items.map(b => (
        <VStack key={b.label.de} gap={1}>
          <HStack hAlign="between" gap={3}>
            <Text size="sm">{t(b.label)}</Text>
            <Text size="sm" weight="semibold" color={b.accent ? 'accent' : 'secondary'} hasTabularNumbers>{b.display ?? `${b.value}${unit}`}</Text>
          </HStack>
          <HStack style={{ height: '0.625rem', borderRadius: '999px', background: 'var(--color-background-muted)', overflow: 'hidden' }}>
            <HStack style={{ width: `${Math.max(2, (b.value / max) * 100)}%`, borderRadius: '999px', background: b.accent ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}>{null}</HStack>
          </HStack>
        </VStack>
      ))}
    </VStack>
  );
}
