(function () {
  function init() {
    const $ = id => document.getElementById(id);
    const calls = $('roi-calls'), job = $('roi-job'), hours = $('roi-hours'), rate = $('roi-rate');
    if (!calls || !window.KGC) return;
    const K = KGC;
    const COST = 900 / 12 + 129; // Growth per month incl. setup spread over 12 months
    const els = { loss: $('roi-loss'), time: $('roi-time'), total: $('roi-total'), lossV: $('roi-bar-loss-v') };
    const cur = {};
    const raf = {};
    let srTimer;

    function tween(key, to, fmt) {
      const el = els[key]; cancelAnimationFrame(raf[key]);
      const from = cur[key];
      if (from === undefined || K.reducedMotion() || from === to) { cur[key] = to; el.textContent = fmt(to); return; }
      const t0 = performance.now(), dur = 900;
      (function step(now) {
        const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
        cur[key] = from + (to - from) * e; el.textContent = fmt(cur[key]);
        if (p < 1) raf[key] = requestAnimationFrame(step); else { cur[key] = to; el.textContent = fmt(to); }
      })(t0);
    }
    const L = (de, en) => K.lang === 'en' ? en : de;

    function setFill(inp) { inp.style.setProperty('--fill', ((inp.value - inp.min) / (inp.max - inp.min) * 100) + '%'); }

    function update(instant) {
      [calls, job, hours].forEach(setFill);
      const c = +calls.value, j = +job.value, h = +hours.value, r = +rate.value;
      $('roi-calls-out').textContent = c;
      $('roi-job-out').textContent = K.chf(j);
      $('roi-hours-out').textContent = h + ' h';
      const loss = c * 4.33 * 0.35 * 0.6 * j;
      const time = h * 4.33 * 0.6 * r;
      const total = loss + time;
      if (instant) cur.loss = cur.time = cur.total = undefined;
      const f = n => K.chf(n);
      tween('loss', loss, f); tween('time', time, f); tween('total', total, f);

      const max = Math.max(total, COST, 1);
      $('roi-bar-loss').style.width = (total > 0 ? Math.max(1.5, total / max * 100) : 0) + '%';
      $('roi-bar-cost').style.width = Math.max(1.5, COST / max * 100) + '%';
      els.lossV.textContent = K.chf(total);

      let msg = '', ratio = '';
      if (total < 1) msg = L('Mit diesen Angaben gibt es kaum etwas zu gewinnen. Verschieben Sie die Regler auf Ihre Situation.', 'With these numbers there is little to win. Move the sliders to match your situation.');
      else if (loss < 1) msg = L('Kaum Verluste bei Anrufen. Dann lohnt sich vor allem der Zeitgewinn.', 'Hardly any loss from calls. Then the time saved is what counts.');
      else if (time < 1) msg = L('Kein Büroaufwand angegeben. Dann geht es vor allem um die Anrufe, die heute verloren gehen.', 'No desk work entered. Then it is mainly about the calls that are lost today.');
      else msg = L('So viel bleibt jeden Monat liegen, ohne dass es jemand bemerkt.', 'This is what is left on the table every month, unnoticed.');
      if (total >= 1) {
        const x = total / COST;
        if (x >= 1.5) { const s = x >= 10 ? String(Math.round(x)) : x.toFixed(1); ratio = '≈ ' + (K.lang === 'en' ? s : s.replace('.', ',')) + L('× Ihr Monatspreis', '× your monthly price'); }
        else ratio = L('Etwa so viel wie der Monatspreis. Der Gewinn liegt dann in der Ruhe.', 'About the size of the monthly price. The gain is then peace of mind.');
      }
      $('roi-msg').textContent = msg; $('roi-ratio').textContent = ratio;
      clearTimeout(srTimer);
      srTimer = setTimeout(() => { $('roi-sr').textContent = K.chf(total) + L(' pro Monat. ', ' per month. ') + ratio; }, 700);
    }

    [calls, job, hours].forEach(i => i.addEventListener('input', () => update()));
    rate.addEventListener('change', () => update());
    K.on('lang', () => update(true));
    update(true);
  }
  document.addEventListener('DOMContentLoaded', init);
})();
