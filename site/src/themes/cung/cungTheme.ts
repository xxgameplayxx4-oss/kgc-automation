// Cung Solutions brand theme: neutral + one amber accent, Bricolage Grotesque headlines, JetBrains Mono for times and data (2026-11-16 redesign).
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
    heading: { family: 'Bricolage Grotesque', fallbacks: SANS, weights: { 1: 'bold', 2: 'bold', 3: 'semibold', 4: 'semibold' } },
    code: { family: 'JetBrains Mono', fallbacks: '"SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace' },
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
    // Flat design (KGC): surfaces are separated by a hairline, not by light. Only the high level keeps a faint drop for floating things (dialogs, device mockups).
    '--shadow-low': '0 0 0 1px var(--color-border)',
    '--shadow-med': '0 0 0 1px var(--color-border)',
    '--shadow-high': '0 0 0 1px var(--color-border), 0 12px 32px -12px rgba(0,0,0,.45)',
  },

  components: {
    // Flat surfaces (KGC): no sheen.
    card: {
      base: {},
      // The recommended (Pro) card is marked by a solid accent outline, not a glow (flat design).
      'variant:yellow': { boxShadow: '0 0 0 2px var(--color-accent)' },
    },
    // Primary buttons: flat.
    button: {
      'variant:primary': { boxShadow: 'none' },
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
