(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const sec = document.querySelector('.film');
    if (!sec || !window.KGC) return;
    const v = sec.querySelector('.film-video'), img = sec.querySelector('.film-poster'), btn = document.getElementById('film-toggle');
    const narrow = matchMedia('(max-width: 720px)').matches;
    const poster = narrow ? 'assets/media/film-9x16.webp' : 'assets/media/film-16x9.webp';
    if (narrow) { img.src = poster; v.poster = poster; }
    if (KGC.reducedMotion()) return; // poster only
    v.src = narrow ? 'assets/media/film-9x16.mp4' : 'assets/media/film-16x9.mp4';
    let userPaused = false;
    v.addEventListener('playing', () => v.classList.add('is-on'));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting && !userPaused) v.play().catch(() => {}); else v.pause();
    }), { threshold: .15 });
    io.observe(sec);
    btn.hidden = false;
    const label = () => {
      const p = v.paused; btn.classList.toggle('is-paused', p);
      btn.setAttribute('data-aria-de', p ? 'Video abspielen' : 'Video pausieren');
      btn.setAttribute('data-aria-en', p ? 'Play video' : 'Pause video');
      btn.setAttribute('aria-label', btn.getAttribute('data-aria-' + KGC.lang));
    };
    v.addEventListener('play', label); v.addEventListener('pause', label);
    btn.addEventListener('click', () => { if (v.paused) { userPaused = false; v.play().catch(() => {}); } else { userPaused = true; v.pause(); } });
  });
})();
