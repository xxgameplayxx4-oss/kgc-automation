import { Card } from '@astryxdesign/core/Card';
import { Stack } from '@astryxdesign/core/Stack';
import { Text } from '@astryxdesign/core/Text';
import { useT } from '../data';

// WhatsApp's own colours, fixed in both site themes because the chat mimics the app.
const WA = { head: '#075e54', bg: '#ece5dd', mine: '#dcf8c6', theirs: '#ffffff', ink: '#111b21', soft: '#667781' };

export type Msg = { from: 'agent' | 'customer'; text: string; time: string };

/** A small WhatsApp conversation: the agent's instant reply to a new enquiry, plus an optional follow-up. */
export default function WhatsAppChat({ business, msgs, m }: { business: string; msgs: Msg[]; m?: Record<string, string> }) {
  const t = useT();
  return (
    <Card {...m} padding={0} elevation="med" style={{ overflow: 'hidden', maxWidth: '24rem' }}>
      <Stack>
        <Stack direction="horizontal" gap={1.5} align="center" paddingInline={3} paddingBlock={2} style={{ background: WA.head, color: 'white' }}>
          <Stack align="center" justify="center" style={{ width: '2rem', height: '2rem', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,.2)', flexShrink: 0 }}>
            <Text color="inherit" weight="bold" size="sm">{business.slice(0, 1)}</Text>
          </Stack>
          <Stack gap={0}>
            <Text color="inherit" size="sm" weight="semibold">{business}</Text>
            <Text color="inherit" size="xsm" style={{ opacity: 0.8 }}>{t({ de: 'Automatische Antwort · online', en: 'Automatic reply · online' })}</Text>
          </Stack>
        </Stack>
        <Stack gap={1.5} padding={2} style={{ background: WA.bg }}>
          {msgs.map((x, i) => (
            <Stack key={i} data-pop="" style={{
              alignSelf: x.from === 'agent' ? 'flex-start' : 'flex-end', maxWidth: '85%',
              background: x.from === 'agent' ? WA.theirs : WA.mine, color: WA.ink,
              padding: '0.5rem 0.65rem', borderRadius: 'var(--radius-element)', boxShadow: '0 1px 1px rgba(0,0,0,.12)',
              animationDelay: `${i * 0.6}s`,
            }}>
              <Text size="sm" color="inherit" style={{ whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>{x.text}</Text>
              <Text size="xsm" color="inherit" style={{ alignSelf: 'flex-end', color: WA.soft, fontSize: '0.65rem' }}>{x.time}{x.from === 'customer' ? '' : ' ✓✓'}</Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
