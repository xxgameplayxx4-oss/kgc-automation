# Booking → WhatsApp auto-reply (webhook spec)

The booking funnel on the website sends every completed booking to the Anfragen-Autopilot, which answers the customer on WhatsApp.

## Config

One value in `src/autopilot.ts`:

```ts
export const AUTOPILOT_URL = '';  // empty = preview mode, no network call
```

- Laptop: `http://localhost:5678`
- Live: the hosted Autopilot URL (e.g. Railway EU), once it is running

## Request

`POST {AUTOPILOT_URL}/webhook/buchung` with `Content-Type: application/json`. CORS is open on the Autopilot side.

```json
{
  "name": "Anna Muster",
  "telefon": "+41 79 123 45 67",
  "email": "anna@example.ch",
  "termin_art": "Beratung",
  "datum": "2026-11-20",
  "uhrzeit": "14:30",
  "bemerkung": ""
}
```

Name, phone and e-mail are required in the form. `datum` is YYYY-MM-DD and `uhrzeit` is HH:MM.

## Behaviour

- The success screen always shows, whether or not the call works. Errors are only logged.
- With an empty `AUTOPILOT_URL`, the site shows a mock WhatsApp reply instead of calling anything.
