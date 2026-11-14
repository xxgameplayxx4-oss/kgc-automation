import { useEffect, useState, useSyncExternalStore } from 'react';
import { HStack, VStack } from '@astryxdesign/core/Layout';
import { Text } from '@astryxdesign/core/Text';
import { Badge } from '@astryxdesign/core/Badge';
import { Card } from '@astryxdesign/core/Card';
import { SegmentedControl, SegmentedControlItem } from '@astryxdesign/core/SegmentedControl';
import { useT } from '../data';

type L = { de: string; en: string };
type Variant = 'info' | 'success' | 'warning' | 'neutral';
type Step = { from: L; text: L; badge?: { v: Variant; label: L }; rows?: [L, string][] };
type Flow = { id: string; tab: L; steps: Step[] };

const FLOWS: Flow[] = [
  { id: 'autopilot', tab: { de: 'Autopilot', en: 'Autopilot' }, steps: [
    { from: { de: 'Anruf 22:14', en: 'Call 22:14' }, text: { de: 'Verpasster Anruf, niemand erreichbar.', en: 'Missed call, nobody available.' }, badge: { v: 'warning', label: { de: 'Verpasst', en: 'Missed' } } },
    { from: { de: 'SMS, 22:15', en: 'SMS, 22:15' }, text: { de: 'Danke für Ihren Anruf! Hier können Sie zurückrufen oder direkt einen Termin buchen: kgc.ch/termin', en: 'Thanks for calling! Request a callback or book a slot here: kgc.ch/termin' }, badge: { v: 'info', label: { de: 'Innert 1 Minute', en: 'Within 1 minute' } } },
    { from: { de: 'Anfragen-Liste', en: 'Enquiry list' }, text: { de: 'Alles an einem Ort:', en: 'Everything in one place:' }, rows: [[{ de: 'Anruf 22:14', en: 'Call 22:14' }, '✓'], [{ de: 'WhatsApp 18:40', en: 'WhatsApp 18:40' }, '✓'], [{ de: 'Formular 16:02', en: 'Form 16:02' }, '✓']] },
  ] },
  { id: 'offerte', tab: { de: 'Offerte', en: 'Quote' }, steps: [
    { from: { de: 'WhatsApp', en: 'WhatsApp' }, text: { de: 'Sprachnachricht 0:24: «Badezimmer streichen, ca. 18 m2, zwei Anstriche.»', en: 'Voice message 0:24: "Paint the bathroom, about 18 m2, two coats."' } },
    { from: { de: 'Offerte, Entwurf', en: 'Quote, draft' }, text: { de: 'PDF mit Positionen:', en: 'PDF with line items:' }, badge: { v: 'neutral', label: { de: 'Entwurf', en: 'Draft' } }, rows: [[{ de: 'Vorbereiten, abdecken', en: 'Prep, covering' }, 'CHF 220'], [{ de: 'Anstrich 2x', en: 'Paint, 2 coats' }, 'CHF 640'], [{ de: 'Material', en: 'Materials' }, 'CHF 180']] },
    { from: { de: 'Ihre Freigabe', en: 'Your approval' }, text: { de: 'Ein Tipp auf «Freigeben», dann geht die Offerte raus.', en: 'One tap on "Approve" and the quote goes out.' }, badge: { v: 'success', label: { de: 'Freigegeben', en: 'Approved' } } },
    { from: { de: 'Nach 5 Tagen', en: 'After 5 days' }, text: { de: 'Freundliches Nachfassen: «Haben Sie noch Fragen zur Offerte?»', en: 'Friendly nudge: "Any questions about the quote?"' } },
  ] },
  { id: 'rapport', tab: { de: 'Rechnung', en: 'Invoice' }, steps: [
    { from: { de: 'WhatsApp', en: 'WhatsApp' }, text: { de: '«4 Std. + Material, Familie Meier»', en: '"4 hrs + materials, Meier family"' } },
    { from: { de: 'bexio, Entwurf', en: 'bexio, draft' }, text: { de: 'Rechnungsentwurf bereit:', en: 'Draft invoice ready:' }, badge: { v: 'neutral', label: { de: 'Entwurf', en: 'Draft' } }, rows: [[{ de: 'Arbeit 4 Std.', en: 'Labour 4 hrs' }, 'CHF 340'], [{ de: 'Material', en: 'Materials' }, 'CHF 95']] },
    { from: { de: 'Ihre Freigabe', en: 'Your approval' }, text: { de: 'Kurz prüfen, freigeben, versenden.', en: 'Quick check, approve, send.' }, badge: { v: 'success', label: { de: 'Versendet', en: 'Sent' } } },
  ] },
  { id: 'mahnwesen', tab: { de: 'Mahnwesen', en: 'Reminders' }, steps: [
    { from: { de: 'Rechnung 2041', en: 'Invoice 2041' }, text: { de: 'Seit 7 Tagen überfällig.', en: 'Overdue for 7 days.' }, badge: { v: 'warning', label: { de: 'Überfällig', en: 'Overdue' } } },
    { from: { de: 'E-Mail', en: 'Email' }, text: { de: 'Guten Tag, vielleicht ist unsere Rechnung untergegangen. Hier nochmals der Link zur Zahlung.', en: 'Hello, our invoice may have slipped through. Here is the payment link again.' } },
    { from: { de: 'Rechnung 2041', en: 'Invoice 2041' }, text: { de: 'Zahlung eingegangen.', en: 'Payment received.' }, badge: { v: 'success', label: { de: 'Bezahlt ✓', en: 'Paid ✓' } } },
  ] },
  { id: 'termine', tab: { de: 'Termine', en: 'Bookings' }, steps: [
    { from: { de: 'SMS, 24 Std. vorher', en: 'SMS, 24 h before' }, text: { de: 'Erinnerung: Ihr Termin morgen um 14:00.', en: 'Reminder: your appointment tomorrow at 14:00.' } },
    { from: { de: 'Antwort', en: 'Reply' }, text: { de: 'Ich muss leider absagen.', en: 'Sorry, I have to cancel.' }, badge: { v: 'warning', label: { de: 'Abgesagt', en: 'Cancelled' } } },
    { from: { de: 'Warteliste', en: 'Waiting list' }, text: { de: 'Morgen 14:00 ist frei geworden. Möchten Sie den Termin?', en: 'Tomorrow 14:00 just opened up. Would you like the slot?' }, badge: { v: 'success', label: { de: 'Platz vergeben', en: 'Slot filled' } } },
  ] },
  { id: 'bewertung', tab: { de: 'Bewertung', en: 'Review' }, steps: [
    { from: { de: 'Auftrag', en: 'Job' }, text: { de: 'Auftrag abgeschlossen.', en: 'Job completed.' }, badge: { v: 'success', label: { de: 'Erledigt', en: 'Done' } } },
    { from: { de: 'Nachricht', en: 'Message' }, text: { de: 'Danke für Ihr Vertrauen! Würden Sie uns kurz auf Google bewerten? Hier der Link.', en: 'Thank you! Would you leave us a quick Google review? Here is the link.' } },
    { from: { de: 'Google', en: 'Google' }, text: { de: '★★★★★', en: '★★★★★' }, badge: { v: 'info', label: { de: 'Neue Bewertung', en: 'New review' } } },
  ] },
];

const reduceQuery = '(prefers-reduced-motion: reduce)';
const useReducedMotion = () => useSyncExternalStore(
  cb => { const m = window.matchMedia(reduceQuery); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb); },
  () => window.matchMedia(reduceQuery).matches,
  () => false,
);

const TICK = 1600; // ms per step; up to 4 steps plus 2 hold ticks gives a loop of about 8 to 10 s

export default function WorkflowPreviews() {
  const t = useT();
  const reduce = useReducedMotion();
  const [id, setId] = useState(FLOWS[0].id);
  const [n, setN] = useState(0);
  const flow = FLOWS.find(f => f.id === id)!;
  const len = flow.steps.length;

  useEffect(() => {
    if (reduce) return;
    setN(0);
    const h = setInterval(() => setN(v => (v >= len + 2 ? 0 : v + 1)), TICK);
    return () => clearInterval(h);
  }, [id, len, reduce]);

  return (
    <VStack gap={3} style={{ minWidth: 0 }}>
      <VStack style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <SegmentedControl label={t({ de: 'Workflow wählen', en: 'Choose a workflow' })} value={id} onChange={setId}>
          {FLOWS.map(f => <SegmentedControlItem key={f.id} value={f.id} label={t(f.tab)} />)}
        </SegmentedControl>
      </VStack>
      <VStack gap={2} style={{ minWidth: 0 }}>
        {flow.steps.map((s, i) => {
          const on = reduce || i < n;
          return (
            <Card key={`${id}-${i}`} variant="muted" padding={3}>
              <VStack gap={1.5} style={{
                opacity: on ? 1 : 0,
                transform: on ? 'none' : 'translateY(var(--spacing-2))',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                minWidth: 0,
              }}>
                <HStack justify="between" align="center" gap={2}>
                  <Text size="sm" color="secondary" weight="medium">{`${i + 1}. ${t(s.from)}`}</Text>
                  {s.badge && <Badge variant={s.badge.v} label={t(s.badge.label)} />}
                </HStack>
                <Text style={{ overflowWrap: 'anywhere' }}>{t(s.text)}</Text>
                {s.rows?.map(([k, v], j) => (
                  <HStack key={j} justify="between" gap={2}>
                    <Text size="sm">{t(k)}</Text>
                    <Text size="sm" weight="medium" hasTabularNumbers>{v}</Text>
                  </HStack>
                ))}
              </VStack>
            </Card>
          );
        })}
      </VStack>
    </VStack>
  );
}
