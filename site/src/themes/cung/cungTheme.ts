// Cung Solutions brand theme: neutral + one amber accent + Fraunces headlines.
// After editing: npx astryx theme build src/themes/cung/cungTheme.ts
import { defineTheme } from '@astryxdesign/core/theme';
import { neutralTheme } from '@astryxdesign/theme-neutral';

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
    // KGC palette: Black, Prussian Blue #14213D, Orange #FCA311, Alabaster #E5E5E5, White.
    '--color-accent': '#FCA311',
    '--color-on-accent': '#000000',
    '--color-accent-muted': ['#FDE7C2', '#3A2E14'],
    // Orange text fails contrast on white, so light mode uses Prussian Blue for accent text.
    '--color-text-accent': ['#14213D', '#FCA311'],
    '--color-icon-accent': ['#14213D', '#FCA311'],
    '--color-background-body': ['#E5E5E5', '#000000'],
    '--color-background-surface': ['#FFFFFF', '#14213D'],
    '--color-background-card': ['#FFFFFF', '#14213D'],
    '--color-background-popover': ['#FFFFFF', '#14213D'],
    '--color-background-muted': ['#E5E5E5', '#0B1426'],
    '--color-text-primary': ['#000000', '#FFFFFF'],
    '--color-text-secondary': ['#3B4252', '#E5E5E5'],
    '--color-border': ['#14213D1F', '#E5E5E526'],
    '--color-border-emphasized': ['#C9CCD3', '#3A4A6B'],
    // "yellow" category variant (Pro card, Beliebt badge) re-pointed to the orange.
    '--color-background-yellow': ['#FFF4E0', '#1C2A4A'],
    '--color-border-yellow': ['#FCA311', '#FCA311'],
    '--color-text-yellow': ['#14213D', '#FCA311'],
    '--color-icon-yellow': ['#14213D', '#FCA311'],
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
      'variant:yellow': { boxShadow: '0 0 0 1px rgba(252,163,17,.35), 0 20px 60px -20px rgba(252,163,17,.45), 0 40px 100px -40px rgba(252,163,17,.5), inset 0 1px 0 rgba(255,255,255,.12)' },
    },
    // Primary buttons: flat and quiet, only a soft contact shadow.
    button: {
      'variant:primary': { boxShadow: '0 1px 2px rgba(0,0,0,.15)' },
      // KGC: dark buttons as Apple-style frosted glass.
      'variant:secondary': {
        backgroundColor: 'light-dark(rgba(20,33,61,.82), rgba(255,255,255,.08))',
        color: '#FFFFFF',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18), inset 0 0 0 1px rgba(255,255,255,.1), 0 4px 16px -4px rgba(0,0,0,.35)',
      },
    },
  },
});
