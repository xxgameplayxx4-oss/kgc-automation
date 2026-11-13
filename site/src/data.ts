// Single source for prices and copy shared across sections. All prices one-time, in CHF.
import { createContext, useContext } from 'react';

export type Lang = 'de' | 'en';
export type T = { de: string; en: string };
export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'de', setLang: () => {} });
export const useT = () => {
  const { lang } = useContext(LangContext);
  return (s: T) => s[lang];
};

export const CONTACT_EMAIL = 'khangcung196@gmail.com';
export const chf = (n: number) => 'CHF ' + n.toLocaleString('de-CH').replace(/[’']/g, "'");
export const mailto = (subject: string, body = '') =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export type Tier = { id: 'basis' | 'plus' | 'business' | 'komplett'; preset: string[]; name: T; tagline: T; features: T[] };

const BASE_FEATURES: T[] = [
  { de: 'One-Pager mit Navigation und Mobile-Ansicht', en: 'One-pager with navigation and mobile view' },
  { de: 'Sektionen: Start, Über uns, Leistungen, Galerie, Bewertungen, Öffnungszeiten, Karte, Kontakt', en: 'Sections: home, about, services, gallery, reviews, opening hours, map, contact' },
  { de: 'Kontakt-Button öffnet direkt Ihr E-Mail-Programm', en: 'Contact button opens the visitor’s email app' },
  { de: 'Klick-zum-Anrufen und Google-Maps-Link', en: 'Tap-to-call and Google Maps link' },
  { de: 'Impressum und Datenschutz nach Schweizer Recht (nDSG)', en: 'Legal notice and privacy policy under Swiss law (nDSG)' },
  { de: 'SEO-Grundlagen: Titel, Beschreibung, Google-Vorschau, Sitemap', en: 'SEO basics: titles, descriptions, Google preview, sitemap' },
  { de: 'Schnelle Ladezeit, SSL-Zertifikat (https)', en: 'Fast loading, SSL certificate (https)' },
  { de: 'Domain verbinden und Hosting einrichten', en: 'Domain connected and hosting set up' },
  { de: 'Eine Korrekturrunde inklusive', en: 'One round of revisions included' },
];

export const BASE_PRICE = 1500;
export { BASE_FEATURES };

/** Packages are presets of add-ons on top of the Basis website; their price follows the volume discount below. */
export const TIERS: Tier[] = [
  {
    id: 'basis', preset: [],
    name: { de: 'Basis', en: 'Basic' },
    tagline: { de: 'Das Nötige: eine saubere, schnelle, mobile Website.', en: 'The essentials: a clean, fast, mobile website.' },
    features: BASE_FEATURES,
  },
  {
    id: 'plus', preset: ['hero', 'email', 'form', 'reviews', 'hours'],
    name: { de: 'Plus', en: 'Plus' },
    tagline: { de: 'Basis plus eigener Hero, E-Mail, Formular, Bewertungen und Öffnungszeiten.', en: 'Basic plus custom hero, email, form, reviews and opening hours.' },
    features: [],
  },
  {
    id: 'business', preset: ['hero', 'email', 'form', 'reviews', 'hours', 'whatsapp', 'booking', 'autoreply', 'maildesign', 'reminder'],
    name: { de: 'Business', en: 'Business' },
    tagline: { de: 'Für Termine und Reservationen: Buchung mit Bestätigung und Erinnerung.', en: 'For appointments and reservations: booking with confirmation and reminder.' },
    features: [],
  },
  {
    id: 'komplett', preset: [],
    name: { de: 'Komplett', en: 'Complete' },
    tagline: { de: 'Alle Funktionen, Automationen und Print. 30 % Rabatt auf alle Zusätze.', en: 'Every feature, automation and print item. 30 % off all add-ons.' },
    features: [],
  },
];

export type AddonGroup = 'website' | 'automation' | 'print';
export type Addon = { id: string; group: AddonGroup; price: number; name: T; desc: T };

export const GROUPS: { id: AddonGroup; name: T; desc: T }[] = [
  { id: 'website', name: { de: 'Website-Funktionen', en: 'Website features' }, desc: { de: 'Mehr Funktionen direkt auf Ihrer Seite.', en: 'More features right on your site.' } },
  { id: 'automation', name: { de: 'Automationen', en: 'Automations' }, desc: { de: 'Einfache Abläufe, die im Betrieb fast nichts kosten.', en: 'Simple workflows that cost next to nothing to run.' } },
  { id: 'print', name: { de: 'Print im gleichen Design', en: 'Print in the same design' }, desc: { de: 'Flyer und Visitenkarten passend zu Ihrer Website.', en: 'Flyers and business cards that match your website.' } },
];

export const ADDONS: Addon[] = [
  // Website
  { id: 'booking', group: 'website', price: 400, name: { de: 'Buchungs-Funnel', en: 'Booking funnel' }, desc: { de: 'Kunden wählen Leistung, Datum und Zeit in 3 Schritten.', en: 'Customers pick service, date and time in 3 steps.' } },
  { id: 'hero', group: 'website', price: 500, name: { de: 'Individueller Hero-Bereich', en: 'Custom hero section' }, desc: { de: 'Der erste Eindruck, entwickelt für Ihr Geschäft: Video, Animation oder Bildwelt.', en: 'The first impression, built for your business: video, animation or imagery.' } },
  { id: 'email', group: 'website', price: 150, name: { de: 'E-Mail mit eigener Domain', en: 'Email on your domain' }, desc: { de: 'info@ihr-geschaeft.ch, eingerichtet auf Handy und PC.', en: 'info@your-business.ch, set up on phone and PC.' } },
  { id: 'form', group: 'website', price: 150, name: { de: 'Kontaktformular', en: 'Contact form' }, desc: { de: 'Formular mit Spamschutz statt nur E-Mail-Button.', en: 'Form with spam protection instead of an email button.' } },
  { id: 'page', group: 'website', price: 250, name: { de: 'Zusätzliche Unterseite', en: 'Extra subpage' }, desc: { de: 'Z. B. Preisliste, Team oder Stellen.', en: 'E.g. price list, team or jobs.' } },
  { id: 'lang', group: 'website', price: 400, name: { de: 'Zweite Sprache', en: 'Second language' }, desc: { de: 'Ganze Seite auf Deutsch und z. B. Englisch, mit Umschalter.', en: 'Whole site in German and e.g. English, with a switch.' } },
  { id: 'reviews', group: 'website', price: 150, name: { de: 'Google-Bewertungen anzeigen', en: 'Show Google reviews' }, desc: { de: 'Ihre echten Sterne direkt auf der Seite.', en: 'Your real stars right on the page.' } },
  { id: 'menu', group: 'website', price: 250, name: { de: 'Menü- oder Preisliste', en: 'Menu or price list' }, desc: { de: 'Übersichtlich, selbst änderbar.', en: 'Clear, editable by you.' } },
  // Features already built for client projects (iservice, souperbe, Barber House, Boxschule, Freestar)
  { id: 'hours', group: 'website', price: 100, name: { de: 'Live «Jetzt geöffnet»', en: 'Live “open now”' }, desc: { de: 'Zeigt automatisch, ob Sie gerade offen haben und bis wann.', en: 'Shows automatically whether you are open right now and until when.' } },
  { id: 'pricefinder', group: 'website', price: 150, name: { de: 'Preisrechner', en: 'Price calculator' }, desc: { de: 'Kunden wählen Leistung und Menge und sehen sofort den Richtpreis.', en: 'Customers pick service and quantity and see a guide price instantly.' } },
  { id: 'schedule', group: 'website', price: 200, name: { de: 'Wochen- und Kursplan', en: 'Weekly schedule' }, desc: { de: 'Kurse, Trainings oder Events übersichtlich nach Tag.', en: 'Classes, trainings or events, clearly by day.' } },
  { id: 'jobs', group: 'website', price: 250, name: { de: 'Offene Stellen', en: 'Job openings' }, desc: { de: 'Stelleninserate mit Bewerbungs-Button, selbst änderbar.', en: 'Job ads with an apply button, editable by you.' } },
  { id: 'newsletter', group: 'website', price: 100, name: { de: 'Newsletter-Anmeldung', en: 'Newsletter sign-up' }, desc: { de: 'Besucher tragen sich mit ihrer E-Mail ein.', en: 'Visitors sign up with their email.' } },
  { id: 'whatsapp', group: 'website', price: 50, name: { de: 'WhatsApp-Button', en: 'WhatsApp button' }, desc: { de: 'Kunden schreiben Ihnen mit einem Tipp.', en: 'Customers message you with one tap.' } },
  // Automations
  { id: 'calendar', group: 'automation', price: 250, name: { de: 'Automatisch im Kalender', en: 'Auto-book in calendar' }, desc: { de: 'Jede Buchung landet sofort in Ihrem Google- oder Outlook-Kalender.', en: 'Every booking lands in your Google or Outlook calendar instantly.' } },
  { id: 'autoreply', group: 'automation', price: 100, name: { de: 'Automatische Bestätigung', en: 'Auto-confirmation' }, desc: { de: 'Jede Anfrage oder Buchung erhält sofort eine Bestätigung mit Buchungsnummer.', en: 'Every enquiry or booking instantly gets a confirmation with a booking number.' } },
  { id: 'maildesign', group: 'automation', price: 150, name: { de: 'E-Mails im eigenen Design', en: 'Emails in your design' }, desc: { de: 'Bestätigungen und Benachrichtigungen im Look Ihrer Website statt als nackter Formular-Text.', en: 'Confirmations and notifications in your website’s look instead of bare form text.' } },
  { id: 'reminder', group: 'automation', price: 150, name: { de: 'Termin-Erinnerung', en: 'Appointment reminder' }, desc: { de: 'E-Mail an den Kunden 24 Stunden vor dem Termin.', en: 'Email to the customer 24 hours before the appointment.' } },
  { id: 'review-request', group: 'automation', price: 200, name: { de: 'Bewertungs-Anfrage', en: 'Review request' }, desc: { de: 'Nach dem Termin bittet eine E-Mail um eine Google-Bewertung.', en: 'After the appointment an email asks for a Google review.' } },
  { id: 'sheet', group: 'automation', price: 100, name: { de: 'Anfragen in Tabelle', en: 'Enquiries to a sheet' }, desc: { de: 'Alle Anfragen sammeln sich in einer Google-Tabelle.', en: 'All enquiries collect in a Google Sheet.' } },
  // Print
  { id: 'cards', group: 'print', price: 100, name: { de: 'Visitenkarten-Design', en: 'Business card design' }, desc: { de: 'Massgeschneidert auf das Design Ihrer Website. Vorder- und Rückseite, druckfertig.', en: 'Tailored to your website’s design. Front and back, print-ready.' } },
  { id: 'flyer', group: 'print', price: 200, name: { de: 'Flyer-Design (A5)', en: 'Flyer design (A5)' }, desc: { de: 'Beidseitig, druckfertig, im Look Ihrer Website.', en: 'Double-sided, print-ready, in your website’s look.' } },
  { id: 'social', group: 'print', price: 100, name: { de: 'Social-Media-Paket', en: 'Social media kit' }, desc: { de: 'Profilbild und Titelbilder für Instagram, Facebook, Google.', en: 'Profile and cover images for Instagram, Facebook, Google.' } },
];

/** Volume discount on the add-on subtotal, by number of add-ons; every add-on chosen gives 30 %. */
export const DISCOUNTS: [number, number][] = [[15, 0.2], [10, 0.15], [8, 0.1], [5, 0.08]];
export const discountRate = (n: number) =>
  n >= ADDONS.length ? 0.3 : (DISCOUNTS.find(([min]) => n >= min)?.[1] ?? 0);
/** The next discount step the customer can reach, for the "2 more for 10 %" nudge. */
export const nextStep = (n: number): [number, number] | null => {
  if (n >= ADDONS.length) return null;
  const s = [...DISCOUNTS].reverse().find(([min]) => n < min);
  return s ? [s[0] - n, s[1]] : [ADDONS.length - n, 0.3];
};
export const presetOf = (tier: Tier) => (tier.id === 'komplett' ? ADDONS.map(a => a.id) : tier.preset);
export const quote = (selected: Set<string>) => {
  const chosen = ADDONS.filter(a => selected.has(a.id));
  const sub = chosen.reduce((s, a) => s + a.price, 0);
  const rate = discountRate(chosen.length);
  const discount = Math.round((sub * rate) / 5) * 5; // rounded to CHF 5
  return { chosen, sub, rate, discount, total: BASE_PRICE + sub - discount };
};
export const tierPrice = (tier: Tier) => quote(new Set(presetOf(tier))).total;
export const pct = (r: number) => `${Math.round(r * 100)} %`;

/** Monthly maintenance per package; Komplett gets 30 % off its CHF 400. Custom picks map by add-on count. */
export const CARE: Record<Tier['id'], { list: number; price: number }> = {
  basis: { list: 100, price: 100 },
  plus: { list: 150, price: 150 },
  business: { list: 250, price: 250 },
  komplett: { list: 400, price: 280 },
};
export const CARE_HOURS = 2;
export const DOMAIN_FEE = 50; // monthly extra when I buy and host the domain
export const careFor = (n: number) =>
  CARE[n >= ADDONS.length ? 'komplett' : n >= 10 ? 'business' : n >= 5 ? 'plus' : 'basis'];

/** Hero examples for the Pro tier (anonymised drafts, no links: owner's request). */
export const WORK = [
  { img: '/work/precision.webp', slug: 'stps', video: '/work/video/stps-site', name: 'SwissTech Precision Solutions', kind: { de: 'Kundenprojekt · Live', en: 'Client project · live' }, url: 'https://www.stps.ch' },
  { img: '/work/boxing.webp', slug: 'boxschule', name: 'Boxschule Gebenstorf', kind: { de: 'Kundenprojekt · Live', en: 'Client project · live' }, url: 'https://boxschule-gebenstorf.ch' },
  { img: '/work/restaurant.webp', slug: 'souperbe', name: 'Café & Restaurant', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
  { img: '/work/barber.webp', slug: 'barbershop', name: 'Barbier', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
  { img: '/work/cleaning.webp', slug: 'halimi', name: 'Reinigung', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
  { img: '/work/phone-repair.webp', slug: 'iservice', name: 'Handyreparatur', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
] as { img: string; slug: string; video?: string; name: string; kind: T; url?: string }[];

