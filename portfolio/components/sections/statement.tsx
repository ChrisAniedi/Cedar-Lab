"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

/** Philosophy line — each word brightens as it scrolls through the viewport. */
export function Statement({ text }: { text: string }) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <div className="relative">
      <Image src="/images/quote-mark.svg" alt="" width={60} height={53} className="mb-4 h-10 w-auto opacity-90 lg:absolute lg:-top-6 lg:left-0 lg:mb-0 lg:h-[53px]" />
      <p
        ref={ref}
        className="relative text-pretty text-[24px] font-light leading-[1.3] tracking-[-0.04em] sm:text-[28px] lg:pl-6 lg:pt-6 lg:text-[32px] lg:leading-[38px]"
      >
        <span className="sr-only">{text}</span>
        <span aria-hidden>
          {words.map((w, i) => (
            <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
              {w}
            </Word>
          ))}
        </span>
      </p>
    </div>
  );
}
