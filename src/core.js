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

    reducedMotion: () => matchMedia('(prefers-reduced-motion: reduce)').matches,

    /* The nine automations. Prices: [min, max] in CHF. */
    offers: [
      { id: 'reviews', setup: [300, 600], monthly: [49, 99], industries: ['trade', 'repair', 'beauty', 'gastro'],
        name: { de: 'Google-Bewertungs-Autopilot', en: 'Google review autopilot' },
        short: { de: 'Mehr Bewertungen, jede beantwortet, schlechte nie öffentlich überrascht.', en: 'More reviews, every one answered, bad ones caught before they hurt.' },
        steps: { de: ['Nach dem Auftrag: SMS mit direktem Bewertungslink', 'KI entwirft eine Antwort in Ihrem Ton', '4–5 Sterne: automatisch veröffentlicht. 1–3 Sterne: Alarm an Sie'],
                 en: ['After the job: SMS with a direct review link', 'AI drafts a reply in your voice', '4–5 stars: posted automatically. 1–3 stars: alert to you'] } },
      { id: 'leads', setup: [250, 500], monthly: [29, 59], industries: ['trade', 'repair', 'beauty', 'gastro', 'office'],
        name: { de: 'Anfragen-Fänger für Ihre Website', en: 'Website lead catcher' },
        short: { de: 'Keine Anfrage geht mehr verloren.', en: 'No enquiry ever gets lost again.' },
        steps: { de: ['Sofortige Eingangsbestätigung an den Kunden', 'Anfrage landet in Ihrer Tabelle', 'WhatsApp an Sie, Erinnerung nach 24 h ohne Antwort'],
                 en: ['Instant confirmation to the customer', 'Enquiry lands in your sheet', 'WhatsApp to you, reminder after 24 h without reply'] } },
      { id: 'missedcall', setup: [400, 800], monthly: [59, 129], industries: ['trade'],
        name: { de: 'Rückruf-SMS bei verpassten Anrufen', en: 'Missed-call text-back' },
        short: { de: 'Wer anruft, während Sie arbeiten, bekommt innert einer Minute eine Antwort.', en: 'Callers you miss on the job get a reply within a minute.' },
        steps: { de: ['Anruf verpasst', 'SMS innert 60 Sekunden mit Buchungslink', 'Antwort des Kunden geht direkt an Sie'],
                 en: ['Call missed', 'SMS within 60 seconds with booking link', 'Customer reply goes straight to you'] } },
      { id: 'booking', setup: [300, 700], monthly: [39, 89], industries: ['repair', 'beauty', 'office'],
        name: { de: 'Online-Buchung mit Erinnerungen', en: 'Online booking + reminders' },
        short: { de: 'Kunden buchen selbst, auch um 22 Uhr auf dem Sofa. Weniger Nichterscheinen.', en: 'Customers book themselves, even at 10 pm on the sofa. Fewer no-shows.' },
        steps: { de: ['Kunde wählt einen freien Termin', 'Bestätigung sofort', 'Erinnerung 24 h vorher'],
                 en: ['Customer picks a free slot', 'Instant confirmation', 'Reminder 24 h before'] } },
      { id: 'repair', setup: [300, 600], monthly: [39, 79], industries: ['repair'],
        name: { de: 'Reparatur-Statusmeldungen', en: 'Repair status updates' },
        short: { de: 'Schluss mit «Ist mein Handy schon fertig?»', en: 'No more "is my phone ready yet?" calls.' },
        steps: { de: ['Sie ändern den Status in einer einfachen Liste', 'Kunde erhält automatisch SMS oder WhatsApp', '«Abholbereit» inklusive Öffnungszeiten'],
                 en: ['You change the status in a simple list', 'Customer gets an SMS or WhatsApp automatically', '"Ready for pickup" including opening hours'] } },
      { id: 'quotes', setup: [800, 1500], monthly: [79, 149], industries: ['trade', 'office'],
        name: { de: 'Offerten-Generator', en: 'Quote generator' },
        short: { de: 'Offerten in 10 Minuten statt einem Abend am Schreibtisch.', en: 'Quotes in 10 minutes instead of an evening at the desk.' },
        steps: { de: ['Kurzes Formular mit Fotos', 'KI schreibt eine saubere Offerte als PDF in Ihrem Design', 'Nachfassen nach 5 Tagen, automatisch'],
                 en: ['Short form with photos', 'AI writes a clean, branded PDF quote', 'Follow-up after 5 days, automatically'] } },
      { id: 'invoices', setup: [400, 800], monthly: [49, 99], industries: ['trade', 'repair', 'beauty', 'gastro', 'office'],
        name: { de: 'Zahlungserinnerungen', en: 'Invoice reminders' },
        short: { de: 'Sie haben die Arbeit gemacht. Das System kümmert sich ums Geld.', en: 'You did the work. The system chases the money.' },
        steps: { de: ['Offene Rechnungen werden geprüft (z. B. bexio)', 'Höfliche Erinnerung nach 7, 14 und 30 Tagen', 'Danach Hinweis an Sie'],
                 en: ['Open invoices are checked (e.g. bexio)', 'Polite reminders at 7, 14 and 30 days', 'Then a note to you'] } },
      { id: 'inbox', setup: [500, 1000], monthly: [79, 149], industries: ['trade', 'repair', 'beauty', 'gastro', 'office'],
        name: { de: 'KI-Posteingangs-Assistent', en: 'AI inbox assistant' },
        short: { de: 'Mails sortiert, Antworten vorbereitet, auf Wunsch in Schweizerdeutsch.', en: 'Emails sorted, replies drafted, in Swiss German if you like.' },
        steps: { de: ['Neue Mails werden sortiert: Offerte, Reklamation, Lieferant, Spam', 'KI legt einen Antwortentwurf an', 'Sie prüfen und senden'],
                 en: ['New mail sorted: quote, complaint, supplier, spam', 'AI prepares a draft reply', 'You check and send'] } },
      { id: 'workspace', setup: [150, 400], monthly: [20, 50], industries: ['trade', 'repair', 'beauty', 'gastro', 'office'],
        name: { de: 'E-Mail & Cloud mit Betreuung', en: 'Email + cloud with support' },
        short: { de: 'Eine Ansprechperson für Website, E-Mail und Dateien.', en: 'One contact for website, email and files.' },
        steps: { de: ['E-Mail-Adressen auf Ihrer Domain', 'Gemeinsame Ablage für Dokumente', 'Neue Benutzer, Passwörter, Änderungen: erledigt'],
                 en: ['Email addresses on your domain', 'Shared document storage', 'New users, passwords, changes: handled'] } },
    ],

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
      KGC.openQuote(v ? (v.includes(',') || KGC.offer(v) ? { offers: v.split(',') } : { package: v }) : null);
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
