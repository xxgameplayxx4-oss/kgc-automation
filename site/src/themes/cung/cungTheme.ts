// Cung Solutions brand theme: neutral + one amber accent + Fraunces headlines.
// After editing: npx astryx theme build src/themes/cung/cungTheme.ts
import { defineTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral';

const INK = '#1F1607'; // text on amber fills, both modes
const SANS = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const cungTheme = defineTheme({
  name: 'cung',
  extends: neutralTheme,

  // typography replaces the base config whole, so scale/body/code are restated from neutral.
  typography: {
    scale: { base: 14, ratio: 1.2 },
    body: { family: 'Figtree', fallbacks: SANS },
    heading: { family: 'Fraunces', fallbacks: 'Georgia, "Times New Roman", serif', weights: { 3: 'semibold', 4: 'semibold' } },
    code: { family: 'ui-monospace', fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace' },
  },

  // [light, dark]. Contrast ratios are listed in the commit message.
  tokens: {
    '--color-accent': ['#C8860D', '#E9B44C'],
    '--color-on-accent': INK,
    '--color-accent-muted': ['#F6E3B8', '#4A3A14'],
    '--color-text-accent': ['#8A5A00', '#EDBE62'],
    '--color-icon-accent': ['#8A5A00', '#EDBE62'],
    // "yellow" category variant (Pro card, Empfohlen badge) re-pointed to the brand amber.
    '--color-background-yellow': ['#FBF1D9', '#3A2D10'],
    '--color-border-yellow': ['#E9CF95', '#8A6A1F'],
    '--color-text-yellow': ['#6B4500', '#EDBE62'],
    '--color-icon-yellow': ['#6B4500', '#EDBE62'],
  },
});
