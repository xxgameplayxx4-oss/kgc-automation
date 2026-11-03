(function () {
  /* Portfolio: names and categories only, no links (owner's request). Images live in assets/work/. */
  const W = (img, name, de, en) => ({ img: 'assets/work/' + img + '.webp', name, kind: { de, en }, alt: { de: 'Startseite der Website von ' + name, en: 'Homepage of the ' + name + ' website' } });
  const WORK = [
    W('souperbe', 'souperbe', 'Café & Restaurant · Brugg', 'Café & restaurant · Brugg'),
    W('boxschule', 'Boxschule Gebenstorf', 'Boxclub · Gebenstorf', 'Boxing club · Gebenstorf'),
    W('brugg-barber', 'Brugg Barber Shop', 'Barbier · Brugg', 'Barber · Brugg'),
    W('halimi', 'R. Halimi Reinigungen', 'Reinigung · Aarau', 'Cleaning · Aarau'),
    W('dd-informatic', 'D&D Informatic', 'Kassensysteme & IT · Brugg', 'POS & IT · Brugg'),
    W('iservice24', 'i-Service24', 'Handyreparatur · Wildegg', 'Phone repair · Wildegg'),
    W('freestar', 'Freestar-Informatik', 'IT-Dienstleistungen', 'IT services'),
    W('reve', 'ReVe Hauswartung', 'Hauswartung · Brugg', 'Facility care · Brugg'),
    W('swisstech', 'SwissTech Precision Solutions', 'Präzisionsfertigung', 'Precision manufacturing'),
  ];
  document.addEventListener('DOMContentLoaded', () => {
    const rail = document.getElementById('work-rail');
    if (!rail || !window.KGC) return;
    const sec = rail.closest('section');
    if (!WORK.length) { sec.hidden = true; return; }
    const render = () => {
      rail.innerHTML = WORK.map(w => '<figure class="work-card"><div class="work-frame"><div class="work-bar" aria-hidden="true"><i></i><i></i><i></i></div>' +
        '<img class="work-shot" src="' + w.img + '" alt="' + KGC.t(w.alt).replace(/&/g, '&amp;') + '" loading="lazy" width="1280" height="800"></div>' +
        '<figcaption class="work-cap"><span class="work-name">' + w.name + '</span><span class="work-kind">' + KGC.t(w.kind) + '</span></figcaption></figure>').join('');
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
