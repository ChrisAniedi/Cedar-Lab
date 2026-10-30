'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { divisions } from '@/lib/data';
import Reveal from '../Reveal';
import { ArrowRight, Plus } from '../Icons';

/** Every division and product on one screen — an expandable index. */
export default function ProductIndex() {
  const [open, setOpen] = useState<string>(divisions[0].slug);

  return (
    <section className="bg-white pb-24">
      <div className="container-x">
        <Reveal>
          <h2 className="h-two text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.12]">
            Everything we supply, <span className="muted">in one place.</span>
          </h2>
        </Reveal>

        <div className="mt-10 border-t border-black/10">
          {divisions.map((d) => {
            const isOpen = open === d.slug;
            return (
              <div key={d.slug} className="border-b border-black/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? '' : d.slug)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center gap-4 py-6 text-left sm:gap-8"
                >
                  <span className="w-8 text-[13px] font-medium text-smoke">{d.index}</span>
                  <span className="flex-1 text-[clamp(1.2rem,2.4vw,1.8rem)] font-bold tracking-tight transition group-hover:translate-x-1">{d.name}</span>
                  <span className="hidden text-[13px] text-body md:block">{d.products.length} products</span>
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-black/15 transition duration-300 ${isOpen ? 'rotate-45 bg-ink text-white' : ''}`}>
                    <Plus width={16} height={16} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 sm:pl-16 lg:grid-cols-[1fr_2fr]">
                        <div>
                          <p className="text-[15px] leading-relaxed text-body">{d.intro}</p>
                          <ul className="mt-5 flex flex-wrap gap-2">
                            {d.highlights.map((h) => (<li key={h} className="rounded-full bg-cream px-3 py-1.5 text-[12px] font-medium">{h}</li>))}
                          </ul>
                          <Link href={`/services#${d.slug}`} className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold underline-offset-4 hover:underline">
                            Full details <ArrowRight width={16} height={16} />
                          </Link>
                        </div>
                        <ul className="grid gap-3 sm:grid-cols-2">
                          {d.products.map((p) => (
                            <li key={p.slug}>
                              <Link href={`/request-a-quote?service=${d.slug}&product=${p.slug}`} className="group flex items-center gap-4 rounded-xl bg-cream p-3 transition hover:bg-sand">
                                <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white">
                                  <Image src={p.image} alt="" fill sizes="56px" className={p.cutout ? 'object-contain p-1.5' : 'object-cover'} />
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block truncate text-[15px] font-bold">{p.name}</span>
                                  <span className="block truncate text-[12px] text-body">{p.subtitle}</span>
                                </span>
                                <span className="text-[11px] font-semibold uppercase tracking-wide text-ink/50 transition group-hover:text-ink">Quote</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
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
