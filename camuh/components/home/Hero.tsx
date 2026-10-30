'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ChevronDown } from '../Icons';

/**
 * Full-bleed hero with split giant type (top-left / bottom-right), as on Vanity Pass.
 * Drop an MP4 at /public/videos/hero.mp4 and pass `video` to swap the photo for a looping video.
 */
export default function Hero({ image, video }: { image: string; video?: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const xTop = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const xBottom = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const word = {
    hidden: { y: '105%' },
    show: (i: number) => ({ y: '0%', transition: { delay: 0.15 + i * 0.12, duration: 1.1, ease: [0.22, 1, 0.36, 1] as const } }),
  };

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-ink text-white">
      <motion.div className="absolute inset-0" style={{ scale }}>
        {video ? (
          <video className="h-full w-full object-cover" src={video} poster={image} autoPlay muted loop playsInline />
        ) : (
          <div className="absolute inset-0 animate-kenburns">
            <Image src={image} alt="Camuh crane lifting a supply vessel at the quayside" fill priority sizes="100vw" className="object-cover" />
          </div>
        )}
      </motion.div>
      <motion.div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/60" style={{ opacity: fade }} />

      <h1 className="sr-only">Powering oil and gas with smart innovation — Camuh Innovations Limited</h1>

      <motion.div aria-hidden style={{ x: xTop }} className="absolute left-3 top-[72px] font-display text-mega font-medium uppercase sm:left-5 sm:top-[60px]">
        {['Powering', 'Oil & Gas'].map((w, i) => (
          <span key={w} className="block overflow-hidden pb-[0.04em]">
            <motion.span className="block" variants={word} initial="hidden" animate="show" custom={i}>{w}</motion.span>
          </span>
        ))}
      </motion.div>

      <motion.div aria-hidden style={{ x: xBottom }} className="absolute bottom-16 right-3 text-right font-display text-mega font-medium uppercase sm:bottom-14 sm:right-5">
        {['With Smart', 'Innovation'].map((w, i) => (
          <span key={w} className="block overflow-hidden pb-[0.04em]">
            <motion.span className="block" variants={word} initial="hidden" animate="show" custom={i + 2}>{w}</motion.span>
          </span>
        ))}
      </motion.div>

      <a href="#intro" aria-label="Scroll to content" className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bob text-white">
        <ChevronDown width={34} height={34} strokeWidth={1.4} />
      </a>
    </section>
  );
}
