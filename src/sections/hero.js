(function () {
  const NS = 'http://www.w3.org/2000/svg';
  const el = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const rad = d => d * Math.PI / 180;
  const f = n => +n.toFixed(2);

  // Tooth outline: N teeth, pitch radius r, module m. Centred on (0,0), tooth 0 centred on angle 0.
  function toothPath(N, m) {
    const r = m * N / 2, ro = r + m * 0.85, ri = r - m * 1.05, p = 360 / N;
    const pt = (rr, a) => f(rr * Math.cos(rad(a))) + ',' + f(rr * Math.sin(rad(a)));
    let d = '';
    for (let k = 0; k < N; k++) {
      const c = k * p;
      const s = [[ri, c - p * .30], [ro, c - p * .16], [ro, c + p * .16], [ri, c + p * .30]];
      d += (k ? 'L' : 'M') + s.map(x => pt(x[0], x[1])).join('L');
    }
    return d + 'Z';
  }

  function build() {
    const m = 4.4;
    // gear definitions: parent index meshes with parent at angle theta (deg, from parent to child)
    const defs = [
      { N: 30, x: 150, y: 190 },
      { N: 18, parent: 0, th: -30 },
      { N: 12, parent: 1, th: 20 },
      { N: 16, parent: 0, th: 100 },
    ];
    const gearsG = document.getElementById('heroGears');
    const baseDur = 90; // seconds per revolution for 30-tooth gear
    const phase = [0];
    defs.forEach((g, i) => {
      g.r = m * g.N / 2;
      g.p = 360 / g.N;
      if (i === 0) { g.a = 0; g.dir = 1; return; }
      const P = defs[g.parent], dist = P.r + g.r;
      g.x = P.x + dist * Math.cos(rad(g.th));
      g.y = P.y + dist * Math.sin(rad(g.th));
      g.dir = -P.dir;
      // meshing phase: u (parent tooth fraction at contact) + v (this gear's) = 0.5
      const u = (((g.th - P.a) / P.p) % 1 + 1) % 1;
      g.a = g.th + 180 - g.p * (0.5 - u);
    });
    defs.forEach(g => {
      const outer = el('g', { transform: `translate(${f(g.x)} ${f(g.y)})` }, gearsG);
      const spin = el('g', { class: 'hero-spin' }, outer);
      spin.style.setProperty('--dur', f(baseDur * g.N / 30) + 's');
      spin.style.setProperty('--dir', g.dir > 0 ? 'normal' : 'reverse');
      const rot = el('g', { transform: `rotate(${f(g.a)})` }, spin);
      el('path', { class: 'hero-gear-body', d: toothPath(g.N, m) }, rot);
      const rim = g.r - m * 1.05 - 3.5, hub = Math.max(4, g.r * .14);
      el('circle', { class: 'hero-line', cx: 0, cy: 0, r: f(rim) }, rot);
      const spokes = g.N >= 24 ? 5 : (g.N >= 16 ? 4 : 3);
      for (let k = 0; k < spokes; k++) {
        const a = rad(k * 360 / spokes + 12);
        el('line', { class: 'hero-gear-spoke', x1: f(hub * Math.cos(a)), y1: f(hub * Math.sin(a)), x2: f(rim * Math.cos(a)), y2: f(rim * Math.sin(a)) }, rot);
      }
      el('circle', { class: 'hero-axle', cx: 0, cy: 0, r: f(hub) }, rot);
      el('circle', { class: 'hero-line', cx: 0, cy: 0, r: 1.4 }, rot);
    });

    // balance wheel with hairspring
    const bal = document.getElementById('heroBalance');
    bal.setAttribute('transform', 'translate(262 278)');
    el('circle', { class: 'hero-line hero-fine', cx: 0, cy: 0, r: 46 }, bal);
    const swing = el('g', { class: 'hero-balance-swing' }, bal);
    let sp = '';
    for (let a = 0; a <= 720; a += 15) { const rr = 5 + a / 720 * 20; sp += (a ? 'L' : 'M') + f(rr * Math.cos(rad(a))) + ',' + f(rr * Math.sin(rad(a))); }
    el('path', { class: 'hero-spring', d: sp }, swing);
    el('circle', { class: 'hero-line', cx: 0, cy: 0, r: 34, 'stroke-width': 2.2 }, swing);
    el('circle', { class: 'hero-line', cx: 0, cy: 0, r: 30 }, swing);
    [0, 120, 240].forEach(a => {
      const t = rad(a + 30);
      el('line', { class: 'hero-gear-spoke', x1: 0, y1: 0, x2: f(32 * Math.cos(t)), y2: f(32 * Math.sin(t)), 'stroke-width': 1.6 }, swing);
      el('circle', { class: 'hero-axle', cx: f(34 * Math.cos(rad(a))), cy: f(34 * Math.sin(rad(a))), r: 3 }, swing);
    });
    el('circle', { class: 'hero-axle', cx: 0, cy: 0, r: 4 }, swing);

    // minute-track ticks
    const ticks = document.getElementById('heroTicks');
    for (let i = 0; i < 60; i++) {
      const a = rad(i * 6), r2 = i % 5 === 0 ? 177 : 180.5;
      el('line', { x1: f(184 * Math.cos(a) + 200), y1: f(184 * Math.sin(a) + 200), x2: f(r2 * Math.cos(a) + 200), y2: f(r2 * Math.sin(a) + 200) }, ticks);
    }
  }

  function jewels() {
    const g = document.getElementById('heroJewels');
    const cap = document.getElementById('heroCap');
    const capT = document.getElementById('heroCapT');
    const capS = document.getElementById('heroCapS');
    let active = null;
    const noHover = matchMedia('(hover: none)');

    const idle = () => {
      cap.classList.add('is-hint');
      capT.textContent = KGC.t({ de: '9 Mechanismen. Ein Uhrwerk.', en: '9 mechanisms. One movement.' });
      capS.textContent = KGC.t({ de: 'Fahren Sie über einen Rubin, um den Baustein zu sehen.', en: 'Hover a jewel to see the building block.' });
      if (noHover.matches) capS.textContent = KGC.t({ de: 'Tippen Sie auf einen Rubin, um den Baustein zu sehen.', en: 'Tap a jewel to see the building block.' });
    };
    const show = o => {
      cap.classList.remove('is-hint');
      capT.textContent = KGC.t(o.name);
      capS.textContent = KGC.t(o.short);
    };
    const setActive = (id) => {
      active = id;
      g.querySelectorAll('.hero-jewel').forEach(j => j.classList.toggle('is-on', j.dataset.id === id));
      id ? show(KGC.offer(id)) : idle();
    };

    KGC.offers.forEach((o, i) => {
      const a = rad(-90 + i * 40 + 20), x = f(200 + 171 * Math.cos(a)), y = f(200 + 171 * Math.sin(a));
      const j = el('g', { class: 'hero-jewel', tabindex: 0, role: 'button', transform: `translate(${x} ${y})` }, g);
      j.dataset.id = o.id;
      el('circle', { r: 17, fill: 'transparent' }, j);
      el('circle', { class: 'hero-jewel-halo', r: 11 }, j);
      el('circle', { class: 'hero-jewel-set', r: 9.5 }, j);
      el('circle', { class: 'hero-jewel-stone', r: 5.6 }, j);
      el('path', { class: 'hero-jewel-glint', d: 'M-2.6,-1.2 A3,3 0 0 1 -0.6,-3.2' }, j);
      const label = () => j.setAttribute('aria-label', KGC.t(o.name) + '. ' + KGC.t({ de: 'In die Offerte übernehmen', en: 'Add to your quote' }));
      label(); KGC.on('lang', label);
      j.addEventListener('mouseenter', () => setActive(o.id));
      j.addEventListener('mouseleave', () => { if (!noHover.matches) setActive(null); });
      j.addEventListener('focus', () => setActive(o.id));
      j.addEventListener('blur', () => setActive(null));
      const go = () => KGC.openQuote({ offers: [o.id] });
      j.addEventListener('click', () => {
        if (noHover.matches && active !== o.id) { setActive(o.id); return; }
        go();
      });
      j.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
    });
    KGC.on('lang', () => active ? show(KGC.offer(active)) : idle());
    idle();
  }

  document.addEventListener('DOMContentLoaded', () => { build(); jewels(); });
})();
