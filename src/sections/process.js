(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const cards = [...document.querySelectorAll('.process-step')];
    if (!cards.length) return;
    cards.forEach((c, i) => c.style.setProperty('--i', i));
    const mq = matchMedia('(min-width: 900px)');
    let ticking = false;
    const reset = () => cards.forEach(c => { c.style.transform = ''; c.style.opacity = ''; });
    const update = () => {
      ticking = false;
      if (!mq.matches || KGC.reducedMotion()) { reset(); return; }
      cards.forEach((c, i) => {
        const n = cards[i + 1];
        if (!n) return;
        const h = c.offsetHeight, nTop = n.getBoundingClientRect().top;
        const stuck = 96 + (i + 1) * 18;
        const p = Math.min(1, Math.max(0, 1 - (nTop - stuck) / h));
        c.style.transform = 'scale(' + (1 - 0.06 * p).toFixed(4) + ')';
        c.style.opacity = (1 - 0.45 * p).toFixed(3);
      });
    };
    const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    addEventListener('scroll', req, { passive: true });
    addEventListener('resize', req);
    mq.addEventListener('change', req);
    update();
  });
})();
