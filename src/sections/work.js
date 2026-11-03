(function () {
  /* Portfolio, no links (owner's request). Live client sites show their name; drafts are anonymised
     (logos, names and addresses blurred in the image) and show only the industry. Images live in assets/work/. */
  const LIVE = { de: 'Kundenprojekt · Live', en: 'Client project · live' };
  const DRAFT = { de: 'Konzeptentwurf', en: 'Concept draft' };
  const C = (img, name, de, en, url) => ({ img, url, name: { de: name, en: name }, kind: LIVE, alt: { de: 'Startseite der Website von ' + name + ' (' + de + ')', en: 'Homepage of the ' + name + ' website (' + en + ')' } });
  const D = (img, de, en) => ({ img, name: { de, en }, kind: DRAFT, alt: { de: 'Konzeptentwurf einer Website: ' + de, en: 'Website concept draft: ' + en } });
  const WORK = [
    C('assets/work/precision.webp', 'SwissTech Precision Solutions', 'Präzisionsfertigung', 'precision manufacturing', 'https://www.stps.ch'),
    C('assets/work/boxing.webp', 'Boxschule Gebenstorf', 'Boxclub', 'boxing club', 'https://boxschule-gebenstorf.ch'),
    D('assets/work/restaurant.webp', 'Café & Restaurant', 'Café & restaurant'),
    D('assets/work/barber.webp', 'Barbier', 'Barbershop'),
    D('assets/work/cleaning.webp', 'Reinigungsfirma', 'Cleaning company'),
    D('assets/work/pos-it.webp', 'Kassensysteme & IT', 'POS & IT'),
    D('assets/work/phone-repair.webp', 'Handyreparatur', 'Phone repair'),
    D('assets/work/it-services.webp', 'IT-Dienstleister', 'IT services'),
    D('assets/work/facility.webp', 'Hauswartung', 'Building maintenance'),
  ];
  document.addEventListener('DOMContentLoaded', () => {
    const rail = document.getElementById('work-rail');
    if (!rail || !window.KGC) return;
    const sec = rail.closest('section');
    if (!WORK.length) { sec.hidden = true; return; }
    const render = () => {
      rail.innerHTML = WORK.map(w => '<figure class="work-card"><div class="work-frame"><div class="work-bar" aria-hidden="true"><i></i><i></i><i></i></div>' +
        '<img class="work-shot" src="' + w.img + '" alt="' + KGC.t(w.alt).replace(/&/g, '&amp;') + '" loading="lazy" width="1280" height="800"></div>' +
        '<figcaption class="work-cap"><span class="work-name">' + KGC.t(w.name).replace(/&/g, '&amp;') + '</span><span class="work-kind' + (w.kind === LIVE ? ' is-live' : '') + '">' + KGC.t(w.kind) + '</span>' + (w.url ? '<a class="work-link" href="' + w.url + '" target="_blank" rel="noopener">' + KGC.t({ de: 'Website ansehen', en: 'Visit website' }) + ' <span aria-hidden="true">↗</span></a>' : '') + '</figcaption></figure>').join('');
      upd();
    };
    const prev = document.getElementById('work-prev'), next = document.getElementById('work-next');
    const step = () => (rail.querySelector('.work-card') || rail).getBoundingClientRect().width + 24;
    function upd() { prev.disabled = rail.scrollLeft < 8; next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8; }
    prev.addEventListener('click', () => rail.scrollBy({ left: -step(), behavior: KGC.reducedMotion() ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => rail.scrollBy({ left: step(), behavior: KGC.reducedMotion() ? 'auto' : 'smooth' }));
    rail.addEventListener('scroll', () => requestAnimationFrame(upd), { passive: true });
    addEventListener('resize', upd);
    render(); KGC.on('lang', render);
  });
})();
