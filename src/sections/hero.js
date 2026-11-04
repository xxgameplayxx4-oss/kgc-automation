(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const v = document.querySelector('.hero-visual');
    if (!v) return;
    if (!('IntersectionObserver' in window) || (window.KGC && KGC.reducedMotion && KGC.reducedMotion())) { v.classList.add('is-in'); return; }
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { v.classList.add('is-in'); io.disconnect(); } }), { threshold: .1 });
    io.observe(v);
  });
})();
