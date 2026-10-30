'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { stats } from '@/lib/data';

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

/** Numbers strip under the "HOW YOU SCALE" statement (an addition to the Vanity Pass layout). */
export default function Stats() {
  return (
    <section className="bg-ink pb-24 text-white">
      <div className="container-x">
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-ink p-6 sm:p-8">
            <p className="font-display text-[clamp(2.4rem,5vw,3.6rem)] font-medium leading-none"><Counter to={s.value} suffix={s.suffix} /></p>
            <p className="mt-3 text-[14px] leading-snug text-white/65">{s.label}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
