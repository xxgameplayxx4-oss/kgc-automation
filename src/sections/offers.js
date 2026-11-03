(function () {
  let ind = 'all';
  const open = new Set();
  let grid, pills, count;
  const t = KGC.t;

  function price(o) {
    const de = KGC.lang === 'de';
    const ab = r => r[0] === r[1] ? '' : (de ? 'ab ' : 'from ');
    return '<div><span class="offers-plbl">' + (de ? 'Einmalig' : 'One-time') + '</span><span class="offers-pval">' + ab(o.setup) + KGC.chf(o.setup[0]) + '</span></div>' +
           '<div><span class="offers-plbl">' + (de ? 'Monatlich' : 'Monthly') + '</span><span class="offers-pval">' + ab(o.monthly) + KGC.chf(o.monthly[0]) + '</span></div>';
  }

  function render() {
    const de = KGC.lang === 'de';
    pills.innerHTML = KGC.industries.map(i =>
      '<button type="button" class="offers-pill" data-ind="' + i.id + '" aria-pressed="' + (i.id === ind) + '">' + t(i.name) + '</button>').join('');
    const wg = document.getElementById('offers-web-grid');
    if (wg) wg.innerHTML = KGC.websites.map(w =>
      '<article class="offers-cell offers-webcell">' +
        '<div class="offers-top">' + KGC.icon(w.id === 'redesign' ? 'repeat' : 'monitor', 'sage') + '</div>' +
        '<h3 class="offers-name">' + t(w.name) + '</h3>' +
        '<p class="offers-short">' + t(w.short) + '</p>' +
        '<ul class="offers-web-pts">' + t(w.points).map(x => '<li>' + x + '</li>').join('') + '</ul>' +
        '<div class="offers-price"><div><span class="offers-plbl">' + (de ? 'Einmalig' : 'One-time') + '</span><span class="offers-pval">' + (w.from ? (de ? 'ab ' : 'from ') : '') + KGC.chf(w.price) + '</span></div></div>' +
        '<div class="offers-acts"><button type="button" class="offers-add" data-quote="web:' + w.id + '">' + (de ? '+ Zur Offerte' : '+ Add to quote') + '</button></div>' +
      '</article>').join('');
    grid.innerHTML = KGC.offers.map((o, n) => {
      const match = ind === 'all' || o.industries.includes(ind);
      const isOpen = open.has(o.id);
      return '<article class="offers-cell' + (match ? '' : ' is-dim') + (isOpen ? ' open' : '') + '" data-id="' + o.id + '">' +
        '<div class="offers-top"><span class="offers-id">' + KGC.icon(o.icon, o.tone) + '<span class="offers-idx">' + String(n + 1).padStart(2, '0') + '</span></span>' +
        (o.id === 'reviews' ? '<span class="offers-tag">' + (de ? 'Meistgewählt' : 'Most chosen') + '</span>' : o.id === 'crm' ? '<span class="offers-tag">' + (de ? 'Neu' : 'New') + '</span>' : '') + '</div>' +
        '<h3 class="offers-name">' + t(o.name) + '</h3>' +
        '<p class="offers-short">' + t(o.short) + '</p>' +
        '<div class="offers-price">' + price(o) + '</div>' +
        '<div class="offers-acts"><button type="button" class="offers-more" aria-expanded="' + isOpen + '" aria-controls="offers-st-' + o.id + '"><span class="offers-pm" aria-hidden="true">+</span>' + (de ? 'Wie es funktioniert' : 'How it works') + '</button>' +
        '<button type="button" class="offers-add">' + (de ? '+ Zur Offerte' : '+ Add to quote') + '</button></div>' +
        '<div class="offers-steps-w" id="offers-st-' + o.id + '"><div><ol class="offers-steps">' + t(o.steps).map(s => '<li>' + s + '</li>').join('') + '</ol></div></div>' +
        '</article>';
    }).join('');
    const n = KGC.offers.filter(o => ind === 'all' || o.industries.includes(ind)).length;
    const name = t(KGC.industries.find(i => i.id === ind).name);
    count.textContent = ind === 'all' ? (de ? 'Alle 10 Automationen' : 'All 10 automations')
      : (de ? n + ' von 10 passen zu ' + name : n + ' of 10 fit ' + name);
  }

  document.addEventListener('DOMContentLoaded', () => {
    grid = document.getElementById('offers-grid');
    pills = document.getElementById('offers-pills');
    count = document.getElementById('offers-count');
    if (!grid) return;
    render();
    pills.addEventListener('click', e => {
      const b = e.target.closest('.offers-pill');
      if (!b) return;
      ind = b.dataset.ind;
      // update in place so the transition animates
      pills.querySelectorAll('.offers-pill').forEach(p => p.setAttribute('aria-pressed', p.dataset.ind === ind));
      grid.querySelectorAll('.offers-cell').forEach(c => {
        const o = KGC.offer(c.dataset.id);
        c.classList.toggle('is-dim', !(ind === 'all' || o.industries.includes(ind)));
      });
      const de = KGC.lang === 'de';
      const n = KGC.offers.filter(o => ind === 'all' || o.industries.includes(ind)).length;
      const name = t(KGC.industries.find(i => i.id === ind).name);
      count.textContent = ind === 'all' ? (de ? 'Alle 10 Automationen' : 'All 10 automations') : (de ? n + ' von 10 passen zu ' + name : n + ' of 10 fit ' + name);
    });
    grid.addEventListener('click', e => {
      const cell = e.target.closest('.offers-cell');
      if (!cell) return;
      const id = cell.dataset.id;
      if (e.target.closest('.offers-more')) {
        const on = !cell.classList.contains('open');
        cell.classList.toggle('open', on);
        on ? open.add(id) : open.delete(id);
        cell.querySelector('.offers-more').setAttribute('aria-expanded', on);
      } else if (e.target.closest('.offers-add')) KGC.openQuote({ offers: [id] });
    });
    KGC.on('lang', render);
  });
})();
