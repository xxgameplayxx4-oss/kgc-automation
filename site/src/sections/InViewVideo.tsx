import { useEffect, useRef, type VideoHTMLAttributes } from 'react';

/** Muted looping video that only loads and plays while it is on screen (saves data and battery). */
export default function InViewVideo(props: VideoHTMLAttributes<HTMLVideoElement>) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) void v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);
  return <video ref={ref} muted loop playsInline preload="none" {...props} />;
}
