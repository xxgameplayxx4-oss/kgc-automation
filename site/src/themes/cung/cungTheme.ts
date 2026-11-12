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
    // "Epic settings": layered contact + ambient shadows, so surfaces sit in real light.
    '--shadow-low': '0 1px 1px light-dark(rgba(31,22,7,.06), rgba(0,0,0,.45)), 0 4px 12px -2px light-dark(rgba(31,22,7,.08), rgba(0,0,0,.45)), inset 0 1px 0 light-dark(rgba(255,255,255,.7), rgba(255,255,255,.05))',
    '--shadow-med': '0 1px 2px light-dark(rgba(31,22,7,.08), rgba(0,0,0,.5)), 0 8px 24px -6px light-dark(rgba(31,22,7,.14), rgba(0,0,0,.55)), 0 24px 48px -16px light-dark(rgba(31,22,7,.12), rgba(0,0,0,.6)), inset 0 1px 0 light-dark(rgba(255,255,255,.7), rgba(255,255,255,.06))',
    '--shadow-high': '0 2px 4px light-dark(rgba(31,22,7,.08), rgba(0,0,0,.5)), 0 16px 40px -8px light-dark(rgba(31,22,7,.2), rgba(0,0,0,.6)), 0 40px 80px -24px light-dark(rgba(31,22,7,.18), rgba(0,0,0,.7)), inset 0 1px 0 light-dark(rgba(255,255,255,.8), rgba(255,255,255,.08))',
  },

  components: {
    // Soft top-lit sheen on every surface.
    card: {
      base: { backgroundImage: 'linear-gradient(180deg, light-dark(rgba(255,255,255,.55), rgba(255,255,255,.035)), transparent 45%)' },
      // The recommended (Pro) card glows like a lit object.
      'variant:yellow': { boxShadow: '0 0 0 1px rgba(233,180,76,.35), 0 20px 60px -20px rgba(233,180,76,.45), 0 40px 100px -40px rgba(200,134,13,.5), inset 0 1px 0 rgba(255,255,255,.12)' },
    },
    // Primary buttons: lit from above, with a warm amber glow.
    button: {
      'variant:primary': {
        backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,.28), rgba(255,255,255,0) 60%)',
        boxShadow: '0 1px 0 rgba(255,255,255,.35) inset, 0 -1px 0 rgba(0,0,0,.12) inset, 0 6px 18px -6px rgba(233,180,76,.65), 0 2px 4px rgba(0,0,0,.18)',
      },
    },
  },
});
