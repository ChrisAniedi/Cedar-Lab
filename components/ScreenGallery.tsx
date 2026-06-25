'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

// Horizontal scroll-snap gallery (shows ~2 screens + a peek) with a full-screen
// lightbox you can navigate with the buttons or arrow keys.
export default function ScreenGallery({ images, title }: { images: string[]; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.7, behavior: 'smooth' });
  };

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open, close, step]);

  return (
    <div className="sg">
      <div className="sg-head">
        <h2>Screens</h2>
        <div className="sg-ctrl">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous screens">←</button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next screens">→</button>
        </div>
      </div>
      <div className="sg-track" ref={ref}>
        {images.map((src, i) => (
          <button type="button" key={src} className="sg-item" onClick={() => setOpen(i)} aria-label={`View ${title} screen ${i + 1} full screen`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="sg-img" src={src} alt={`${title} screen ${i + 1}`} loading="lazy" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="sg-lb" role="dialog" aria-modal="true" onClick={close}>
          <button type="button" className="sg-lb-close" onClick={close} aria-label="Close">✕</button>
          <button type="button" className="sg-lb-nav prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Previous">←</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="sg-lb-img" src={images[open]} alt={`${title} screen ${open + 1}`} onClick={(e) => e.stopPropagation()} />
          <button type="button" className="sg-lb-nav next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Next">→</button>
          <div className="sg-lb-count">{open + 1} / {images.length}</div>
        </div>
      )}
    </div>
  );
}
