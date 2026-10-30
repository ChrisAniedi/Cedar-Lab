'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { audiences } from '@/lib/data';

/** "We're loved by creat[photo]ives" — a giant word with a photo tile set inside it. */
export default function BuiltFor() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % audiences.length), 2600);
    return () => clearInterval(t);
  }, []);
  const a = audiences[i];
  const cut = Math.ceil(a.word.length / 2);
  const left = a.word.slice(0, cut);
  const right = a.word.slice(cut);

  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-sand px-4 py-24">
      <p className="text-[clamp(1.1rem,1.8vw,1.4rem)] font-medium">Built for</p>
      <h2 className="sr-only">Built for drillers, engineers, vessel crews, operators and buyers</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={a.word}
          aria-hidden
          className="mt-3 flex items-center whitespace-nowrap text-[clamp(2.6rem,9vw,7rem)] font-extrabold leading-none tracking-[-0.04em]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>{left}</span>
          <motion.span
            className="relative mx-[0.04em] inline-block h-[1.05em] w-[0.72em] overflow-hidden rounded-sm"
            initial={{ scaleY: 0.3 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <Image src={a.image} alt="" fill sizes="120px" className="object-cover" />
          </motion.span>
          <span>{right}</span>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
