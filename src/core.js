/* KGC core: shared data, i18n, formatting, events. Loaded before all section scripts. */
(function () {
  const root = document.documentElement;
  const listeners = {};

  const KGC = {
    lang: 'de',
    on(evt, fn) { (listeners[evt] = listeners[evt] || []).push(fn); },
    emit(evt, data) { (listeners[evt] || []).forEach(fn => { try { fn(data); } catch (e) { console.error(e); } }); },

    /* Pick a string for the current language: t({de:'…', en:'…'}) */
    t(o) { return o == null ? '' : (typeof o === 'string' ? o : (o[KGC.lang] ?? o.de)); },

    setLang(l) {
      KGC.lang = l === 'en' ? 'en' : 'de';
      root.setAttribute('data-lang', KGC.lang);
      root.setAttribute('lang', KGC.lang === 'de' ? 'de-CH' : 'en');
      document.querySelectorAll('[data-ph-de]').forEach(el => { el.placeholder = el.getAttribute('data-ph-' + KGC.lang) || ''; });
      document.querySelectorAll('[data-aria-de]').forEach(el => { el.setAttribute('aria-label', el.getAttribute('data-aria-' + KGC.lang) || ''); });
      try { localStorage.setItem('kgc-lang', KGC.lang); } catch (e) {}
      KGC.emit('lang', KGC.lang);
    },

    /* Swiss number format: CHF 1'800 */
    fmt(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '’'); },
    chf(n) { return 'CHF ' + KGC.fmt(n); },
    range(a, b) { return a === b ? KGC.chf(a) : 'CHF ' + KGC.fmt(a) + '–' + KGC.fmt(b); },

    /* Open the quote configurator, optionally preselecting a package id or offer ids */
    openQuote(preset) {
      KGC.emit('quote:preset', preset || null);
      const el = document.getElementById('offerte');
      if (el) el.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
    },

    /* Line icons (24px grid, 1.5 stroke) */
    icons: {
      star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8l-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z"/>',
      inbox: '<path d="M3.5 13h4.5l1.5 3h5l1.5-3h4.5"/><path d="M6 5h12l2.5 8v5.5a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V13z"/>',
      phone: '<path d="M15 3.5l5.5 5.5M20.5 3.5L15 9"/><path d="M5.5 4h3l1.5 4-2 1.3a10 10 0 0 0 5 5l1.2-2 4 1.5v3a2 2 0 0 1-2 2A14.5 14.5 0 0 1 3.5 6a2 2 0 0 1 2-2z"/>',
      calendar: '<rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17M9 15l2 2 4-4"/>',
      wrench: '<path d="M14.7 6.3a4 4 0 0 0 5.2 5.2l-8.6 8.6a2.1 2.1 0 0 1-3-3l8.6-8.6"/><path d="M14.7 6.3A4 4 0 0 1 19.4 3l-2.5 2.5.8 1.8 1.8.8 2.5-2.5a4 4 0 0 1-3.3 4.7"/>',
      file: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
      receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5L12 13l8.5-6.5"/>',
      cloud: '<path d="M7 18.5h10a4 4 0 0 0 .6-8 6 6 0 0 0-11.4 1.3A3.4 3.4 0 0 0 7 18.5z"/>',
      users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.7a3.5 3.5 0 0 1 0 6.6M18 14.2a6.5 6.5 0 0 1 3.5 5.8"/>',
      monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
      repeat: '<path d="M19.5 11A7.5 7.5 0 0 0 6 6.5L4.5 8M4.5 13A7.5 7.5 0 0 0 18 17.5L19.5 16"/><path d="M4.5 4v4h4M19.5 20v-4h-4"/>',
    },
    icon(name, tone) { return '<span class="ico-chip tone-' + tone + '" aria-hidden="true"><svg viewBox="0 0 24 24">' + (KGC.icons[name] || '') + '</svg></span>'; },

    reducedMotion: () => matchMedia('(prefers-reduced-motion: reduce)').matches,

    /* The ten automations. Prices: [min, max] in CHF. */
    offers: [
      { id: 'reviews', icon: 'star', tone: 'steel', setup: [300, 300], monthly: [49, 49], industries: ['trade', 'repair', 'beauty', 'gastro'],
        name: { de: 'Google-Bewertungs-Autopilot', en: 'Google review autopilot' },
        short: { de: 'Mehr Bewertungen, jede beantwortet, schlechte nie öffentlich überrascht.', en: 'More reviews, every one answered, bad ones caught before they hurt.' },
        steps: { de: ['Nach dem Auftrag: SMS mit direktem Bewertungslink', 'KI entwirft eine Antwort in Ihrem Ton', '4–5 Sterne: automatisch veröffentlicht. 1–3 Sterne: Alarm an Sie'],
                 en: ['After the job: SMS with a direct review link', 'AI drafts a reply in your voice', '4–5 stars: posted automatically. 1–3 stars: alert to you'] } },
      { id: 'leads', icon: 'inbox', tone: 'steel', setup: [250, 250], monthly: [29, 29], industries: ['trade', 'repair', 'beauty', 'gastro', 'office'],
        name: { de: 'Anfragen-Fänger für Ihre Website', en: 'Website lead catcher' },
        short: { de: 'Keine Anfrage geht mehr verloren.', en: 'No enquiry ever gets lost again.' },
        steps: { de: ['Sofortige Eingangsbestätigung an den Kunden', 'Anfrage landet in Ihrer Tabelle', 'WhatsApp an Sie, Erinnerung nach 24 h ohne Antwort'],
                 en: ['Instant confirmation to the customer', 'Enquiry lands in your sheet', 'WhatsApp to you, reminder after 24 h without reply'] } },
      { id: 'missedcall', icon: 'phone', tone: 'steel', setup: [400, 400], monthly: [60, 60], industries: ['trade'],
        name: { de: 'Rückruf-SMS bei verpassten Anrufen', en: 'Missed-call text-back' },
        short: { de: 'Wer anruft, während Sie arbeiten, bekommt innert einer Minute eine Antwort.', en: 'Callers you miss on the job get a reply within a minute.' },
        steps: { de: ['Anruf verpasst', 'SMS innert 60 Sekunden mit Buchungslink', 'Antwort des Kunden geht direkt an Sie'],
                 en: ['Call missed', 'SMS within 60 seconds with booking link', 'Customer reply goes straight to you'] } },
      { id: 'booking', icon: 'calendar', tone: 'steel', setup: [300, 300], monthly: [39, 39], industries: ['repair', 'beauty', 'office'],
        name: { de: 'Online-Buchung mit Erinnerungen', en: 'Online booking + reminders' },
        short: { de: 'Kunden buchen selbst, auch um 22 Uhr auf dem Sofa. Weniger Nichterscheinen.', en: 'Customers book themselves, even at 10 pm on the sofa. Fewer no-shows.' },
        steps: { de: ['Kunde wählt einen freien Termin', 'Bestätigung sofort', 'Erinnerung 24 h vorher'],
                 en: ['Customer picks a free slot', 'Instant confirmation', 'Reminder 24 h before'] } },
      { id: 'repair', icon: 'wrench', tone: 'steel', setup: [200, 200], monthly: [30, 30], industries: ['repair'],
        name: { de: 'Reparatur-Statusmeldungen', en: 'Repair status updates' },
        short: { de: 'Schluss mit «Ist mein Handy schon fertig?»', en: 'No more "is my phone ready yet?" calls.' },
        steps: { de: ['Sie ändern den Status in einer einfachen Liste', 'Kunde erhält automatisch SMS oder WhatsApp', '«Abholbereit» inklusive Öffnungszeiten'],
                 en: ['You change the status in a simple list', 'Customer gets an SMS or WhatsApp automatically', '"Ready for pickup" including opening hours'] } },
      { id: 'quotes', icon: 'file', tone: 'brass', setup: [400, 400], monthly: [60, 60], industries: ['trade', 'office'],
        name: { de: 'Offerten-Generator', en: 'Quote generator' },
        short: { de: 'Offerten in 10 Minuten statt einem Abend am Schreibtisch.', en: 'Quotes in 10 minutes instead of an evening at the desk.' },
        steps: { de: ['Kurzes Formular mit Fotos', 'KI schreibt eine saubere Offerte als PDF in Ihrem Design', 'Nachfassen nach 5 Tagen, automatisch'],
                 en: ['Short form with photos', 'AI writes a clean, branded PDF quote', 'Follow-up after 5 days, automatically'] } },
      { id: 'invoices', icon: 'receipt', tone: 'brass', setup: [400, 400], monthly: [50, 50], industries: ['trade', 'repair', 'beauty', 'gastro', 'office'],
        name: { de: 'Zahlungserinnerungen', en: 'Invoice reminders' },
        short: { de: 'Sie haben die Arbeit gemacht. Das System kümmert sich ums Geld.', en: 'You did the work. The system chases the money.' },
        steps: { de: ['Offene Rechnungen werden geprüft (z. B. bexio)', 'Höfliche Erinnerung nach 7, 14 und 30 Tagen', 'Danach Hinweis an Sie'],
                 en: ['Open invoices are checked (e.g. bexio)', 'Polite reminders at 7, 14 and 30 days', 'Then a note to you'] } },
      { id: 'inbox', icon: 'mail', tone: 'brass', setup: [400, 400], monthly: [50, 50], industries: ['trade', 'repair', 'beauty', 'gastro', 'office'],
        name: { de: 'KI-Posteingangs-Assistent', en: 'AI inbox assistant' },
        short: { de: 'Mails sortiert, Antworten vorbereitet, auf Wunsch in Schweizerdeutsch.', en: 'Emails sorted, replies drafted, in Swiss German if you like.' },
        steps: { de: ['Neue Mails werden sortiert: Offerte, Reklamation, Lieferant, Spam', 'KI legt einen Antwortentwurf an', 'Sie prüfen und senden'],
                 en: ['New mail sorted: quote, complaint, supplier, spam', 'AI prepares a draft reply', 'You check and send'] } },
      { id: 'workspace', icon: 'cloud', tone: 'sage', setup: [150, 150], monthly: [20, 20], industries: ['trade', 'repair', 'beauty', 'gastro', 'office'],
        name: { de: 'E-Mail & Cloud mit Betreuung', en: 'Email + cloud with support' },
        short: { de: 'Eine Ansprechperson für Website, E-Mail und Dateien.', en: 'One contact for website, email and files.' },
        steps: { de: ['E-Mail-Adressen auf Ihrer Domain', 'Gemeinsame Ablage für Dokumente', 'Neue Benutzer, Passwörter, Änderungen: erledigt'],
                 en: ['Email addresses on your domain', 'Shared document storage', 'New users, passwords, changes: handled'] } },
      { id: 'crm', icon: 'users', tone: 'sage', setup: [800, 800], monthly: [50, 50], industries: ['trade', 'repair', 'beauty', 'gastro', 'office'],
        name: { de: 'Eigenes CRM für Ihren Betrieb', en: 'Your own CRM' },
        short: { de: 'Kunden, Anfragen, Offerten und Termine an einem Ort, gebaut nach Ihren Abläufen.', en: 'Customers, enquiries, quotes and appointments in one place, built around how you work.' },
        steps: { de: ['Alle Kunden und Kontakte mit Verlauf an einem Ort', 'Anfragen und Offerten laufen automatisch ein', 'Übersicht über offene Aufgaben, mit Login für Ihr Team'],
                 en: ['Every customer and contact with full history', 'Enquiries and quotes flow in automatically', 'Overview of open tasks, with logins for your team'] } },
    ],

    /* Websites: one-time price, no monthly fee. from=true means "ab" (scope set in the first call) */
    websites: [
      { id: 'redesign', price: 300, from: false,
        name: { de: 'Website modernisieren', en: 'Website redesign' },
        short: { de: 'Ihre Website wirkt veraltet? Wir bauen sie neu, modern und schnell, mit Ihren Inhalten.', en: 'Your website looks dated? We rebuild it, modern and fast, with your content.' },
        points: { de: ['Neues Design, Ihre bestehenden Texte und Bilder übernommen', 'Optimiert für Handy, Ladezeit und Google', 'Impressum und Datenschutz auf aktuellem Stand (nDSG)'],
                  en: ['New design, your existing text and images carried over', 'Optimised for phones, speed and Google', 'Legal notice and privacy policy brought up to date (nDSG)'] } },
      { id: 'one', price: 650, from: false,
        name: { de: 'One-Pager Website', en: 'One-page website' },
        short: { de: 'Eine elegante Seite mit allem Wichtigen. Impressum und Datenschutz inklusive.', en: 'One elegant page with everything that matters. Legal notice and privacy policy included.' },
        points: { de: ['Design nach Ihrem Betrieb, für Handy und Desktop', 'Kontaktformular, Impressum und Datenschutzerklärung (nDSG)', 'Einmalpreis, keine monatliche Gebühr'],
                  en: ['Designed for your business, phone and desktop', 'Contact form, legal notice and privacy policy (nDSG)', 'One-time price, no monthly fee'] } },
      { id: 'multi', price: 1000, from: true,
        name: { de: 'Website mit mehreren Seiten', en: 'Multi-page website' },
        short: { de: 'Eigene Seiten für Leistungen, Team und Kontakt, mit Navigation.', en: 'Separate pages for services, team and contact, with navigation.' },
        points: { de: ['Mehrere Seiten mit Menü und eigener Struktur', 'Impressum und Datenschutzerklärung inklusive', 'Umfang und Fixpreis legen wir im Erstgespräch fest'],
                  en: ['Several pages with a menu and your own structure', 'Legal notice and privacy policy included', 'We fix scope and price in the first call'] } },
    ],
    website(id) { return KGC.websites.find(w => w.id === id); },

    industries: [
      { id: 'all', name: { de: 'Alle', en: 'All' } },
      { id: 'trade', name: { de: 'Handwerk', en: 'Trades' } },
      { id: 'repair', name: { de: 'Reparatur & Retail', en: 'Repair & retail' } },
      { id: 'beauty', name: { de: 'Beauty & Gesundheit', en: 'Beauty & health' } },
      { id: 'gastro', name: { de: 'Gastronomie', en: 'Hospitality' } },
      { id: 'office', name: { de: 'Büro & Beratung', en: 'Office & consulting' } },
    ],

    /* Packages. includes = offer ids; choice = pick-one groups */
    packages: [
      { id: 'starter', setup: 400, monthly: 49, includes: ['leads', 'workspace'], choice: [],
        name: { de: 'Starter', en: 'Starter' },
        tagline: { de: 'Das Fundament: nichts geht verloren.', en: 'The foundation: nothing gets lost.' } },
      { id: 'growth', setup: 900, monthly: 129, includes: ['leads', 'workspace', 'reviews'], choice: [['booking', 'repair']], featured: true,
        name: { de: 'Growth', en: 'Growth' },
        tagline: { de: 'Mehr Bewertungen, weniger Telefon.', en: 'More reviews, fewer phone calls.' } },
      { id: 'pro', setup: 1800, monthly: 249, includes: ['leads', 'workspace', 'reviews', 'missedcall'], choice: [['booking', 'repair'], ['quotes', 'invoices']],
        name: { de: 'Pro', en: 'Pro' },
        tagline: { de: 'Ihr Betrieb läuft, auch wenn Sie es nicht tun.', en: 'Your business runs, even when you don’t.' } },
    ],

    offer(id) { return KGC.offers.find(o => o.id === id); },
  };

  window.KGC = KGC;
  root.classList.add('js');

  let saved = null;
  try { saved = localStorage.getItem('kgc-lang'); } catch (e) {}
  root.setAttribute('data-lang', saved === 'en' ? 'en' : 'de');
  KGC.lang = saved === 'en' ? 'en' : 'de';

  document.addEventListener('DOMContentLoaded', () => {
    KGC.setLang(KGC.lang);

    // [data-quote] anywhere opens the configurator; value = package id or comma list of offer ids
    document.addEventListener('click', e => {
      const a = e.target.closest('[data-quote]');
      if (!a) return;
      e.preventDefault();
      const v = a.getAttribute('data-quote');
      KGC.openQuote(v ? (v.startsWith('web:') ? { web: v.slice(4) } : v.includes(',') || KGC.offer(v) ? { offers: v.split(',') } : { package: v }) : null);
    });
    // In-text links to the legal notices open the footer dialogs
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href="#datenschutz"], a[href="#impressum"]');
      if (!a) return;
      const d = document.getElementById(a.getAttribute('href') === '#datenschutz' ? 'footerDatenschutz' : 'footerImpressum');
      if (d && d.showModal) { e.preventDefault(); if (!d.open) d.showModal(); }
    });
    document.addEventListener('click', e => {
      const b = e.target.closest('[data-set-lang]');
      if (b) KGC.setLang(b.getAttribute('data-set-lang'));
    });

    // Reveal on scroll; anything in view or after 1.2s is shown regardless
    const els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !KGC.reducedMotion()) {
      const io = new IntersectionObserver(entries => entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
      els.forEach(el => io.observe(el));
      setTimeout(() => els.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight) el.classList.add('in'); }), 50);
    } else els.forEach(el => el.classList.add('in'));
  });
})();
