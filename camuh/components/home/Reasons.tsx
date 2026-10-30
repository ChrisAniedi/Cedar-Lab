'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { reasons } from '@/lib/data';
import Reveal from '../Reveal';
import { Plus } from '../Icons';

/** "Explore more premium membership benefits" — text on the left, expanding image panels on the right. */
export default function Reasons() {
  const [active, setActive] = useState(0);
  const r = reasons[active];

  return (
    <section className="bg-cream py-24">
      <div className="container-x">
        <Reveal>
          <h2 className="h-two text-center text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.12]">
            Explore more reasons <br /><span className="muted">to partner with Camuh</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-12 grid max-w-[1000px] gap-8 rounded-2xl bg-white p-6 sm:p-10 md:grid-cols-2 md:p-14">
          <div className="flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
                <p className="eyebrow text-smoke">0{active + 1} / 0{reasons.length}</p>
                <h3 className="mt-3 text-[clamp(1.6rem,2.6vw,1.9rem)] font-extrabold leading-tight tracking-tight text-[#1f2933]">{r.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-body">{r.body}</p>
              </motion.div>
            </AnimatePresence>
            <div className="mt-8">
              <Link href="/request-a-quote" className="btn-black">Request a quote</Link>
            </div>
          </div>

          <div className="flex h-[340px] gap-2 sm:h-[380px]" role="tablist" aria-label="Reasons to choose Camuh">
            {reasons.map((x, i) => (
              <button
                key={x.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`group relative overflow-hidden rounded-xl transition-[flex] duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${i === active ? 'flex-[4]' : 'flex-[1]'}`}
              >
                <Image src={x.image} alt="" fill sizes="(max-width: 768px) 60vw, 360px" className="object-cover" />
                <div className={`absolute inset-0 transition ${i === active ? 'bg-black/20' : 'bg-black/50'}`} />
                <span className={`absolute bottom-4 left-1/2 grid h-9 w-9 -translate-x-1/2 place-items-center rounded-full border border-white/80 text-white transition ${i === active ? 'rotate-45 opacity-0' : 'opacity-100'}`}>
                  <Plus width={16} height={16} />
                </span>
                <span className={`absolute bottom-4 left-4 text-left text-[15px] font-bold text-white transition-opacity duration-500 ${i === active ? 'opacity-100 delay-300' : 'opacity-0'}`}>
                  {x.title}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
