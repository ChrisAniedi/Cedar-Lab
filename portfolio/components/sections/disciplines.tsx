"use client";

import { motion } from "motion/react";

import { disciplines } from "@/lib/site";
import { Reveal, WordsReveal, ease } from "@/components/motion";

/** New section: frames the three hats — design, product, AI‑augmented engineering. */
export function Disciplines() {
  return (
    <section aria-labelledby="how-title" className="border-b border-border lg:mx-16">
      <div className="px-5 py-16 sm:px-8 lg:px-8 lg:py-24">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">How I work</p>
          </Reveal>
          <h2 id="how-title" className="text-balance text-[28px] font-light leading-[1.2] tracking-[-0.04em] lg:text-[40px]">
            <WordsReveal text="One person across the whole product loop —" />{" "}
            <span className="font-serif italic text-primary">
              <WordsReveal text="from first insight to shipped code." delay={0.25} />
            </span>
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3 lg:mt-20">
          {disciplines.map((d, i) => (
            <motion.article
              key={d.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.12 }}
              className="group relative flex flex-col bg-background p-7 transition-colors duration-500 hover:bg-[#0d0d0d] lg:p-10"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-700 group-hover:scale-x-100"
              />
              <span className="font-mono text-sm text-muted-foreground">{d.index}</span>
              <h3 className="mt-10 text-[26px] font-normal tracking-[-0.035em] lg:mt-16 lg:text-[30px]">{d.title}</h3>
              <p className="mt-3 text-[15.5px] leading-[1.75] text-muted-foreground">{d.blurb}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {d.skills.map((s) => (
                  <li
                    key={s}
                    className="rounded-full bg-secondary px-3 py-1 text-[13px] text-foreground/85 transition-colors group-hover:bg-[#2a2a2a]"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
