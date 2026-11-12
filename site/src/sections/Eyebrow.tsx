import type { ReactNode } from 'react';
import { Text } from '@astryxdesign/core/Text';

/** Small accent label above a section heading. */
export default function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <Text type="label" color="accent" weight="semibold" style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
      {children}
    </Text>
  );
}
