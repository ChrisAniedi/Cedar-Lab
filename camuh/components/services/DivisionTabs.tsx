'use client';

import { useEffect, useState } from 'react';
import { divisions } from '@/lib/data';

/** Sticky pill bar that tracks which division is on screen. */
export default function DivisionTabs() {
  const [active, setActive] = useState(divisions[0].slug);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    divisions.forEach((d) => {
      const el = document.getElementById(d.slug);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(slug);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o: object) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -120 });
    else el.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', `#${slug}`);
  };

  return (
    <div className="sticky top-0 z-30 border-b border-black/5 bg-white/90 backdrop-blur-md">
      <div className="no-scrollbar container-x flex gap-2 overflow-x-auto py-3">
        {divisions.map((d) => (
          <a
            key={d.slug}
            href={`#${d.slug}`}
            onClick={go(d.slug)}
            aria-current={active === d.slug ? 'true' : undefined}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition ${
              active === d.slug ? 'bg-ink text-white' : 'bg-cream text-ink hover:bg-sand'
            }`}
          >
            <span className="mr-1.5 opacity-50">{d.index}</span>{d.shortName}
          </a>
        ))}
      </div>
    </div>
  );
}
