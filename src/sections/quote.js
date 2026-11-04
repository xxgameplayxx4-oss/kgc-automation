(function () {
  function init() {
    const root = document.getElementById('quote-app');
    if (!root || !window.KGC) return;
    const K = KGC;
    const L = (de, en) => (K.lang === 'en' ? en : de);
    const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

    const CANTONS = [['AG', 'Aargau'], ['AR', 'Appenzell Ausserrhoden'], ['AI', 'Appenzell Innerrhoden'], ['BL', 'Basel-Landschaft'], ['BS', 'Basel-Stadt'], ['BE', 'Bern', 'Berne'],
      ['FR', 'Freiburg', 'Fribourg'], ['GE', 'Genf', 'Geneva'], ['GL', 'Glarus'], ['GR', 'Graubünden', 'Grisons'], ['JU', 'Jura'], ['LU', 'Luzern', 'Lucerne'], ['NE', 'Neuenburg', 'Neuchâtel'],
      ['NW', 'Nidwalden'], ['OW', 'Obwalden'], ['SH', 'Schaffhausen'], ['SZ', 'Schwyz'], ['SO', 'Solothurn'], ['SG', 'St. Gallen'], ['TI', 'Tessin', 'Ticino'], ['TG', 'Thurgau'], ['UR', 'Uri'],
      ['VD', 'Waadt', 'Vaud'], ['VS', 'Wallis', 'Valais'], ['ZG', 'Zug'], ['ZH', 'Zürich', 'Zurich']];
    const LANGS = [['gsw', 'Schweizerdeutsch', 'Swiss German'], ['de', 'Hochdeutsch', 'High German'], ['fr', 'Französisch', 'French'], ['it', 'Italienisch', 'Italian'], ['en', 'Englisch', 'English']];
    const STAFF = [['1', '1 Person', '1 person'], ['2-5', '2–5 Mitarbeitende', '2–5 employees'], ['6-20', '6–20 Mitarbeitende', '6–20 employees'], ['20+', 'Über 20 Mitarbeitende', 'Over 20 employees']];
    const STARTS = [['now', 'Sofort', 'Right away'], ['month', 'Innert 1 Monat', 'Within 1 month'], ['later', 'Später', 'Later']];
    const FACTOR = { '1': 1, '2-5': 1, '6-20': 1.15, '20+': 1.3 };
    const nm = id => K.t(K.offer(id).name);
    const pkgOf = id => K.packages.find(p => p.id === id);
    const order = ids => K.offers.map(o => o.id).filter(id => ids.includes(id));

    function fresh() {
      const choice = {};
      K.packages.forEach(p => { choice[p.id] = p.choice.map(g => g[0]); });
      return { pkg: 'growth', web: 'none', choice, picked: new Set(), extras: new Set(), industry: 'trade', industryOther: '', staff: '2-5', canton: 'AG', langs: new Set(['gsw']), start: 'month',
        step: 1, f: { name: '', firma: '', email: '', telefon: '', nachricht: '' }, consent: false, flash: new Set(), done: null, open: false };
    }
    let st = fresh();

    /* ---------- pricing ---------- */
    const r10 = n => Math.round(n / 10) * 10;
    function po(o) { const f = FACTOR[st.staff]; return { s: [r10(o.setup[0] * f), r10(o.setup[1] * f)], m: [Math.round(o.monthly[0] * f), Math.round(o.monthly[1] * f)] }; }
    function sel() {
      if (st.pkg === 'custom') return { p: null, base: [], extras: order([...st.picked]) };
      const p = pkgOf(st.pkg), base = order(p.includes.concat(st.choice[p.id]));
      return { p, base, extras: order([...st.extras].filter(id => !base.includes(id))) };
    }
    function totals() {
      const S = sel(); let s = [0, 0], m = [0, 0];
      if (S.p) { s = [S.p.setup, S.p.setup]; m = [S.p.monthly, S.p.monthly]; }
      S.extras.forEach(id => { const x = po(K.offer(id)); s[0] += x.s[0]; s[1] += x.s[1]; m[0] += x.m[0]; m[1] += x.m[1]; });
      /* Discount on the one-time cost of the automations (not the website): package 25 %, or by count 4/5/6+ = 30/35/40 %; the higher one applies */
      const n = S.base.length + S.extras.length, D = K.discount(n, !!S.p);
      const off = [K.r5(s[0] * D.rate), K.r5(s[1] * D.rate)];
      s = [s[0] - off[0], s[1] - off[1]];
      const W = K.website(st.web); if (W) { s[0] += W.price; s[1] += W.price; }
      return { S, W, D, off, n, setup: s, monthly: m, year: [s[0] + 12 * m[0], s[1] + 12 * m[1]] };
    }
    // cheapest package that covers every picked offer (one per choice group)
    function tip() {
      if (st.pkg !== 'custom' || !st.picked.size) return null;
      const ids = [...st.picked], raw = ids.reduce((a, id) => a + po(K.offer(id)).s[0], 0);
      const minSetup = raw - K.r5(raw * K.discount(ids.length, false).rate);
      for (const p of K.packages) {
        const n = p.includes.length + p.choice.length, pSetup = p.setup - K.r5(p.setup * K.discount(n, true).rate);
        if (!(minSetup > pSetup)) continue;
        const used = new Set(), choice = p.choice.map(g => g[0]); let ok = true;
        ids.forEach(id => {
          if (p.includes.includes(id)) return;
          const gi = p.choice.findIndex(g => g.includes(id));
          if (gi < 0 || used.has(gi)) { ok = false; return; }
          used.add(gi); choice[gi] = id;
        });
        if (ok) return { p, choice, save: minSetup - pSetup };
      }
      return null;
    }

    /* ---------- number tween ---------- */
    function setN(el, v, animate) {
      cancelAnimationFrame(el._raf);
      const from = el._v;
      if (!animate || from === undefined || from === v || K.reducedMotion()) { el._v = v; el.textContent = K.fmt(v); return; }
      const t0 = performance.now(), dur = 900;
      (function step(now) {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3), cur = from + (v - from) * e;
        el._v = cur; el.textContent = K.fmt(cur);
        if (p < 1) el._raf = requestAnimationFrame(step); else { el._v = v; el.textContent = K.fmt(v); }
      })(t0);
    }
    const money = k => `<span class="qm" data-m="${k}">CHF <span data-n="0"></span><span class="qd">–<span data-n="1"></span></span></span>`;
    function updateMoney(animate) {
      const T = totals();
      root.querySelectorAll('[data-m]').forEach(el => {
        const r = T[el.dataset.m], ns = el.querySelectorAll('[data-n]');
        setN(ns[0], r[0], animate); setN(ns[1], r[1], animate);
        el.querySelector('.qd').hidden = r[0] === r[1];
      });
    }

    /* ---------- summary ---------- */
    function itemsHtml(T) {
      const S = T.S, li = (cls, a, b) => `<li class="${cls}"><span>${a}</span><span class="v">${b || ''}</span></li>`;
      let h = '';
      if (S.p) {
        h += li('head', `${K.t(S.p.name)} ${L('Paket', 'package')}`, `${K.chf(S.p.setup)}`);
        S.base.forEach(id => { h += li('sub', nm(id)); });
        S.extras.forEach(id => { const x = po(K.offer(id)); h += li('', '+ ' + nm(id), K.range(x.s[0], x.s[1])); });
      } else if (S.extras.length) {
        S.extras.forEach(id => { const x = po(K.offer(id)); h += li('', nm(id), K.range(x.s[0], x.s[1])); });
      } else if (!T.W) h = `<li><span>${L('Noch nichts gewählt.', 'Nothing selected yet.')}</span></li>`;
      if (T.off[0] > 0) h += li('disc', K.t(T.D.label) + ' · ' + Math.round(T.D.rate * 100) + (K.lang === 'de' ? ' %' : '%'), '− ' + K.range(T.off[0], T.off[1]));
      if (T.W) h += li('', (S.p || S.extras.length ? '+ ' : '') + K.t(T.W.name), (T.W.from ? L('ab ', 'from ') : '') + K.chf(T.W.price));
      return h;
    }
    function updateSummary(animate) {
      const T = totals();
      root.querySelector('#q-items').innerHTML = itemsHtml(T);
      const t = tip(), tipEl = root.querySelector('#q-tip');
      if (t) {
        tipEl.hidden = false;
        tipEl.innerHTML = `<span>${L(`Tipp: Das ${K.t(t.p.name)}-Paket deckt das ab und spart ${K.chf(t.save)}.`, `Tip: the ${K.t(t.p.name)} package covers this and saves ${K.chf(t.save)}.`)}</span>
          <button type="button" class="btn btn-ghost" data-act="usetip">${L('Zum Paket wechseln', 'Switch to package')}</button>`;
      } else { tipEl.hidden = true; tipEl.innerHTML = ''; }
      const n20 = root.querySelector('#q-n20'), f = FACTOR[st.staff];
      let note = '';
      if (st.staff === '20+') note = st.pkg === 'custom' ? L('Inkl. Zuschlag von 30 % für die Betriebsgrösse. Wir bestätigen den Fixpreis im Erstgespräch.', 'Incl. a 30% surcharge for company size. We confirm the fixed price in the first call.') : L('Wir bestätigen den Fixpreis im Erstgespräch.', 'We confirm the fixed price in the first call.');
      else if (f > 1 && (st.pkg === 'custom' || T.S.extras.length)) note = L('Inkl. Zuschlag von 15 % für die Betriebsgrösse.', 'Incl. a 15% surcharge for company size.');
      if (T.W && T.W.from) note = (note ? note + ' ' : '') + (L('Die mehrseitige Website ist mit dem Startpreis von CHF 1’000 eingerechnet. Der Endpreis hängt von der Anzahl Seiten ab.', 'The multi-page website is counted at its starting price of CHF 1’000. The final price depends on the number of pages.'));
      n20.textContent = note; n20.hidden = !note;
      updateMoney(animate);
    }
    function summaryHtml() {
      return `<div class="quote-sum-bar">
          <div class="col"><span>${L('Einrichtung', 'Setup')}</span><b>${money('setup')}</b></div>
          <div class="col"><span>${L('Pro Monat', 'Per month')}</span><b>${money('monthly')}</b></div>
          <button type="button" class="quote-sum-toggle" data-act="sumtoggle" aria-expanded="${st.open}" aria-controls="q-sumbody">${st.open ? L('Weniger', 'Less') : L('Details', 'Details')}</button>
        </div>
        <div class="quote-sum-body" id="q-sumbody">
          <div class="quote-sum-title"><span>${L('Ihre Auswahl', 'Your selection')}</span><button type="button" class="quote-sum-close" data-act="sumtoggle" aria-label="${L('Schliessen', 'Close')}">&times;</button></div>
          <ul class="quote-items" id="q-items"></ul>
          <dl class="quote-tot">
            <div class="big"><dt>${L('Einrichtung (einmalig)', 'Setup (one-time)')}</dt><dd>${money('setup')}</dd></div>
            <div class="big"><dt>${L('Betreuung pro Monat', 'Care per month')}<small class="q-sup">${L('inkl. Support und 1 Gratis-Support-Anruf', 'incl. support and 1 free support call')}</small></dt><dd>${money('monthly')}</dd></div>
            <div class="yr"><dt>${L('Erstes Jahr total', 'First year total')}</dt><dd>${money('year')}</dd></div>
          </dl>
          <div class="quote-tip" id="q-tip" hidden></div>
          <p class="quote-fine n20" id="q-n20" hidden></p>
          <p class="quote-fine">${L('Richtpreise in CHF. Verbindliche Offerte nach dem Erstgespräch. 50 % der einmaligen Kosten sind bei Auftrag fällig, 50 % nach Fertigstellung.', 'Indicative prices in CHF. Binding quote after the first call. 50% of the one-time cost is due on order, 50% on completion.')}</p>
        </div>`;
    }

    /* ---------- step 1 ---------- */
    function rowHtml(id, kind) {
      const o = K.offer(id), x = po(o), on = kind === 'x' ? (st.pkg === 'custom' ? st.picked.has(id) : st.extras.has(id)) : false;
      const price = st.pkg === 'custom'
        ? `${L('ab', 'from')} ${K.chf(x.s[0])} · ${L('ab', 'from')} ${K.chf(x.m[0])}${L('/Mt.', '/mo.')}`
        : `${K.range(x.s[0], x.s[1])} · ${K.range(x.m[0], x.m[1])}${L('/Mt.', '/mo.')}`;
      return `<label class="quote-row${on ? ' is-on' : ''}" data-row="${id}" for="q-of-${id}"><input type="checkbox" id="q-of-${id}" data-offer="${id}"${on ? ' checked' : ''}>
        <span><span class="t">${nm(id)}</span><span class="s">${K.t(o.short)}</span></span><span class="p">${price}</span></label>`;
    }
    function step1Html() {
      const S = sel();
      const pk = K.packages.map(p => `<label class="quote-pk${st.pkg === p.id ? ' is-on' : ''}" for="q-pkg-${p.id}"><input class="quote-sr" type="radio" name="q-pkg" id="q-pkg-${p.id}" value="${p.id}"${st.pkg === p.id ? ' checked' : ''}>
        <b>${K.t(p.name)}</b><span>${K.chf(p.setup)} · ${K.chf(p.monthly)}${L('/Mt.', '/mo.')}</span></label>`).join('')
        + `<label class="quote-pk${st.pkg === 'custom' ? ' is-on' : ''}" for="q-pkg-custom"><input class="quote-sr" type="radio" name="q-pkg" id="q-pkg-custom" value="custom"${st.pkg === 'custom' ? ' checked' : ''}>
        <b>${L('Individuell', 'Custom')}</b><span>${L('Selbst zusammenstellen', 'Build your own')}</span></label>`;
      let h = `<fieldset class="quote-fs"><legend>${L('Paket wählen', 'Choose a package')}</legend><div class="quote-pkgs">${pk}</div></fieldset>`;
      if (S.p) {
        const p = S.p;
        h += `<fieldset class="quote-fs"><legend>${L('Im Paket enthalten', 'Included in the package')}</legend><div class="quote-rows">`
          + p.includes.map(id => `<div class="quote-row is-inc"><span class="mark" aria-hidden="true">✓</span><span><span class="t">${nm(id)}</span><span class="s">${K.t(K.offer(id).short)}</span></span><span class="p">${L('inklusive', 'included')}</span></div>`).join('')
          + `</div></fieldset>`;
        p.choice.forEach((g, gi) => {
          h += `<fieldset class="quote-fs"><legend>${L('Eine Wahl im Paket', 'One choice in the package')}</legend><div class="quote-rows">`
            + g.map(id => `<label class="quote-row${st.choice[p.id][gi] === id ? ' is-on' : ''}" for="q-ch-${gi}-${id}" data-row="${id}"><input type="radio" name="q-ch-${gi}" id="q-ch-${gi}-${id}" data-choice="${gi}" value="${id}"${st.choice[p.id][gi] === id ? ' checked' : ''}>
              <span><span class="t">${nm(id)}</span><span class="s">${K.t(K.offer(id).short)}</span></span><span class="p">${L('inklusive', 'included')}</span></label>`).join('')
            + `</div></fieldset>`;
        });
      }
      const rest = K.offers.map(o => o.id).filter(id => !S.base.includes(id));
      h += `<fieldset class="quote-fs"><legend>${S.p ? L('Weitere Automationen dazu', 'Add more automations') : L('Automationen wählen', 'Choose automations')}</legend>
        <p class="quote-sub">${S.p ? L('Optional. Jede Zusatzleistung wird zu Ihrer Auswahl addiert.', 'Optional. Each extra is added to your selection.') : L('Mehrfachauswahl möglich. Ab 4 Automationen gibt es Rabatt auf die Einrichtung.', 'Pick as many as you like. From 4 automations you get a discount on setup.')}</p>
        <div class="quote-rows">${rest.map(id => rowHtml(id, 'x')).join('')}</div></fieldset>`;
      const wopts = [{ id: 'none', name: { de: 'Keine Website nötig', en: 'No website needed' }, short: { de: 'Die Automationen werden an Ihre bestehende Seite angebunden.', en: 'The automations connect to your existing site.' } }].concat(K.websites);
      h += `<fieldset class="quote-fs"><legend>${L('Website dazu', 'Add a website')}</legend><div class="quote-rows">`
        + wopts.map(w => `<label class="quote-row${st.web === w.id ? ' is-on' : ''}" for="q-web-${w.id}" data-row="web-${w.id}"><input type="radio" name="q-web" id="q-web-${w.id}" value="${w.id}"${st.web === w.id ? ' checked' : ''}>
          <span><span class="t">${K.t(w.name)}</span><span class="s">${K.t(w.short)}</span></span><span class="p">${w.price ? (w.from ? L('ab ', 'from ') : '') + K.chf(w.price) + L(' einmalig', ' one-time') : ''}</span></label>`).join('')
        + `</div></fieldset>`;
      return h;
    }
    function renderStep1() {
      const ae = document.activeElement, id = ae && ae.id && root.contains(ae) ? ae.id : null;
      root.querySelector('#q-s1').innerHTML = step1Html();
      if (id) { const n = document.getElementById(id); if (n) n.focus({ preventScroll: true }); }
      if (st.flash.size) {
        st.flash.forEach(f => { const r = root.querySelector(`[data-row="${f}"]`); if (r) r.classList.add('quote-flash'); });
        const done = [...st.flash]; st.flash = new Set();
        setTimeout(() => done.forEach(f => { const r = root.querySelector(`[data-row="${f}"]`); if (r) r.classList.remove('quote-flash'); }), 2000);
      }
    }

    /* ---------- steps 2 and 3 ---------- */
    function selectHtml(id, label, opts, val) {
      return `<div class="quote-field"><label for="${id}">${label}</label><select id="${id}">${opts.map(o => `<option value="${o[0]}"${o[0] === val ? ' selected' : ''}>${esc(o[1])}</option>`).join('')}</select></div>`;
    }
    function step2Html() {
      const ind = K.industries.filter(i => i.id !== 'all').map(i => [i.id, K.t(i.name)]).concat([['other', L('Andere Branche …', 'Other industry …')]]);
      return `<div class="quote-fields">
        <div class="quote-field"><label for="q-industry">${L('Branche', 'Industry')}</label><select id="q-industry">${ind.map(o => `<option value="${o[0]}"${o[0] === st.industry ? ' selected' : ''}>${esc(o[1])}</option>`).join('')}</select>
          <input type="text" id="q-industry-other" class="quote-other" maxlength="80" autocomplete="off" aria-label="${L('Ihre Branche', 'Your industry')}" placeholder="${L('Ihre Branche, z. B. Treuhand', 'Your industry, e.g. accounting')}" value="${esc(st.industryOther)}"${st.industry === 'other' ? '' : ' hidden'}></div>
        ${selectHtml('q-staff', L('Anzahl Mitarbeitende', 'Number of employees'), STAFF.map(s => [s[0], L(s[1], s[2])]), st.staff)}
        ${selectHtml('q-canton', L('Standort (Kanton)', 'Location (canton)'), CANTONS.map(c => [c[0], L(c[1], c[2] || c[1])]), st.canton)}
        ${selectHtml('q-start', L('Startwunsch', 'Preferred start'), STARTS.map(s => [s[0], L(s[1], s[2])]), st.start)}
        <fieldset class="quote-field full quote-fs" style="margin:0"><legend class="quote-label" style="font-family:var(--f-body);font-size:var(--t-sm);letter-spacing:0;text-transform:none;color:var(--ink);font-weight:600;margin-bottom:6px">${L('Sprache der Kundenkommunikation', 'Language of customer communication')}</legend>
          <div class="quote-checks">${LANGS.map(l => `<label class="quote-check"><input type="checkbox" data-lang-opt="${l[0]}"${st.langs.has(l[0]) ? ' checked' : ''}>${L(l[1], l[2])}</label>`).join('')}</div></fieldset>
      </div>`;
    }
    function fieldHtml(name, label, type, opts) {
      opts = opts || {};
      const req = opts.req ? ' <span aria-hidden="true">*</span>' : '', common = `id="q-${name}" name="${name}"${opts.req ? ' required' : ''} aria-describedby="q-err-${name}"${opts.ac ? ` autocomplete="${opts.ac}"` : ''}`;
      const ctl = type === 'textarea' ? `<textarea ${common} rows="4">${esc(st.f[name])}</textarea>` : `<input type="${type}" ${common} value="${esc(st.f[name])}"${type === 'email' ? ' inputmode="email"' : ''}>`;
      return `<div class="quote-field${opts.full ? ' full' : ''}"><label for="q-${name}">${label}${req}</label>${ctl}<p class="quote-err" id="q-err-${name}"></p></div>`;
    }
    function step3Html() {
      return `<div class="quote-fields">
        ${fieldHtml('name', L('Name', 'Name'), 'text', { req: 1, ac: 'name' })}
        ${fieldHtml('firma', L('Firma', 'Company'), 'text', { req: 1, ac: 'organization' })}
        ${fieldHtml('email', L('E-Mail', 'Email'), 'email', { req: 1, ac: 'email' })}
        ${fieldHtml('telefon', L('Telefon', 'Phone'), 'tel', { ac: 'tel' })}
        ${fieldHtml('nachricht', L('Nachricht', 'Message'), 'textarea', { full: 1 })}
      </div>
      <div class="quote-field full"><label class="quote-consent" for="q-consent"><input type="checkbox" id="q-consent" name="consent" required aria-describedby="q-err-consent"${st.consent ? ' checked' : ''}>
        <span>${L('Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage gespeichert werden (siehe <a href="#datenschutz">Datenschutz</a>).', 'I agree that my details are stored to process this request (see <a href="#datenschutz">privacy</a>).')} <span aria-hidden="true">*</span></span></label>
        <p class="quote-err" id="q-err-consent"></p></div>`;
    }
    const TITLES = () => [L('Paket oder einzeln', 'Package or individual'), L('Ihr Betrieb', 'Your business'), L('Kontakt', 'Contact')];

    /* ---------- build ---------- */
    function build() {
      const T = TITLES();
      root.innerHTML = `<div class="quote-grid">
        <aside class="quote-sum${st.open ? ' is-open' : ''}" id="q-sum" aria-label="${L('Live-Zusammenfassung', 'Live summary')}">${summaryHtml()}</aside>
        <form class="quote-form" id="q-form" name="offerte" novalidate>
          <p hidden><label>Bot <input name="_honey" tabindex="-1" autocomplete="off"></label></p>
          <ol class="quote-steps">${T.map((t, i) => `<li><button type="button" data-step="${i + 1}"><span class="n">${i + 1}</span><span>${t}</span></button></li>`).join('')}</ol>
          ${T.map((t, i) => `<div class="quote-panel" id="q-p${i + 1}" data-panel="${i + 1}"><h3 id="q-h${i + 1}" tabindex="-1">${t}</h3><div id="q-s${i + 1}"></div></div>`).join('')}
          <div class="quote-nav">
            <button type="button" class="btn btn-ghost" data-act="prev">${L('Zurück', 'Back')}</button>
            <button type="button" class="btn quote-next" data-act="next">${L('Weiter', 'Next')}</button>
            <button type="submit" class="btn btn-cta btn-lg" id="q-submit">${L('Offerte anfordern', 'Request my quote')} <span class="arrow" aria-hidden="true">→</span></button>
          </div>
        </form>
      </div>`;
      // form attributes: no action, no mailto
      root.querySelector('#q-form').removeAttribute('action');
      renderStep1();
      root.querySelector('#q-s2').innerHTML = step2Html();
      root.querySelector('#q-s3').innerHTML = step3Html();
      updateSummary(false);
      showStep(false);
    }
    function showStep(focus) {
      root.querySelectorAll('.quote-panel').forEach(p => { p.hidden = +p.dataset.panel !== st.step; });
      root.querySelectorAll('.quote-steps button').forEach(b => {
        const n = +b.dataset.step;
        if (n === st.step) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
        b.parentElement.classList.toggle('done', n < st.step);
      });
      const prev = root.querySelector('[data-act="prev"]'), next = root.querySelector('[data-act="next"]'), sub = root.querySelector('#q-submit');
      prev.style.visibility = st.step === 1 ? 'hidden' : 'visible';
      next.hidden = st.step === 3; sub.hidden = st.step !== 3;
      if (focus) { const h = root.querySelector('#q-h' + st.step); if (h) h.focus(); }
    }
    function go(n, focus) { st.step = Math.max(1, Math.min(3, n)); showStep(focus !== false); }
    function refresh() { renderStep1(); updateSummary(true); }

    /* ---------- validation ---------- */
    const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    function errFor(name) {
      const v = (st.f[name] || '').trim();
      if (name === 'name') return v ? '' : L('Bitte geben Sie Ihren Namen ein.', 'Please enter your name.');
      if (name === 'firma') return v ? '' : L('Bitte geben Sie den Namen Ihrer Firma ein.', 'Please enter your company name.');
      if (name === 'email') return !v ? L('Bitte geben Sie Ihre E-Mail-Adresse ein.', 'Please enter your email address.') : (EMAIL.test(v) ? '' : L('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'Please enter a valid email address.'));
      if (name === 'consent') return st.consent ? '' : L('Bitte bestätigen Sie das Einverständnis, damit wir Ihre Anfrage bearbeiten dürfen.', 'Please confirm your consent so we can handle your request.');
      return '';
    }
    function showErr(name) {
      const e = errFor(name), box = root.querySelector('#q-err-' + name), inp = root.querySelector(name === 'consent' ? '#q-consent' : '#q-' + name);
      if (box) box.textContent = e;
      if (inp) { if (e) inp.setAttribute('aria-invalid', 'true'); else inp.removeAttribute('aria-invalid'); }
      return e;
    }

    /* ---------- receipt ---------- */
    function sections(lang) {
      const l = (de, en) => (lang === 'en' ? en : de), T = totals(), S = T.S, name = id => K.offer(id).name[lang];
      const ind = K.industries.find(i => i.id === st.industry), cn = CANTONS.find(c => c[0] === st.canton), stf = STAFF.find(s => s[0] === st.staff), start = STARTS.find(s => s[0] === st.start);
      const rng = r => K.range(r[0], r[1]);
      const choice = [];
      if (S.p) {
        choice.push([l('Paket', 'Package'), S.p.name[lang]]);
        choice.push([l('Enthalten', 'Included'), S.base.map(name).join(', ')]);
        if (S.extras.length) choice.push([l('Zusätzlich', 'Extras'), S.extras.map(name).join(', ')]);
      } else choice.push([l('Individuell', 'Custom'), S.extras.length ? S.extras.map(name).join(', ') : '–']);
      if (T.W) choice.push([l('Website', 'Website'), T.W.name[lang] + ' (' + (T.W.from ? l('ab ', 'from ') : '') + K.chf(T.W.price) + ')']);
      const f = st.f;
      return [
        { title: l('Auswahl', 'Selection'), rows: choice },
        { title: l('Richtpreise', 'Indicative prices'), rows: (T.off[0] > 0 ? [[T.D.label[lang] + ' (' + Math.round(T.D.rate * 100) + (lang === 'de' ? ' %' : '%') + ')', '− ' + rng(T.off)]] : []).concat([[l('Einrichtung (einmalig)', 'Setup (one-time)'), rng(T.setup)], [l('Betreuung pro Monat', 'Care per month'), rng(T.monthly)], [l('Erstes Jahr total', 'First year total'), rng(T.year), 'tot']]) },
        { title: l('Betrieb', 'Business'), rows: [[l('Branche', 'Industry'), st.industry === 'other' ? (st.industryOther.trim() || l('Andere', 'Other')) : (ind ? ind.name[lang] : '')], [l('Mitarbeitende', 'Employees'), l(stf[1], stf[2])], [l('Kanton', 'Canton'), l(cn[1], cn[2] || cn[1])],
          [l('Kundensprachen', 'Customer languages'), LANGS.filter(x => st.langs.has(x[0])).map(x => l(x[1], x[2])).join(', ') || '–'], [l('Start', 'Start'), l(start[1], start[2])]] },
        { title: l('Kontakt', 'Contact'), rows: [[l('Name', 'Name'), f.name.trim()], [l('Firma', 'Company'), f.firma.trim()], [l('E-Mail', 'Email'), f.email.trim()]]
          .concat(f.telefon.trim() ? [[l('Telefon', 'Phone'), f.telefon.trim()]] : []).concat(f.nachricht.trim() ? [[l('Nachricht', 'Message'), f.nachricht.trim()]] : []) },
      ];
    }
    function textOf(lang) {
      const l = (de, en) => (lang === 'en' ? en : de);
      return l('KGC-Offertanfrage', 'KGC quote request') + ' ' + new Date().toLocaleDateString('de-CH') + '\n\n'
        + sections(lang).map(s => s.title.toUpperCase() + '\n' + s.rows.map(r => r[0] + ': ' + r[1]).join('\n')).join('\n\n')
        + '\n\n' + l('Richtpreise in CHF. Verbindliche Offerte nach dem Erstgespräch. 50 % der einmaligen Kosten sind bei Auftrag fällig, 50 % nach Fertigstellung.', 'Indicative prices in CHF. Binding quote after the first call. 50% of the one-time cost is due on order, 50% on completion.');
    }
    function receiptHtml() {
      return `<div class="quote-receipt" id="q-receipt"><h4><span>${L('Ihre Anfrage', 'Your request')}</span><span>${new Date().toLocaleDateString('de-CH')}</span></h4>`
        + sections(K.lang).map(s => `<section><dl>${s.rows.map(r => `<div class="${r[2] || ''}"><dt>${esc(r[0])}</dt><dd>${esc(r[1])}</dd></div>`).join('')}</dl></section>`).join('')
        + `<p class="fine">${L('Richtpreise in CHF. Verbindliche Offerte nach dem Erstgespräch. 50 % der einmaligen Kosten sind bei Auftrag fällig, 50 % nach Fertigstellung.', 'Indicative prices in CHF. Binding quote after the first call. 50% of the one-time cost is due on order, 50% on completion.')}</p></div>`;
    }
    function renderDone() {
      const first = st.f.name.trim().split(/\s+/)[0] || '';
      const ok = st.done.ok;
      root.innerHTML = `<div class="quote-done${ok ? '' : ' is-fail'}">
        <div ${ok ? '' : 'class="quote-fail"'}>
          <h3 id="q-done-h" tabindex="-1">${ok ? L(`Danke, ${esc(first)}. Ihre Anfrage ist eingegangen.`, `Thank you, ${esc(first)}. Your request has arrived.`) : L('Die Anfrage konnte nicht gesendet werden.', 'The request could not be sent.')}</h3>
          <p class="lede" style="margin-top:12px">${ok ? L('Sie erhalten innert 24 Stunden (werktags) eine Antwort von Khang Cung.', 'You will get a reply from Khang Cung within 24 hours (working days).') : L('Bitte kopieren Sie die Zusammenfassung und senden Sie sie an khangcung196@gmail.com.', 'Please copy the summary and send it to khangcung196@gmail.com.')}</p>
        </div>
        ${receiptHtml()}
        <div class="quote-actions">
          <button type="button" class="btn btn-ghost" data-act="copy" id="q-copy">${L('Zusammenfassung kopieren', 'Copy summary')}</button>
          ${ok ? '' : `<button type="button" class="btn btn-ghost" data-act="back">${L('Zurück zum Formular', 'Back to the form')}</button>`}
          <button type="button" class="btn btn-ghost" data-act="reset">${L('Neue Offerte', 'New quote')}</button>
        </div><p class="quote-fine" id="q-copied" role="status"></p></div>`;
      const h = root.querySelector('#q-done-h'); if (h && st.done.focus) { h.focus(); st.done.focus = false; }
    }
    function selectReceipt() {
      const el = root.querySelector('#q-receipt'); if (!el) return;
      const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    }
    function copy() {
      const t = textOf(K.lang), msg = root.querySelector('#q-copied');
      const done = ok => { msg.textContent = ok ? L('Zusammenfassung kopiert.', 'Summary copied.') : L('Text markiert. Bitte mit Strg+C / Cmd+C kopieren.', 'Text selected. Please copy with Ctrl+C / Cmd+C.'); };
      try { navigator.clipboard.writeText(t).then(() => done(true)).catch(() => { selectReceipt(); done(false); }); }
      catch (e) { selectReceipt(); done(false); }
    }

    /* ---------- submit ---------- */
    function shouldPost() {
      const h = location.hostname;
      return !h.includes('claude') && /^https?:$/.test(location.protocol);
    }
    async function submit() {
      const bad = ['name', 'firma', 'email', 'consent'].filter(n => showErr(n));
      if (bad.length) {
        go(3, false);
        const el = root.querySelector(bad[0] === 'consent' ? '#q-consent' : '#q-' + bad[0]); if (el) el.focus();
        return;
      }
      if (root.querySelector('[name="_honey"]').value) return;
      const btn = root.querySelector('#q-submit'); btn.disabled = true; btn.setAttribute('aria-busy', 'true');
      btn.innerHTML = '<span class="quote-spin" aria-hidden="true"></span>' + L('Wird gesendet…', 'Sending…');
      let ok = true;
      if (shouldPost()) {
        const fields = { name: st.f.name.trim(), firma: st.f.firma.trim(), email: st.f.email.trim(), telefon: st.f.telefon.trim(), nachricht: st.f.nachricht.trim(), zusammenfassung: textOf('de') + (K.lang === 'en' ? '\n\n(Seitensprache: Englisch)' : '') };
        /* 1) FormSubmit e-mails the request straight to KGC. 2) Netlify Forms keeps a copy in the Netlify dashboard (only works when hosted on Netlify). */
        const viaMail = fetch('https://formsubmit.co/ajax/khangcung196@gmail.com', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.assign({ _subject: 'Neue Offertanfrage – KGC Automation', _template: 'table', _captcha: 'false', _replyto: fields.email, _honey: root.querySelector('[name="_honey"]').value }, fields)) })
          .then(async r => { let j = null; try { j = await r.json(); } catch (e) {} return r.ok && !!j && (j.success === true || j.success === 'true'); }).catch(() => false);
        const viaNetlify = fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: new URLSearchParams(Object.assign({ 'form-name': 'offerte-anfrage', 'bot-field': '' }, fields)).toString() })
          .then(r => r.ok).catch(() => false);
        const [a, b] = await Promise.all([viaMail, viaNetlify]);
        ok = a || b;
      }
      st.done = { ok, focus: true };
      renderDone();
      root.scrollIntoView({ block: 'start' });
    }

    /* ---------- events ---------- */
    function setPackage(id) {
      if (id === 'custom' && st.pkg !== 'custom') { const S = sel(); st.picked = new Set(S.base.concat(S.extras)); }
      st.pkg = id; refresh();
    }
    root.addEventListener('change', e => {
      const t = e.target;
      if (t.name === 'q-pkg') return setPackage(t.value);
      if (t.name === 'q-web') { st.web = t.value; return refresh(); }
      if (t.dataset.choice !== undefined) { st.choice[st.pkg][+t.dataset.choice] = t.value; return refresh(); }
      if (t.dataset.offer) {
        const set = st.pkg === 'custom' ? st.picked : st.extras;
        if (t.checked) set.add(t.dataset.offer); else set.delete(t.dataset.offer);
        return refresh();
      }
      if (t.dataset.langOpt) { if (t.checked) st.langs.add(t.dataset.langOpt); else st.langs.delete(t.dataset.langOpt); return; }
      if (t.id === 'q-industry') {
        st.industry = t.value;
        const o = root.querySelector('#q-industry-other');
        if (o) { o.hidden = t.value !== 'other'; if (!o.hidden) o.focus(); }
      }
      else if (t.id === 'q-staff') { st.staff = t.value; refresh(); }
      else if (t.id === 'q-canton') st.canton = t.value;
      else if (t.id === 'q-start') st.start = t.value;
      else if (t.id === 'q-consent') { st.consent = t.checked; showErr('consent'); }
    });
    root.addEventListener('input', e => {
      const t = e.target;
      if (t.id === 'q-industry-other') { st.industryOther = t.value; return; }
      if (t.id && t.id.startsWith('q-') && t.name in st.f) { st.f[t.name] = t.value; if (t.getAttribute('aria-invalid')) showErr(t.name); }
    });
    root.addEventListener('focusout', e => {
      const t = e.target;
      if (t.id && t.name && ['name', 'firma', 'email'].includes(t.name) && t.id.startsWith('q-')) showErr(t.name);
    });
    const mqSheet = window.matchMedia('(max-width: 1040px)');
    function setSum(open) {
      st.open = !!open;
      const s = root.querySelector('#q-sum'); if (!s) return;
      s.classList.toggle('is-open', st.open);
      const a = s.querySelector('.quote-sum-toggle');
      if (a) { a.setAttribute('aria-expanded', st.open); a.textContent = st.open ? L('Weniger', 'Less') : L('Details', 'Details'); }
      document.documentElement.classList.toggle('quote-sheet-lock', st.open && mqSheet.matches);
    }
    document.addEventListener('pointerdown', e => {
      if (st.open && mqSheet.matches && !e.target.closest('#q-sum')) setSum(false);
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && st.open && mqSheet.matches) { setSum(false); const b = root.querySelector('.quote-sum-toggle'); if (b) b.focus(); }
    });
    const onMq = () => { if (!mqSheet.matches) document.documentElement.classList.remove('quote-sheet-lock'); else if (st.open) document.documentElement.classList.add('quote-sheet-lock'); };
    if (mqSheet.addEventListener) mqSheet.addEventListener('change', onMq); else mqSheet.addListener(onMq);
    window.addEventListener('resize', () => { if (!mqSheet.matches && st.open) setSum(false); });
    root.addEventListener('click', e => {
      const sb = e.target.closest('[data-step]'); if (sb) return go(+sb.dataset.step);
      const a = e.target.closest('[data-act]'); if (!a) return;
      const act = a.dataset.act;
      if (act === 'next') go(st.step + 1);
      else if (act === 'prev') go(st.step - 1);
      else if (act === 'sumtoggle') setSum(!st.open);
      else if (act === 'usetip') {
        const t = tip(); if (!t) return;
        st.pkg = t.p.id; st.choice[t.p.id] = t.choice; st.picked = new Set(); go(1, false); refresh();
      }
      else if (act === 'copy') copy();
      else if (act === 'reset') { st = fresh(); build(); root.closest('section').scrollIntoView({ block: 'start' }); }
      else if (act === 'back') { st.done = null; st.step = 3; build(); }
    });
    root.addEventListener('submit', e => {
      e.preventDefault();
      if (st.step < 3) go(st.step + 1); else submit();
    });

    K.on('lang', () => { if (st.done) { st.done.focus = false; renderDone(); } else build(); });
    K.on('quote:preset', p => {
      if (st.done) { st = fresh(); }
      if (!p) { build(); return; }
      if (p.web && K.website(p.web)) { st.web = p.web; st.step = 1; st.flash.add('web-' + p.web); build(); return; }
      if (p.package && pkgOf(p.package)) { st.pkg = p.package; st.step = 1; build(); return; }
      if (p.offers && p.offers.length) {
        const ids = p.offers.filter(id => K.offer(id)); st.step = 1;
        if (st.pkg === 'custom') ids.forEach(id => { st.picked.add(id); st.flash.add(id); });
        else {
          const pk = pkgOf(st.pkg);
          ids.forEach(id => {
            const S = sel();
            if (S.base.includes(id)) { st.flash.add(id); return; }
            const gi = pk.choice.findIndex(g => g.includes(id));
            if (gi >= 0) st.choice[pk.id][gi] = id; else st.extras.add(id);
            st.flash.add(id);
          });
        }
        build();
      }
    });
    build();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
