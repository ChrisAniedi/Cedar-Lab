'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { scenes } from '@/lib/data';
import Reveal from '../Reveal';
import { ArrowLeft, ArrowRight, Bullet } from '../Icons';

const slides = [
  { title: 'See pressure, flow and temperature in real time', sub: '0.025% FS accuracy, from −40°C to +180°C', image: '/images/products/pt-sensor.webp' },
  { title: 'Detect hazardous gas before your crew does', sub: 'Bluetooth-enabled detectors, maintained from a phone', image: '/images/products/gas-sensor.webp' },
  { title: 'Catch vibration and corrosion before they become failures', sub: 'Predictive alerts for pumps, compressors and pipelines', image: '/images/products/vibration-sensor.webp' },
  { title: 'Measure every barrel with confidence', sub: 'Gas, liquid and multi-phase flow metering', image: '/images/products/flow-meter.webp' },
];

function SlideCard() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((n) => (n + d + slides.length) % slides.length);
  const s = slides[i];
  return (
    <div className="relative mx-auto mt-10 flex h-[460px] max-w-[1024px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-ink px-6 text-center text-white sm:h-[480px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(46,48,146,.45),transparent)]" />
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }} transition={{ duration: 0.5 }} className="relative flex flex-col items-center">
          <div className="relative mb-7 h-[170px] w-[240px] overflow-hidden rounded-xl bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)]">
            <Image src={s.image} alt="" fill sizes="240px" className="object-contain p-5" />
          </div>
          <p className="max-w-[460px] text-[clamp(1.4rem,2.6vw,1.75rem)] font-bold leading-tight">{s.title}</p>
          <p className="mt-3 text-[14px] font-medium text-white/80">{s.sub}</p>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-6 flex gap-3">
        <button type="button" onClick={() => go(-1)} aria-label="Previous" className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink"><ArrowLeft width={16} height={16} /></button>
        <button type="button" onClick={() => go(1)} aria-label="Next" className="grid h-9 w-9 place-items-center rounded-full border border-white/70 text-white transition hover:bg-white hover:text-ink"><ArrowRight width={16} height={16} /></button>
      </div>
    </div>
  );
}

function SpacedTitle({ a, b, className = '' }: { a: string; b: string; className?: string }) {
  return (
    <h3 className={`font-display text-[clamp(2.2rem,5.5vw,4.4rem)] font-medium uppercase leading-[0.95] tracking-tight ${className}`}>
      {a} <span className="inline-block w-[0.6em]" /> {b}
    </h3>
  );
}

export default function SmartSense() {
  return (
    <section className="bg-sand pb-24 pt-20 sm:pt-24">
      <div className="container-x">
        <Reveal>
          <h2 className="mx-auto max-w-[900px] text-[clamp(1.7rem,3.4vw,2.4rem)] font-extrabold leading-[1.12] tracking-[-0.025em]">
            <span className="text-smoke">With real-time sensor data and predictive alerts,</span> Camuh SmartSense turns your field into a connected, safer operation.
          </h2>
        </Reveal>
        <Reveal delay={0.1}><SlideCard /></Reveal>
      </div>

      {/* MONITOR EVERYTHING */}
      <div className="container-x mt-24 grid items-center gap-10 md:grid-cols-2">
        <Reveal>
          <SpacedTitle a="Monitor" b="everything" />
          <p className="mt-6 text-[19px] font-bold leading-snug">
            One sensor shows you a number. A connected field shows you the whole story.
          </p>
          <p className="mt-4 max-w-[480px] text-[15px] leading-[1.7] text-body">
            Combine pressure, temperature, flow, gas, vibration and corrosion sensors into one picture of your asset. Spot trends early,
            schedule maintenance before failure and prove compliance with clean, time-stamped data — from a single wellhead to a full
            production facility.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="relative h-[360px] overflow-hidden rounded-2xl bg-white sm:h-[420px]">
          <Image src="/images/products/flow-meter.webp" alt="Oil and gas flow meter" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-10" />
        </Reveal>
      </div>

      {/* ACT FASTER */}
      <div className="container-x mt-24 grid items-center gap-10 md:grid-cols-2">
        <Reveal className="relative order-2 h-[360px] overflow-hidden rounded-2xl md:order-1 sm:h-[440px]">
          <Image src={scenes.refineryDusk} alt="Processing facility at dusk" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </Reveal>
        <Reveal delay={0.1} className="order-1 md:order-2">
          <SpacedTitle a="Act" b="faster" />
          <p className="mt-6 text-[19px] font-bold leading-snug">
            Turn alerts into action with tools built for field teams and control rooms.
          </p>
          <ul className="mt-6 space-y-3.5 text-[15px]">
            {[
              'Instant alarms by SMS, email or app when readings drift.',
              'Live dashboards for every wellhead, pipeline and vessel.',
              'Plugs into your existing SCADA and monitoring systems.',
              'Installation, calibration and support from our engineers.',
            ].map((t) => (
              <li key={t} className="flex gap-3"><Bullet className="mt-0.5 shrink-0 text-brand" />{t}</li>
            ))}
          </ul>
          <Link href="/services#iot-sensors" className="btn-black btn-caps mt-9">Explore sensors</Link>
        </Reveal>
      </div>

      {/* SAFER TOGETHER */}
      <Reveal className="relative mx-3 mt-24 h-[460px] overflow-hidden rounded-2xl sm:mx-6 sm:h-[560px]">
        <Image src={scenes.oilWorker} alt="Oilfield worker on site" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-12">
          <SpacedTitle a="Safer" b="together" />
          <p className="mt-4 max-w-[520px] text-[15px] font-semibold uppercase tracking-wide text-white/90">
            Because getting your crew home safely is greater than any schedule.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
