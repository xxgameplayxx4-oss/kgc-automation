(function () {
  function init() {
    const grid = document.getElementById('packages-grid'), seg = document.getElementById('packages-seg');
    if (!grid || !window.KGC) return;
    const K = KGC; let view = 'monthly';
    const L = (de, en) => K.lang === 'en' ? en : de;

    /* Saving over the first year (setup + 12 months) versus booking the same automations singly at their lowest price */
    function saving(p) {
      const ids = p.includes.concat(p.choice.map(g => g[0]));
      const single = ids.reduce((a, id) => a + K.offer(id).setup[0] + 12 * K.offer(id).monthly[0], 0);
      return Math.floor((single - p.setup - 12 * p.monthly) / 10) * 10;
    }
    function render() {
      seg.innerHTML = [['monthly', L('Einmalig + monatlich', 'One-off + monthly')], ['year', L('Erstes Jahr total', 'First year total')]]
        .map(([k, t]) => `<button type="button" data-view="${k}" aria-pressed="${view === k}">${t}</button>`).join('');
      grid.innerHTML = K.packages.map(p => {
        const feat = !!p.featured, sv = saving(p), year = p.setup + 12 * p.monthly, nm = K.t(p.name);
        const price = view === 'monthly'
          ? `<div class="packages-big">${K.chf(p.monthly)}<small>/ ${L('Monat', 'month')}</small></div><div class="packages-sub">${K.chf(p.setup)} ${L('einmalig', 'one-off')}</div>`
          : `<div class="packages-big">${K.chf(year)}<small>${L('im 1. Jahr', 'in year 1')}</small></div><div class="packages-sub">${K.chf(p.setup)} + 12 × ${K.chf(p.monthly)}</div>`;
        const items = p.includes.map(id => `<li>${K.t(K.offer(id).name)}</li>`).join('')
          + p.choice.map(g => `<li class="is-choice">${g.map(id => K.t(K.offer(id).name)).join(` <em>${L('oder', 'or')}</em> `)}</li>`).join('');
        return `<article class="packages-card${feat ? ' is-featured' : ''}" aria-labelledby="pk-${p.id}">
          ${feat ? `<span class="packages-flag">${L('Empfohlen', 'Recommended')}</span>` : ''}
          <div><h3 class="packages-name" id="pk-${p.id}">${nm}</h3><p class="packages-tag">${K.t(p.tagline)}</p></div>
          <div class="packages-price">${price}</div>
          <ul class="packages-list">${items}</ul>
          <p class="packages-save">${sv > 0 ? L(`Sie sparen ${K.chf(sv)} im ersten Jahr gegenüber Einzelpreisen`, `You save ${K.chf(sv)} in the first year compared with single prices`) : ''}</p>
          <button type="button" class="btn ${feat ? 'btn-cta' : 'btn-ghost'}" data-quote="${p.id}">${L(nm + ' wählen', 'Choose ' + nm)}</button>
        </article>`;
      }).join('');
    }
    seg.addEventListener('click', e => {
      const b = e.target.closest('button[data-view]'); if (!b) return;
      view = b.dataset.view; render();
      const nb = seg.querySelector(`[data-view="${view}"]`); if (nb) nb.focus();
    });
    K.on('lang', render);
    render();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
