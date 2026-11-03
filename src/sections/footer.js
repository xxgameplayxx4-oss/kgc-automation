(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const lock = () => { root.style.overflow = document.querySelector('.footer-dlg[open]') ? 'hidden' : ''; };
    document.querySelectorAll('[data-dlg]').forEach(b => {
      b.addEventListener('click', () => {
        const d = document.getElementById(b.getAttribute('data-dlg'));
        if (d && !d.open) { d.showModal(); lock(); d.querySelector('.footer-dlg-body').scrollTop = 0; }
      });
    });
    document.querySelectorAll('.footer-dlg').forEach(d => {
      d.addEventListener('close', lock);
      d.addEventListener('click', e => {
        if (e.target === d || e.target.closest('[data-dlg-close]')) d.close();
      });
    });
  });
})();
