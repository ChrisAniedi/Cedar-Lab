'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { featuredProducts } from '@/lib/data';
import Reveal from '../Reveal';
import { ArrowRight, Check, ChevronLeft, ChevronRight } from '../Icons';

// Phone screens cycling through an order's journey (the VP "Success!" phone)
const screens = [
  { img: '/images/products/baryte.webp', title: 'Quote ready!', body: '40 MT Baryte, API grade — priced and available.' },
  { img: '/images/products/pressure-sensor.webp', title: 'Order confirmed!', body: '6 × pressure sensors are being calibrated for dispatch.' },
  { img: '/images/scenes/crane-vessel.webp', title: 'Delivered!', body: 'Your marine stores have arrived at Onne jetty.' },
];

function Phone() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % screens.length), 3200);
    return () => clearInterval(t);
  }, []);
  const s = screens[i];
  return (
    <div className="relative mx-auto h-[400px] w-[200px] rounded-[38px] border-[6px] border-ink bg-[#d3d1cc] p-3 shadow-card sm:h-[440px] sm:w-[220px]">
      <div className="absolute left-1/2 top-2.5 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-ink" />
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          className="flex h-full flex-col items-center justify-center text-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.45 }}
        >
          <div className="relative h-[120px] w-[120px] overflow-hidden rounded-lg bg-white">
            <Image src={s.img} alt="" fill sizes="120px" className="object-cover" />
            <span className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-pop place-items-center rounded-full bg-[#16a34a] text-white">
              <Check width={18} height={18} strokeWidth={2.6} />
            </span>
          </div>
          <p className="mt-5 text-[13px] font-bold">{s.title}</p>
          <p className="mt-1 px-3 text-[11px] leading-snug text-ink/75">{s.body}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function SourceShowcase() {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const scroll = (dir: 1 | -1) => track.current?.scrollBy({ left: dir * 240, behavior: 'smooth' });

  return (
    <section className="bg-white">
      <div className="container-x py-24 sm:py-28">
        <Reveal>
          <h2 className="h-two max-w-[880px] text-[clamp(1.9rem,3.8vw,2.75rem)] leading-[1.12]">
            Now you can source what, when, where, <span className="muted">and how your operation needs it.</span>
          </h2>
        </Reveal>
        <div className="mt-6 grid md:grid-cols-2">
          <div />
          <Reveal delay={0.1}>
            <p className="max-w-[440px] text-[16px] leading-[1.65] text-body">
              Camuh works with trusted manufacturers and logistics partners to supply every product your field team needs — and
              delivers it to your base, jetty or wellsite. Send us a list, a part number or even a photo. We confirm specifications,
              price it, and keep you updated until it lands. That simple!
            </p>
            <div className="mt-9">
              <Link href="/request-a-quote" className="btn-dark btn-caps">Request a quote</Link>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="grid gap-2 px-3 pb-20 sm:px-6 lg:grid-cols-2">
        <Reveal className="flex items-center justify-center rounded-2xl bg-mist py-14">
          <Phone />
        </Reveal>

        <Reveal delay={0.1} className="overflow-hidden rounded-2xl bg-cream px-5 py-10 sm:px-10">
          <p className="max-w-[300px] text-[20px] font-medium leading-snug sm:text-[21px]">
            Because uptime isn&rsquo;t a nice-to-have &ndash; it&rsquo;s the whole operation.
          </p>
          <div
            ref={track}
            data-lenis-prevent-wheel
            onScroll={(e) => setAtStart(e.currentTarget.scrollLeft < 8)}
            className="no-scrollbar -mr-5 mt-7 flex snap-x gap-3 overflow-x-auto pr-5 sm:-mr-10 sm:pr-10"
          >
            <Link href="/services" className="group flex h-[340px] w-[220px] shrink-0 snap-start items-center justify-center rounded-xl bg-[#202020] p-6 text-[14px] text-white">
              <span className="flex items-center gap-2">View our full product range <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </Link>
            {featuredProducts.map((p) => (
              <Link
                key={p.slug}
                href={`/services#${p.division}`}
                className="group relative flex h-[340px] w-[220px] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-xl bg-[#11473f] p-4 text-white"
              >
                {p.cutout ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#f1f1ef] to-[#dcdcd8]" />
                    <Image src={p.image} alt={p.name} fill sizes="220px" className="object-contain p-8 pb-24 transition duration-700 group-hover:scale-105" />
                  </>
                ) : (
                  <Image src={p.image} alt={p.name} fill sizes="220px" className="object-cover transition duration-700 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="relative">
                  <p className="text-[18px] font-bold leading-tight">{p.name}</p>
                  <p className="mt-1 text-[12px] leading-snug text-white/80">{p.short}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-7 flex justify-end gap-3">
            <button type="button" onClick={() => scroll(-1)} aria-label="Previous products" className={`grid h-11 w-11 place-items-center rounded-full transition ${atStart ? 'bg-[#D1D5DB] text-ink/60' : 'bg-ink text-white'}`}><ChevronLeft /></button>
            <button type="button" onClick={() => scroll(1)} aria-label="Next products" className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition hover:bg-[#222]"><ChevronRight /></button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
