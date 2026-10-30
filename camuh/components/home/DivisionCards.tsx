'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { divisions, scenes } from '@/lib/data';
import QuoteBar from './QuoteBar';
import Reveal from '../Reveal';
import { ChevronLeft, ChevronRight } from '../Icons';

// Background photos per division for the big cards (larger than the product shots)
const cardImage: Record<string, string> = {
  chemicals: scenes.rigPipes,
  'iot-sensors': scenes.refineryNight,
  marine: scenes.craneVessel,
  'spare-parts': '/images/products/engine-parts.webp',
  'equipment-leasing': scenes.refineryPipes,
};

export default function DivisionCards() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 600), behavior: 'smooth' });
  };

  return (
    <section className="overflow-hidden bg-cream py-20 sm:py-24">
      <div className="container-x">
        <Reveal>
          <h2 className="max-w-[640px] text-[clamp(1.9rem,3.6vw,2.6rem)] font-extrabold leading-[1.15] tracking-[-0.025em]">
            Oilfield supply that goes everywhere you operate. 25+ products and counting
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-5 max-w-[640px] text-[17px] leading-[1.6] text-body">
            Five service lines, one accountable partner. Choose a division, tell us what you need and where it needs to be — chemicals,
            sensors, vessel stores, critical spares or leased equipment — and we&rsquo;ll come back with a clear, priced quote.
          </p>
        </Reveal>
      </div>

      <div className="relative mt-12">
        <div
          ref={track}
          data-lenis-prevent-wheel
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:px-8 lg:pl-[max(2rem,calc((100vw-1200px)/2+2rem))]"
        >
          {divisions.map((d, i) => (
            <article
              key={d.slug}
              className="group relative flex h-[440px] w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-xl bg-ink text-white sm:h-[510px] sm:w-[560px]"
            >
              <Image src={cardImage[d.slug] ?? d.image} alt="" fill sizes="(max-width: 640px) 86vw, 560px" className="object-cover transition duration-[1.2s] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/40" />

              <div className="relative p-5 sm:p-6">
                <p className="text-[12px] font-medium text-white/70">{d.index} / 05</p>
                <h3 className="mt-1 max-w-[340px] text-[22px] font-bold leading-tight sm:text-[24px]">{d.name}</h3>
                <p className="mt-2 max-w-[330px] text-[13px] leading-snug text-white/85">{d.tagline}</p>
              </div>

              <div className="relative mt-auto px-4 pb-5 sm:px-6">
                {i < 2 ? (
                  <div className="mb-16 hidden sm:block">
                    <QuoteBar products={d.products} division={d.slug} />
                  </div>
                ) : null}
                <div className="flex justify-center">
                  <Link href={i < 2 ? `/services#${d.slug}` : `/request-a-quote?service=${d.slug}`} className="btn-white btn-caps rounded-[4px] px-6 py-3 text-[12px]">
                    {i < 2 ? 'Explore products' : 'Request a quote'}
                  </Link>
                </div>
              </div>
            </article>
          ))}
          <div className="w-1 shrink-0" aria-hidden />
        </div>

        <div className="container-x mt-6 flex justify-end gap-3">
          <button type="button" onClick={() => scroll(-1)} aria-label="Previous" className="grid h-11 w-11 place-items-center rounded-full bg-[#D1D5DB] text-ink transition hover:bg-[#c0c4cb]"><ChevronLeft /></button>
          <button type="button" onClick={() => scroll(1)} aria-label="Next" className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition hover:bg-[#222]"><ChevronRight /></button>
        </div>
      </div>
    </section>
  );
}
