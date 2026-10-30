'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import RotatingWord from './RotatingWord';

type Props = {
  top: [string, string];
  bottom: [string, string];
  /** Small centred line(s) between the giant words */
  lead?: string;
  rotating?: readonly string[];
  kicker?: string;
  image?: string;
  imageAlt?: string;
};

/**
 * The Vanity Pass "REWARDS FOR … HOW YOU MOVE" moment: a pinned black (or photo) panel
 * where the giant words slide in from opposite edges as you scroll.
 */
export default function BigStatement({ top, bottom, lead, rotating, kicker, image, imageAlt = '' }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const xTop = useTransform(scrollYProgress, [0.05, 0.45], ['-35%', '0%']);
  const xBottom = useTransform(scrollYProgress, [0.15, 0.55], ['35%', '0%']);
  const midOpacity = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative h-[150vh] bg-ink text-white">
      <div className="sticky top-0 flex h-[100svh] min-h-[560px] flex-col justify-between overflow-hidden py-6 sm:py-8">
        {image && (
          <>
            <motion.div className="absolute inset-[-10%_0]" style={{ y: imgY }}>
              <Image src={image} alt={imageAlt} fill sizes="100vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-black/45" />
          </>
        )}

        <motion.p aria-hidden style={{ x: xTop }} className="relative pl-3 font-display text-mega font-medium uppercase sm:pl-5">
          <span className="block">{top[0]}</span>
          <span className="block">{top[1]}</span>
        </motion.p>

        <motion.div style={{ opacity: midOpacity }} className="relative mx-auto max-w-2xl px-6 text-center">
          {kicker && <p className="mb-2 text-[clamp(1rem,1.6vw,1.25rem)] font-bold">{kicker}</p>}
          {lead && <p className="text-[clamp(1rem,1.5vw,1.2rem)] font-bold uppercase leading-snug">{lead}</p>}
          {rotating && (
            <p className="mt-1 text-[clamp(1rem,1.5vw,1.2rem)] font-bold uppercase">
              <RotatingWord words={rotating} className="translate-x-[30%]" />
            </p>
          )}
        </motion.div>

        <motion.p aria-hidden style={{ x: xBottom }} className="relative pr-3 text-right font-display text-mega font-medium uppercase sm:pr-5">
          <span className="block">{bottom[0]}</span>
          <span className="block">{bottom[1]}</span>
        </motion.p>

        <h2 className="sr-only">{`${top.join(' ')} ${bottom.join(' ')}`}</h2>
      </div>
    </section>
  );
}
