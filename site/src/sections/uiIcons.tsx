import type { ComponentType, SVGProps } from 'react';
import { Icon } from '@astryxdesign/core/Icon';

// Outline UI glyphs (24px grid, lucide style) for buttons across the site; Icon handles size and colour.
type G = ComponentType<SVGProps<SVGSVGElement>>;
const mk = (d: string): G => props => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}><path d={d} /></svg>
);

export const UI = {
  globe: mk('M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20'),
  sun: mk('M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4'),
  moon: mk('M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z'),
  calendar: mk('M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z'),
  send: mk('M22 2L11 13M22 2l-7 20-4-9-9-4z'),
  mail: mk('M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6'),
  arrow: mk('M5 12h14M13 5l7 7-7 7'),
  back: mk('M19 12H5M11 19l-7-7 7-7'),
  external: mk('M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3'),
  eye: mk('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z'),
  play: mk('M6 4l14 8-14 8z'),
  pause: mk('M7 4h3v16H7zM14 4h3v16h-3z'),
  retry: mk('M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5'),
  menu: mk('M3 6h18M3 12h18M3 18h18'),
  chat: mk('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'),
  phone: mk('M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z'),
  plus: mk('M12 5v14M5 12h14'),
  doc: mk('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6'),
  shield: mk('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'),
  cc: mk('M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM10.5 10.2a2.2 2.2 0 1 0 0 3.6M17 10.2a2.2 2.2 0 1 0 0 3.6'),
  user: mk('M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z'),
} satisfies Record<string, G>;

/** Shorthand for a Button's `icon` prop. */
export const ic = (g: G) => <Icon icon={g} />;
