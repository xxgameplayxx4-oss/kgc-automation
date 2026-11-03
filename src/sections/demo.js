(function () {
  const L = (de, en) => ({ de, en });
  const BIZ = 'Meier Sanitär';
  const SC = {
    missedcall: {
      app: L('Nachrichten', 'Messages'),
      cta: L('Das will ich: Rückruf-SMS', 'I want this: missed-call text-back'),
      phone: [
        { at: 200, k: 'call', title: L('Anruf verpasst · 14:32', 'Missed call · 14:32'), sub: BIZ },
        { at: 1500, k: 'in', from: BIZ, text: L('Grüezi, wir sind gerade auf einer Baustelle. Antworten Sie kurz, worum es geht, oder buchen Sie hier einen Termin: <span class="demo-lnk">kgc.link/termin</span>', 'Hello, we are on a job site right now. Reply with what you need, or book a time here: <span class="demo-lnk">kgc.link/termin</span>') },
        { at: 3300, k: 'out', text: L('Boiler tropft. Wäre morgen früh möglich?', 'My boiler is dripping. Is tomorrow morning possible?') },
      ],
      log: [
        { at: 200, time: '+0:00', text: L('Verpasster Anruf erkannt', 'Missed call detected') },
        { at: 1500, time: '+0:04', text: L('SMS an den Kunden gesendet', 'Text sent to the customer'), sub: L('mit Buchungslink', 'with booking link') },
        { at: 3300, time: '+0:41', text: L('Antwort weitergeleitet an Sie (WhatsApp)', 'Reply forwarded to you (WhatsApp)') },
        { at: 3900, time: '+0:41', text: L('Eintrag in Ihrer Kundenliste', 'Entry in your customer list') },
      ],
      stat: { at: 4500, big: L('41 Sekunden.', '41 seconds.'), small: L('Ohne dass Sie das Telefon angefasst haben.', 'Without you touching the phone.') },
    },
    reviews: {
      app: L('Google-Bewertungen', 'Google reviews'),
      cta: L('Das will ich: Bewertungs-Autopilot', 'I want this: review autopilot'),
      branches: {
        hi: {
          toggle: L('Was passiert bei 2 Sternen?', 'What happens at 2 stars?'),
          phone: [
            { at: 200, k: 'review', stars: 5, text: L('Sehr schnell und sauber gearbeitet.', 'Very fast and clean work.'), who: L('Daniela K. · vor 2 Min.', 'Daniela K. · 2 min ago') },
            { at: 2800, k: 'reply', label: L('Antwort von ' + BIZ, 'Reply from ' + BIZ), text: L('Vielen Dank, Frau K. Es freut uns sehr, dass alles so reibungslos geklappt hat. Bis zum nächsten Mal.', 'Thank you, Ms K. We are delighted everything went so smoothly. See you next time.') },
          ],
          log: [
            { at: 200, time: '+0:00', text: L('Neue Bewertung erkannt', 'New review detected'), sub: L('5 Sterne', '5 stars') },
            { at: 1300, time: '+0:03', text: L('Antwort in Ihrem Ton entworfen', 'Reply drafted in your voice') },
            { at: 2000, time: '+0:04', text: L('4–5 Sterne → Antwort veröffentlicht', '4–5 stars → reply published'), branch: true },
            { at: 2800, time: '+0:06', text: L('Antwort ist auf Google sichtbar', 'Reply is live on Google') },
            { at: 3400, time: '+0:06', text: L('Eintrag im Bewertungsprotokoll', 'Entry in the review log') },
          ],
          stat: { at: 4200, big: L('6 Sekunden.', '6 seconds.'), small: L('Beantwortet, ohne dass Sie etwas freigeben mussten.', 'Answered without you approving anything.') },
        },
        lo: {
          toggle: L('Zurück zu 5 Sternen', 'Back to 5 stars'),
          phone: [
            { at: 200, k: 'review', stars: 2, text: L('Termin wurde verschoben, niemand hat Bescheid gesagt.', 'Appointment was moved and nobody told us.'), who: L('Thomas B. · vor 2 Min.', 'Thomas B. · 2 min ago') },
            { at: 2000, k: 'note', text: L('Keine öffentliche Antwort. Ihr Betrieb meldet sich persönlich.', 'No public reply. Your business gets in touch personally.') },
            { at: 3800, k: 'in', from: BIZ, text: L('Grüezi Herr B., das tut uns leid. Darf ich Sie heute noch zurückrufen? Marco Meier', 'Hello Mr B., we are sorry about that. May I call you back today? Marco Meier') },
          ],
          log: [
            { at: 200, time: '+0:00', text: L('Neue Bewertung erkannt', 'New review detected'), sub: L('2 Sterne', '2 stars') },
            { at: 1100, time: '+0:02', text: L('1–3 Sterne → keine öffentliche Antwort', '1–3 stars → no public reply'), branch: true },
            { at: 2000, time: '+0:04', text: L('Alarm an Sie (WhatsApp)', 'Alert to you (WhatsApp)'), sub: L('mit Entwurf für eine persönliche Antwort', 'with a draft for a personal reply') },
            { at: 3000, time: '+0:05', text: L('Bewertung als «offen» markiert', 'Review marked “open”') },
            { at: 3800, time: '+12:10', text: L('Sie melden sich beim Kunden', 'You get in touch with the customer') },
          ],
          stat: { at: 4400, big: L('Nichts geht öffentlich raus.', 'Nothing goes out publicly.'), small: L('Bevor Sie es gesehen haben.', 'Until you have seen it.') },
        },
      },
    },
    leads: {
      app: L('meiersanitaer.ch', 'meiersanitaer.ch'),
      cta: L('Das will ich: Anfragen-Fänger', 'I want this: lead catcher'),
      phone: [
        { at: 200, k: 'form', fields: [[L('Name', 'Name'), 'Anna Keller'], [L('Anliegen', 'Request'), L('Neues Bad, Offerte bitte', 'New bathroom, quote please')]], btn: L('Anfrage senden', 'Send enquiry') },
        { at: 1700, k: 'toast', text: L('Danke, Ihre Anfrage ist eingegangen.', 'Thank you, your enquiry has arrived.') },
        { at: 2800, k: 'mail', subj: L('Wir haben Ihre Anfrage erhalten', 'We have received your enquiry'), text: L('Grüezi Frau Keller, wir melden uns bis morgen 12 Uhr bei Ihnen. Meier Sanitär', 'Hello Ms Keller, we will get back to you by noon tomorrow. Meier Sanitär') },
      ],
      log: [
        { at: 200, time: '+0:00', text: L('Anfrage über die Website eingegangen', 'Website enquiry received') },
        { at: 1500, time: '+0:01', text: L('Eingangsbestätigung an den Kunden (E-Mail)', 'Confirmation sent to the customer (email)') },
        { at: 2300, time: '+0:02', text: L('Eintrag in Ihrer Tabelle', 'Entry in your sheet') },
        { at: 3100, time: '+0:03', text: L('WhatsApp an Sie', 'WhatsApp to you') },
        { at: 3800, time: '+24 h', pending: true, text: L('Erinnerung an Sie, falls niemand geantwortet hat', 'Reminder to you if nobody has replied') },
      ],
      stat: { at: 4500, big: L('3 Sekunden.', '3 seconds.'), small: L('Keine Anfrage geht mehr verloren.', 'No enquiry gets lost any more.') },
    },
  };

  const ICON_CALL = '<svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true"><path d="M5 3h3l1.5 4-2 1.3a9 9 0 0 0 4.2 4.2L13 10.500l4 1.500v3a2 2 0 0 1-2 2A12 12 0 0 1 3 5a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M13 3l4 4M17 3l-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
  const ICON_OK = '<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M4.800 8.200l2.200 2.200 4.200-4.600" fill="none" stroke="currentColor" stroke-width="1.400" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  let root, screen, logEl, statEl, appEl, tabs, branchBtn, ctaL, ctaBtn, stage;
  let cur = 'missedcall', branch = 'hi', timers = [], started = false;
  const t = KGC.t;

  function data() {
    const s = SC[cur];
    return s.branches ? s.branches[branch] : s;
  }

  function phoneItem(p) {
    const at = ' data-at="' + p.at + '"';
    switch (p.k) {
      case 'call': return '<div class="demo-it demo-p-call on"' + at + '>' + ICON_CALL + '<div><b>' + t(p.title) + '</b><small>' + p.sub + '</small></div></div>';
      case 'in': return '<div class="demo-it demo-bub demo-bub-in on"' + at + '><span class="demo-p-from">' + p.from + '</span>' + t(p.text) + '</div>';
      case 'out': return '<div class="demo-it demo-bub demo-bub-out on"' + at + '>' + t(p.text) + '</div>';
      case 'review': {
        let st = ''; for (let i = 0; i < 5; i++) st += i < p.stars ? '★' : '<i>★</i>';
        return '<div class="demo-it demo-card on"' + at + '><div class="demo-stars" role="img" aria-label="' + p.stars + ' ' + (KGC.lang === 'de' ? 'Sterne' : 'stars') + '">' + st + '</div><p>' + t(p.text) + '</p><span class="demo-p-from">' + t(p.who) + '</span></div>';
      }
      case 'reply': return '<div class="demo-it demo-card demo-reply on"' + at + '><span class="demo-p-from" style="margin:0 0 5px">' + t(p.label) + '</span><p>' + t(p.text) + '</p></div>';
      case 'note': return '<div class="demo-it demo-note on"' + at + '>' + t(p.text) + '</div>';
      case 'form': return '<div class="demo-it demo-card on"' + at + '>' + p.fields.map(f => '<span class="demo-field">' + t(f[0]) + '<span>' + t(f[1]) + '</span></span>').join('') + '<div class="demo-sendbtn">' + t(p.btn) + '</div></div>';
      case 'toast': return '<div class="demo-it demo-toast on"' + at + '>' + ICON_OK + t(p.text) + '</div>';
      case 'mail': return '<div class="demo-it demo-card demo-mail on"' + at + '><b>' + t(p.subj) + '</b><p>' + t(p.text) + '</p></div>';
    }
    return '';
  }

  function render() {
    const s = SC[cur], d = data();
    appEl.textContent = t(s.app);
    screen.innerHTML = d.phone.map(phoneItem).join('');
    logEl.innerHTML = d.log.map(l =>
      '<li class="demo-lg on' + (l.pending ? ' pending' : '') + (l.branch ? ' branch' : '') + '" data-at="' + l.at + '"><span class="demo-lg-t">' + l.time + '</span><span class="demo-lg-d"><i></i></span><span class="demo-lg-x">' + t(l.text) + (l.sub ? '<small>' + t(l.sub) + '</small>' : '') + '</span></li>').join('');
    statEl.innerHTML = '<b>' + t(d.stat.big) + '</b><span>' + t(d.stat.small) + '</span>';
    statEl.dataset.at = d.stat.at;
    statEl.classList.add('on');
    ctaL.textContent = t(s.cta);
    ctaBtn.setAttribute('data-quote', cur);
    if (s.branches) {
      branchBtn.hidden = false;
      branchBtn.textContent = t(s.branches[branch].toggle);
      branchBtn.setAttribute('aria-pressed', branch === 'lo' ? 'true' : 'false');
    } else branchBtn.hidden = true;
    tabs.forEach(b => {
      const on = b.dataset.sc === cur;
      b.setAttribute('aria-selected', on);
      b.tabIndex = on ? 0 : -1;
    });
    stage.setAttribute('aria-labelledby', 'demo-tab-' + cur);
  }

  function clear() { timers.forEach(clearTimeout); timers = []; }

  function play() {
    clear();
    const items = root.querySelectorAll('.demo-stage [data-at]');
    if (KGC.reducedMotion()) { items.forEach(e => e.classList.add('on')); return; }
    stage.classList.add('demo-noanim');
    items.forEach(e => e.classList.remove('on'));
    void stage.offsetWidth;
    stage.classList.remove('demo-noanim');
    items.forEach(e => timers.push(setTimeout(() => e.classList.add('on'), +e.dataset.at)));
  }

  function select(id, focus) {
    if (id === cur) return;
    cur = id; branch = 'hi';
    render();
    if (focus) tabs.find(b => b.dataset.sc === id).focus();
    started ? play() : 0;
  }

  document.addEventListener('DOMContentLoaded', () => {
    root = document.getElementById('demo');
    if (!root) return;
    screen = document.getElementById('demo-screen');
    logEl = document.getElementById('demo-log');
    statEl = document.getElementById('demo-stat');
    appEl = document.getElementById('demo-app');
    branchBtn = document.getElementById('demo-branch');
    ctaL = document.getElementById('demo-cta-l');
    ctaBtn = document.getElementById('demo-cta');
    stage = document.getElementById('demo-panel');
    tabs = Array.from(root.querySelectorAll('.demo-tab'));

    render();

    tabs.forEach((b, i) => {
      b.addEventListener('click', () => select(b.dataset.sc, false));
      b.addEventListener('keydown', e => {
        let n = null;
        if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') n = (i + tabs.length - 1) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        if (n !== null) { e.preventDefault(); select(tabs[n].dataset.sc, true); }
      });
    });
    document.getElementById('demo-replay').addEventListener('click', () => { started = true; play(); });
    branchBtn.addEventListener('click', () => { branch = branch === 'hi' ? 'lo' : 'hi'; render(); started = true; play(); });

    KGC.on('lang', () => { if (root) { render(); } });

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(es => {
        if (es.some(e => e.isIntersecting)) { io.disconnect(); started = true; play(); }
      }, { threshold: 0.3 });
      io.observe(stage);
    }
  });
})();
