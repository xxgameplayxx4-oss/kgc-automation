(function () {
  /* VSL: nothing loads until the visitor presses play. Source and subtitles follow the DE/EN toggle. */
  document.addEventListener('DOMContentLoaded', () => {
    const v = document.getElementById('vsl-video'), btn = document.getElementById('vsl-play');
    if (!v || !btn) return;
    const frame = v.parentElement;
    const setSrc = () => {
      const l = KGC.lang === 'en' ? 'en' : 'de';
      if (v.dataset.l === l) return;
      const wasPlaying = !v.paused;
      v.dataset.l = l;
      v.src = 'assets/media/vsl-' + l + '.mp4';
      v.querySelectorAll('track').forEach(t => t.remove());
      const tr = document.createElement('track');
      tr.kind = 'subtitles'; tr.srclang = l; tr.label = l === 'de' ? 'Deutsch' : 'English';
      tr.src = 'assets/media/vsl-' + l + '.vtt'; tr.default = true;
      v.appendChild(tr);
      if (wasPlaying) v.play();
    };
    btn.addEventListener('click', () => {
      setSrc();
      v.controls = true;
      frame.classList.add('is-playing');
      const p = v.play(); if (p && p.catch) p.catch(() => {});
    });
    KGC.on('lang', () => { if (v.dataset.l) setSrc(); });
  });
})();
