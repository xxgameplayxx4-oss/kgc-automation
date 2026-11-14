// Booking -> WhatsApp auto-reply (Anfragen-Autopilot). One config value; empty = preview mode, no network call.
export const AUTOPILOT_URL = ''; // e.g. 'http://localhost:5678' on the laptop, later the hosted URL

export type Buchung = { name: string; telefon: string; email: string; termin_art: string; datum: string /*YYYY-MM-DD*/; uhrzeit: string /*HH:MM*/; bemerkung: string };

export async function sendBuchung(b: Buchung): Promise<'sent' | 'preview' | 'error'> {
  if (!AUTOPILOT_URL) return 'preview';
  try {
    const r = await fetch(`${AUTOPILOT_URL}/webhook/buchung`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(b) });
    return r.ok ? 'sent' : 'error';
  } catch {
    return 'error';
  }
}
