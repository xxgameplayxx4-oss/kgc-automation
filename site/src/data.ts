// Single source for prices and copy shared across sections. Prices in CHF.
import { createContext, useContext } from 'react';

export type Lang = 'de' | 'en';
export type T = { de: string; en: string };
export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'de', setLang: () => {} });
export const useT = () => {
  const { lang } = useContext(LangContext);
  return (s: T) => s[lang];
};

export const CONTACT_EMAIL = 'khang@cung-solutions.ch';
export const chf = (n: number) => 'CHF ' + n.toLocaleString('de-CH').replace(/[’']/g, "'");
export const mailto = (subject: string, body = '') =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
// The configurator leaves its summary here before sending the visitor to the contact page.
export const contactDraft = { subject: '', body: '' };
export const CONTACT_EVENT = 'cung-contact';
/** Every #kontakt button calls this: sets a fresh subject/body (never stale) and tells an already-open contact form. */
export const openContact = (subject = 'Anfrage', body = '') => {
  contactDraft.subject = subject;
  contactDraft.body = body;
  window.dispatchEvent(new Event(CONTACT_EVENT));
};
export const PHONE = '+41 76 330 79 11';

export type TierId = 'core' | 'pro';
export type Tier = { id: TierId; price: number; name: T; tagline: T; includes: string[] };

const BASE_FEATURES: T[] = [
  { de: 'One-Pager mit Navigation und Mobile-Ansicht', en: 'One-pager with navigation and mobile view' },
  { de: 'Sektionen: Start, Über uns, Leistungen, Galerie, Bewertungen, Öffnungszeiten, Karte, Kontakt', en: 'Sections: home, about, services, gallery, reviews, opening hours, map, contact' },
  { de: 'Klick-zum-Anrufen und Google-Maps-Link', en: 'Tap-to-call and Google Maps link' },
  { de: 'Impressum und Datenschutz nach Schweizer Recht (nDSG)', en: 'Legal notice and privacy policy under Swiss law (nDSG)' },
  { de: 'SEO-Grundlagen: Titel, Beschreibung, Google-Vorschau, Sitemap', en: 'SEO basics: titles, descriptions, Google preview, sitemap' },
  { de: 'Schnelle Ladezeit, SSL-Zertifikat (https)', en: 'Fast loading, SSL certificate (https)' },
  { de: 'Domain verbinden und Hosting einrichten', en: 'Domain connected and hosting set up' },
  { de: 'Eine Korrekturrunde inklusive', en: 'One round of revisions included' },
];
export { BASE_FEATURES };

// Fixed website prices (KGC, 2026-11-14): Core 2'000, Pro 3'000. Upgrade of an existing site from 750.
export const CORE_PRICE = 2000;
export const PRO_PRICE = 3000;
/** Lowest new-website price, for teasers. */
export const BASE_PRICE = CORE_PRICE;
// Redo of an existing site: content already exists, so less back and forth (KGC, 2026-11-14).
export const UPGRADE_PRICE = 750;
// Anfragen-Autopilot: monthly only, no setup fee (KGC, 2026-11-14).
export const AUTOPILOT_MONTHLY = 200;
// Automation Add-on for businesses that only want automations, monthly (KGC, 2026-11-14).
export const AUTOMATION_MONTHLY = 300;

/** Website features. Each package includes a fixed set; nothing is priced one by one. */
export type Feature = { id: string; name: T; desc: T };
export const FEATURES: Feature[] = [
  { id: 'email', name: { de: 'E-Mail mit eigener Domain', en: 'Email on your domain' }, desc: { de: 'info@ihr-geschaeft.ch, eingerichtet auf Handy und PC.', en: 'info@your-business.ch, set up on phone and PC.' } },
  { id: 'form', name: { de: 'Kontaktformular', en: 'Contact form' }, desc: { de: 'Formular mit Spamschutz statt nur E-Mail-Button.', en: 'Form with spam protection instead of an email button.' } },
  { id: 'reviews', name: { de: 'Google-Bewertungen anzeigen', en: 'Show Google reviews' }, desc: { de: 'Ihre echten Sterne direkt auf der Seite.', en: 'Your real stars right on the page.' } },
  { id: 'hours', name: { de: 'Live «Jetzt geöffnet»', en: 'Live “open now”' }, desc: { de: 'Zeigt automatisch, ob Sie gerade offen haben und bis wann.', en: 'Shows automatically whether you are open right now and until when.' } },
  { id: 'whatsapp', name: { de: 'WhatsApp-Button', en: 'WhatsApp button' }, desc: { de: 'Kunden schreiben Ihnen mit einem Tipp.', en: 'Customers message you with one tap.' } },
  { id: 'menu', name: { de: 'Preisliste', en: 'Price list' }, desc: { de: 'Ihre Leistungen und Preise übersichtlich, selbst änderbar.', en: 'Your services and prices, clearly laid out and editable by you.' } },
  { id: 'hero', name: { de: 'Individueller Startbereich mit Film', en: 'Custom hero with film' }, desc: { de: 'Der grosse Bereich ganz oben. Auf Wunsch komme ich vorbei und filme, wie man Ihr Geschäft betritt, geschnitten als kinoreifer Film.', en: 'The large area at the very top. On request I come by and film walking into your shop, cut as a cinematic film.' } },
  { id: 'booking', name: { de: 'Buchungs-Funnel', en: 'Booking funnel' }, desc: { de: 'Kunden wählen Leistung, Datum und Zeit in 3 Schritten.', en: 'Customers pick service, date and time in 3 steps.' } },
  { id: 'pricefinder', name: { de: 'Preisrechner', en: 'Price calculator' }, desc: { de: 'Kunden wählen Leistung und Menge und sehen sofort den Richtpreis.', en: 'Customers pick service and quantity and see a guide price instantly.' } },
  { id: 'schedule', name: { de: 'Wochen- und Kursplan', en: 'Weekly schedule' }, desc: { de: 'Kurse, Trainings oder Events übersichtlich nach Tag.', en: 'Classes, trainings or events, clearly by day.' } },
  { id: 'page', name: { de: 'Unterseiten', en: 'Subpages' }, desc: { de: 'Z. B. Team, Stellen oder Angebote auf eigenen Seiten.', en: 'E.g. team, jobs or offers on their own pages.' } },
  { id: 'lang', name: { de: 'Zweite Sprache', en: 'Second language' }, desc: { de: 'Ganze Seite auf Deutsch und z. B. Englisch, mit Umschalter.', en: 'Whole site in German and e.g. English, with a switch.' } },
  { id: 'jobs', name: { de: 'Offene Stellen', en: 'Job openings' }, desc: { de: 'Stelleninserate mit Bewerbungs-Button, selbst änderbar.', en: 'Job ads with an apply button, editable by you.' } },
  { id: 'newsletter', name: { de: 'Newsletter-Anmeldung', en: 'Newsletter sign-up' }, desc: { de: 'Besucher tragen sich mit ihrer E-Mail ein.', en: 'Visitors sign up with their email.' } },
];
const CORE_INCLUDES = ['email', 'form', 'reviews', 'hours', 'whatsapp', 'menu'];

export const TIERS: Tier[] = [
  {
    id: 'core', price: CORE_PRICE, includes: CORE_INCLUDES,
    name: { de: 'Core', en: 'Core' },
    tagline: { de: 'Alles, was eine gute Geschäfts-Website braucht.', en: 'Everything a good business website needs.' },
  },
  {
    id: 'pro', price: PRO_PRICE, includes: FEATURES.map(f => f.id),
    name: { de: 'Pro', en: 'Pro' },
    tagline: { de: 'Core plus alle individuellen Funktionen, mit Film im Startbereich.', en: 'Core plus every custom feature, with a film in the hero.' },
  },
];

/** What the Automation Add-on can cover; the monthly price depends on how many run. */
export const AUTOMATIONS: Feature[] = [
  { id: 'wa-agent', name: { de: 'WhatsApp-Antwort auf Anfragen', en: 'WhatsApp reply to enquiries' }, desc: { de: 'Wer bucht oder anfragt, bekommt sofort eine Nachricht auf WhatsApp.', en: 'Anyone who books or asks gets a WhatsApp message right away.' } },
  { id: 'autoreply', name: { de: 'Automatische Bestätigung', en: 'Auto-confirmation' }, desc: { de: 'Jede Anfrage oder Buchung erhält sofort eine Bestätigung mit Buchungsnummer.', en: 'Every enquiry or booking instantly gets a confirmation with a booking number.' } },
  { id: 'maildesign', name: { de: 'E-Mails im eigenen Design', en: 'Emails in your design' }, desc: { de: 'Bestätigungen im Look Ihrer Website statt als nackter Formular-Text.', en: 'Confirmations in your website’s look instead of bare form text.' } },
  { id: 'calendar', name: { de: 'Automatisch im Kalender', en: 'Auto-book in calendar' }, desc: { de: 'Jede Buchung landet sofort in Ihrem Google- oder Outlook-Kalender.', en: 'Every booking lands in your Google or Outlook calendar instantly.' } },
  { id: 'reminder', name: { de: 'Termin-Erinnerung', en: 'Appointment reminder' }, desc: { de: 'Nachricht an den Kunden 24 Stunden vor dem Termin.', en: 'Message to the customer 24 hours before the appointment.' } },
  { id: 'review-request', name: { de: 'Bewertungs-Anfrage', en: 'Review request' }, desc: { de: 'Nach dem Termin bittet eine Nachricht um eine Google-Bewertung.', en: 'After the appointment a message asks for a Google review.' } },
  { id: 'sheet', name: { de: 'Anfragen in Tabelle', en: 'Enquiries to a sheet' }, desc: { de: 'Alle Anfragen sammeln sich in einer Google-Tabelle.', en: 'All enquiries collect in a Google Sheet.' } },
];

/** Print extras in the website's design, one-time. */
export type Extra = { id: string; price: number; name: T; desc: T };
export const PRINT: Extra[] = [
  { id: 'set', price: 125, name: { de: 'Paket Flyer + Visitenkarte', en: 'Flyer + business card package' }, desc: { de: 'Flyer A5 und Visitenkarte zusammen, beide im Look Ihrer Website, druckfertig. Inklusive 1 Mockup-Entwurf gratis vorab, damit Sie das Design sehen, bevor es losgeht. Sie sparen CHF 75.', en: 'A5 flyer and business card together, both in your website’s look, print-ready. Includes 1 free mockup up front, so you see the design before we start. You save CHF 75.' } },
  { id: 'cards', price: 100, name: { de: 'Visitenkarten-Design', en: 'Business card design' }, desc: { de: 'Massgeschneidert auf das Design Ihrer Website. Vorder- und Rückseite, druckfertig.', en: 'Tailored to your website’s design. Front and back, print-ready.' } },
  { id: 'flyer', price: 100, name: { de: 'Flyer-Design (A5)', en: 'Flyer design (A5)' }, desc: { de: 'Beidseitig, druckfertig, im Look Ihrer Website.', en: 'Double-sided, print-ready, in your website’s look.' } },
  { id: 'social', price: 100, name: { de: 'Preisliste für Social Media', en: 'Price list for social media' }, desc: { de: 'Ihre Preisliste als Bild für Instagram, Facebook und Google, im Look Ihrer Website.', en: 'Your price list as an image for Instagram, Facebook and Google, in your website’s look.' } },
];

/** The bundle replaces its two parts: picking both singles switches to the bundle (KGC, 2026-11-16). */
export const SET_PARTS = ['flyer', 'cards'];
export const toggleExtra = (prev: Set<string>, id: string, on: boolean) => {
  const n = new Set(prev);
  if (!on) { n.delete(id); return n; }
  n.add(id);
  if (id === 'set') SET_PARTS.forEach(p => n.delete(p));
  else if (SET_PARTS.includes(id)) { n.delete('set'); if (SET_PARTS.every(p => n.has(p))) { SET_PARTS.forEach(p => n.delete(p)); n.add('set'); } }
  return n;
};

/** One-time total for a package plus print extras. */
export const quote = (tier: Tier, extras: Set<string>) => {
  const chosen = PRINT.filter(p => extras.has(p.id));
  return { chosen, total: tier.price + chosen.reduce((s, p) => s + p.price, 0) };
};

/** Monthly maintenance per package (optional). */
export const CARE: Record<TierId | 'upgrade', number> = { upgrade: 100, core: 100, pro: 150 };
export const CARE_HOURS = 2;
export const DOMAIN_FEE = 50; // monthly extra when I buy and host the domain

/** Hero examples for the Pro tier (anonymised drafts, no links: owner's request). */
export const WORK = [
  { img: '/work/precision.webp', slug: 'stps', video: '/work/video/stps-site', name: 'SwissTech Precision Solutions', kind: { de: 'Kundenprojekt · Live', en: 'Client project · live' }, url: 'https://www.stps.ch' },
  { img: '/work/boxing.webp', slug: 'boxschule', name: 'Boxschule Gebenstorf', kind: { de: 'Kundenprojekt · Live', en: 'Client project · live' }, url: 'https://boxschule-gebenstorf.ch' },
  { img: '/work/restaurant.webp', slug: 'souperbe', name: 'Café & Restaurant', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
  { img: '/work/barber.webp', slug: 'barbershop', name: 'Barbier', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
  { img: '/work/cleaning.webp', slug: 'halimi', name: 'Reinigung', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
  { img: '/work/phone-repair.webp', slug: 'iservice', name: 'Handyreparatur', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
] as { img: string; slug: string; video?: string; name: string; kind: T; url?: string }[];


// Colour mode: dark by default, visitor can switch to light (KGC, 2026-11-14).
export type Mode = 'dark' | 'light';
export const ModeContext = createContext<{ mode: Mode; setMode: (m: Mode) => void }>({ mode: 'dark', setMode: () => {} });
