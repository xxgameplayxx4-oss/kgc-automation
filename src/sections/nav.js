(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const bar = document.getElementById('navBar');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });

    const syncLang = () => document.querySelectorAll('[data-set-lang]').forEach(b => b.setAttribute('aria-pressed', String(b.getAttribute('data-set-lang') === KGC.lang)));
    KGC.on('lang', syncLang);
    syncLang();

    const menu = document.getElementById('navMenu'), burger = document.getElementById('navBurger'), x = document.getElementById('navMenuX');
    if (menu && burger) {
      const foc = () => [...menu.querySelectorAll('a, button')].filter(e => e.offsetParent !== null);
      const open = () => { menu.hidden = false; burger.setAttribute('aria-expanded', 'true'); document.documentElement.style.overflow = 'hidden'; x.focus(); };
      const close = (back) => { menu.hidden = true; burger.setAttribute('aria-expanded', 'false'); document.documentElement.style.overflow = ''; if (back) burger.focus(); };
      burger.addEventListener('click', open);
      x.addEventListener('click', () => close(true));
      menu.addEventListener('click', e => { if (e.target.closest('a, [data-menu-close]')) close(false); });
      matchMedia('(min-width: 900px)').addEventListener('change', e => { if (e.matches && !menu.hidden) close(false); });
      menu.addEventListener('keydown', e => {
        if (e.key === 'Escape') { close(true); return; }
        if (e.key !== 'Tab') return;
        const f = foc(), a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      });
    }

    if (bar && 'IntersectionObserver' in window) {
      const seen = new Set();
      const io = new IntersectionObserver(es => {
        es.forEach(e => e.isIntersecting ? seen.add(e.target.id) : seen.delete(e.target.id));
        bar.classList.toggle('is-hidden', seen.size > 0);
      });
      ['hero-actions', 'offerte', 'kontakt'].forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });
    }
  });
})();
