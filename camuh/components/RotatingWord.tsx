'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/** Cycles through words with a vertical slide, like "Thanks AMEX / Chase / Capital One". */
export default function RotatingWord({
  words,
  interval = 2200,
  className = '',
}: {
  words: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(t);
  }, [words.length, interval]);

  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className}`}>
      {/* invisible sizer keeps line height stable */}
      <span className="invisible">{words[i]}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="absolute inset-0 whitespace-nowrap"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">{words[i]}</span>
    </span>
  );
}
