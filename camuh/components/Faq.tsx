'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { faqs } from '@/lib/data';
import Reveal from './Reveal';
import { Plus } from './Icons';

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" className="scroll-mt-24 bg-white py-24">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <Reveal>
          <h2 className="h-two text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.12]">
            Questions, <br /><span className="muted">answered.</span>
          </h2>
          <p className="mt-5 max-w-[340px] text-[15px] leading-relaxed text-body">
            Can&rsquo;t find what you&rsquo;re looking for? Call or WhatsApp our team and we&rsquo;ll help right away.
          </p>
        </Reveal>
        <div className="border-t border-black/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="border-b border-black/10">
                <button type="button" onClick={() => setOpen(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-6 py-5 text-left">
                  <span className="text-[17px] font-bold">{f.q}</span>
                  <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-black/15 transition ${isOpen ? 'rotate-45 bg-ink text-white' : ''}`}>
                    <Plus width={14} height={14} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="overflow-hidden pr-12 text-[15px] leading-relaxed text-body"
                    >
                      <span className="block pb-6">{f.a}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
