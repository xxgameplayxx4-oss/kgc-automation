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

export type Tier = { id: 'basis' | 'pro'; price: number; name: T; tagline: T; features: T[] };

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

export const TIERS: Tier[] = [
  {
    id: 'basis', price: 1500,
    name: { de: 'Basis', en: 'Basic' },
    tagline: { de: 'Alles, was eine Website braucht. Sauber, schnell, mobil.', en: 'Everything a website needs. Clean, fast, mobile.' },
    features: BASE_FEATURES,
  },
  {
    id: 'pro', price: 2000,
    name: { de: 'Pro', en: 'Pro' },
    tagline: { de: 'Basis plus ein Hero-Bereich, der für Ihr Geschäft entwickelt wird.', en: 'Basic plus a hero section engineered for your business.' },
    features: [
      { de: 'Alles aus Basis', en: 'Everything in Basic' },
      { de: 'Individuell entwickelter Hero-Bereich (Video, Animation oder Bildwelt)', en: 'Custom-engineered hero section (video, animation or imagery)' },
      { de: 'E-Mail-Adresse mit Ihrer Domain, z. B. info@ihr-geschaeft.ch', en: 'Email address on your domain, e.g. info@your-business.ch' },
    ],
  },
];

export type AddonGroup = 'website' | 'automation' | 'print';
export type Addon = { id: string; group: AddonGroup; price: number; name: T; desc: T; includedIn?: Tier['id'] };

export const GROUPS: { id: AddonGroup; name: T; desc: T }[] = [
  { id: 'website', name: { de: 'Website-Funktionen', en: 'Website features' }, desc: { de: 'Mehr Funktionen direkt auf Ihrer Seite.', en: 'More features right on your site.' } },
  { id: 'automation', name: { de: 'Automationen', en: 'Automations' }, desc: { de: 'Einfache Abläufe, die im Betrieb fast nichts kosten.', en: 'Simple workflows that cost next to nothing to run.' } },
  { id: 'print', name: { de: 'Print im gleichen Design', en: 'Print in the same design' }, desc: { de: 'Flyer und Visitenkarten passend zu Ihrer Website.', en: 'Flyers and business cards that match your website.' } },
];

export const ADDONS: Addon[] = [
  // Website
  { id: 'booking', group: 'website', price: 900, name: { de: 'Buchungs-Funnel', en: 'Booking funnel' }, desc: { de: 'Kunden wählen Leistung, Datum und Zeit in 3 Schritten.', en: 'Customers pick service, date and time in 3 steps.' } },
  { id: 'email', group: 'website', price: 150, includedIn: 'pro', name: { de: 'E-Mail mit eigener Domain', en: 'Email on your domain' }, desc: { de: 'info@ihr-geschaeft.ch, eingerichtet auf Handy und PC.', en: 'info@your-business.ch, set up on phone and PC.' } },
  { id: 'form', group: 'website', price: 150, name: { de: 'Kontaktformular', en: 'Contact form' }, desc: { de: 'Formular mit Spamschutz statt nur E-Mail-Button.', en: 'Form with spam protection instead of an email button.' } },
  { id: 'page', group: 'website', price: 250, name: { de: 'Zusätzliche Unterseite', en: 'Extra subpage' }, desc: { de: 'Z. B. Preisliste, Team oder Stellen.', en: 'E.g. price list, team or jobs.' } },
  { id: 'lang', group: 'website', price: 400, name: { de: 'Zweite Sprache', en: 'Second language' }, desc: { de: 'Ganze Seite auf Deutsch und z. B. Englisch, mit Umschalter.', en: 'Whole site in German and e.g. English, with a switch.' } },
  { id: 'reviews', group: 'website', price: 150, name: { de: 'Google-Bewertungen anzeigen', en: 'Show Google reviews' }, desc: { de: 'Ihre echten Sterne direkt auf der Seite.', en: 'Your real stars right on the page.' } },
  { id: 'menu', group: 'website', price: 250, name: { de: 'Menü- oder Preisliste', en: 'Menu or price list' }, desc: { de: 'Übersichtlich, selbst änderbar.', en: 'Clear, editable by you.' } },
  { id: 'whatsapp', group: 'website', price: 50, name: { de: 'WhatsApp-Button', en: 'WhatsApp button' }, desc: { de: 'Kunden schreiben Ihnen mit einem Tipp.', en: 'Customers message you with one tap.' } },
  // Automations
  { id: 'calendar', group: 'automation', price: 250, name: { de: 'Automatisch im Kalender', en: 'Auto-book in calendar' }, desc: { de: 'Jede Buchung landet sofort in Ihrem Google- oder Outlook-Kalender.', en: 'Every booking lands in your Google or Outlook calendar instantly.' } },
  { id: 'autoreply', group: 'automation', price: 100, name: { de: 'Automatische Antwort', en: 'Auto-reply' }, desc: { de: 'Jede Anfrage erhält sofort eine freundliche Bestätigung.', en: 'Every enquiry gets an instant friendly confirmation.' } },
  { id: 'reminder', group: 'automation', price: 150, name: { de: 'Termin-Erinnerung', en: 'Appointment reminder' }, desc: { de: 'E-Mail an den Kunden 24 Stunden vor dem Termin.', en: 'Email to the customer 24 hours before the appointment.' } },
  { id: 'review-request', group: 'automation', price: 200, name: { de: 'Bewertungs-Anfrage', en: 'Review request' }, desc: { de: 'Nach dem Termin bittet eine E-Mail um eine Google-Bewertung.', en: 'After the appointment an email asks for a Google review.' } },
  { id: 'sheet', group: 'automation', price: 100, name: { de: 'Anfragen in Tabelle', en: 'Enquiries to a sheet' }, desc: { de: 'Alle Anfragen sammeln sich in einer Google-Tabelle.', en: 'All enquiries collect in a Google Sheet.' } },
  // Print
  { id: 'cards', group: 'print', price: 100, name: { de: 'Visitenkarten-Design', en: 'Business card design' }, desc: { de: 'Massgeschneidert auf das Design Ihrer Website. Vorder- und Rückseite, druckfertig.', en: 'Tailored to your website’s design. Front and back, print-ready.' } },
  { id: 'flyer', group: 'print', price: 200, name: { de: 'Flyer-Design (A5)', en: 'Flyer design (A5)' }, desc: { de: 'Beidseitig, druckfertig, im Look Ihrer Website.', en: 'Double-sided, print-ready, in your website’s look.' } },
  { id: 'social', group: 'print', price: 100, name: { de: 'Social-Media-Paket', en: 'Social media kit' }, desc: { de: 'Profilbild und Titelbilder für Instagram, Facebook, Google.', en: 'Profile and cover images for Instagram, Facebook, Google.' } },
];

/** Pro bonus: the 2 priciest chosen add-ons are free, the 3rd costs 25 %. Basis pays full price. */
export const PRO_FREE = 2;
export const PRO_THIRD_RATE = 0.25;
export type Line = { addon: Addon; price: number; note: 'included' | 'free' | 'third' | null };
export const lines = (tier: Tier, selected: Set<string>): Line[] => {
  const chosen = ADDONS.filter(a => selected.has(a.id) || a.includedIn === tier.id);
  const paid = chosen.filter(a => a.includedIn !== tier.id).sort((a, b) => b.price - a.price);
  return chosen.map(addon => {
    if (addon.includedIn === tier.id) return { addon, price: 0, note: 'included' };
    const rank = tier.id === 'pro' ? paid.indexOf(addon) : -1;
    if (rank >= 0 && rank < PRO_FREE) return { addon, price: 0, note: 'free' };
    if (rank === PRO_FREE) return { addon, price: Math.round(addon.price * PRO_THIRD_RATE), note: 'third' };
    return { addon, price: addon.price, note: null };
  });
};
export const total = (tier: Tier, selected: Set<string>) =>
  tier.price + lines(tier, selected).reduce((s, l) => s + l.price, 0);

/** Hero examples for the Pro tier (anonymised drafts, no links: owner's request). */
export const WORK = [
  { img: '/work/precision.webp', name: 'SwissTech Precision Solutions', kind: { de: 'Kundenprojekt · Live', en: 'Client project · live' }, url: 'https://www.stps.ch' },
  { img: '/work/boxing.webp', name: 'Boxschule Gebenstorf', kind: { de: 'Kundenprojekt · Live', en: 'Client project · live' }, url: 'https://boxschule-gebenstorf.ch' },
  { img: '/work/restaurant.webp', name: 'Café & Restaurant', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
  { img: '/work/barber.webp', name: 'Barbier', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
  { img: '/work/cleaning.webp', name: 'Reinigung', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
  { img: '/work/phone-repair.webp', name: 'Handyreparatur', kind: { de: 'Konzeptentwurf', en: 'Concept draft' } },
] as { img: string; name: string; kind: T; url?: string }[];

