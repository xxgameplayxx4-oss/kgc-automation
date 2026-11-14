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
    // Dark: Black, graphite, Orange #FCA311. Light (KGC palette): Black #080708, Pale Slate #B2B6BD, White Smoke #F7F4F3, School Bus Yellow #FDC600.
    '--color-accent': ['#FDC600', '#FCA311'],
    '--color-on-accent': '#000000',
    '--color-accent-muted': ['#FFF1B8', '#3A2E14'],
    // Yellow text fails contrast on light backgrounds, so light mode uses black for accent text.
    '--color-text-accent': ['#080708', '#FCA311'],
    '--color-icon-accent': ['#080708', '#FCA311'],
    '--color-background-body': ['#F7F4F3', '#000000'],
    '--color-background-surface': ['#FFFFFF', '#161616'],
    '--color-background-card': ['#FFFFFF', '#161616'],
    '--color-background-popover': ['#FFFFFF', '#161616'],
    '--color-background-muted': ['#ECE8E6', '#0D0D0D'],
    '--color-text-primary': ['#080708', '#FFFFFF'],
    '--color-text-secondary': ['#45474D', '#E5E5E5'],
    '--color-border': ['#08070824', '#E5E5E526'],
    '--color-border-emphasized': ['#B2B6BD', '#3A3A3A'],
    // "yellow" category variant (Pro card, Beliebt badge) re-pointed to the orange.
    '--color-background-yellow': ['#FFF6CC', '#1F1A10'],
    '--color-border-yellow': ['#FDC600', '#FCA311'],
    '--color-text-yellow': ['#080708', '#FCA311'],
    '--color-icon-yellow': ['#080708', '#FCA311'],
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
        backgroundColor: 'light-dark(rgba(8,7,8,.82), rgba(255,255,255,.08))',
        color: '#FFFFFF',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,.18), inset 0 0 0 1px rgba(255,255,255,.1), 0 4px 16px -4px rgba(0,0,0,.35)',
      },
    },
  },
});
