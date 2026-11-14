"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

import { gallery } from "@/lib/site";

/** Photo wall — the two rows drift in opposite directions as you scroll. */
export function Gallery() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const shiftA = useTransform(scrollYProgress, [0, 1], ["1.5%", "-1.5%"]);
  const shiftB = useTransform(scrollYProgress, [0, 1], ["-1.5%", "1.5%"]);
  const rows = [gallery.slice(0, 4), gallery.slice(4, 8)];

  return (
    <section ref={ref} aria-label="Moments from talks, workshops and the work" className="overflow-hidden border-b border-border lg:mx-16">
      <div className="space-y-4 px-5 py-14 sm:px-8 lg:space-y-[26px] lg:px-[66px] lg:py-[53px]">
        {rows.map((row, r) => (
          <motion.div key={r} style={{ x: r === 0 ? shiftA : shiftB }} className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-[26px]">
            {row.map((img) => (
              <div key={img.src} className="group relative aspect-[395/354] overflow-hidden rounded-[4px] bg-[#383838]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover grayscale-[35%] transition duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
