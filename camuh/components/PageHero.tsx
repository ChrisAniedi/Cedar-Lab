'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/** Shorter version of the home hero for inner pages: split giant words over a photo. */
export default function PageHero({
  top,
  bottom,
  image,
  alt,
  caption,
}: {
  top: string;
  bottom: string;
  image: string;
  alt: string;
  caption?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const xTop = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const xBottom = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  return (
    <section ref={ref} className="relative h-[78svh] min-h-[520px] overflow-hidden bg-ink text-white">
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image src={image} alt={alt} fill priority sizes="100vw" className="animate-kenburns object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/60" />
      <motion.p
        aria-hidden
        style={{ x: xTop }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-3 top-[80px] font-display text-mega font-medium uppercase sm:left-5"
      >
        {top}
      </motion.p>
      <motion.p
        aria-hidden
        style={{ x: xBottom }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-6 right-3 text-right font-display text-mega font-medium uppercase sm:right-5"
      >
        {bottom}
      </motion.p>
      <h1 className="sr-only">{`${top} ${bottom}`}</h1>
      {caption && (
        <p className="absolute left-5 top-1/2 max-w-[340px] -translate-y-1/2 text-[15px] leading-relaxed text-white/85 sm:left-8">{caption}</p>
      )}
    </section>
  );
}
