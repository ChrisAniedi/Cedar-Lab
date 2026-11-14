"use client";

import * as React from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ease } from "@/components/motion";

type Token = { text: string; role?: boolean };

// Headline copy — roles are highlighted the way the Figma design underlines them in amber.
const headline: Token[] = [
  { text: "As a" },
  { text: "Product Designer,", role: true },
  { text: "Product Manager", role: true },
  { text: "and" },
  { text: "AI‑augmented Engineer,", role: true },
  { text: "I blend design insight with product ownership to turn complex problems into simple, human‑centred products — and then I ship them." },
];

export function Hero() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${sx}% ${sy}%, rgb(234 166 77 / 0.10), transparent 60%)`;

  function onMove(e: React.PointerEvent) {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  let wordIndex = 0;

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative overflow-hidden pt-20 lg:px-16 lg:pt-24"
      aria-labelledby="hero-title"
    >
      {/* ambient layers */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: spotlight }} />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,#212121_1px,transparent_1px),linear-gradient(to_bottom,#212121_1px,transparent_1px)] [background-size:96px_96px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_20%,transparent_75%)]"
      />

      <div className="relative border-b border-border">
        <div className="mx-auto flex min-h-[78svh] max-w-[1210px] flex-col justify-center px-5 py-20 sm:px-8 lg:min-h-[520px] lg:px-0 lg:py-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <Badge variant="glass" className="mb-8 px-3.5 py-1.5 text-[13px] font-normal">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-400" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Available for new projects
            </Badge>
          </motion.div>

          <h1
            id="hero-title"
            className="text-balance text-[28px] font-light leading-[1.28] tracking-[-0.035em] text-foreground sm:text-[36px] lg:text-[41.3px] lg:leading-[54px]"
          >
            {headline.map((token, ti) =>
              token.text.split(" ").map((w, wi, arr) => {
                const i = wordIndex++;
                const isLastOfToken = wi === arr.length - 1;
                return (
                  <span key={`${ti}-${wi}`} className="inline-block overflow-hidden pb-[0.12em] align-top">
                    <motion.span
                      className="relative inline-block"
                      initial={reduce ? false : { y: "105%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.028 }}
                    >
                      <span className={token.role ? "relative text-primary" : undefined}>
                        {w}
                        {token.role && (
                          <motion.span
                            aria-hidden
                            className="absolute -bottom-0.5 left-0 h-px w-full origin-left bg-primary/70"
                            initial={reduce ? false : { scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.8, ease, delay: 1.1 + i * 0.02 }}
                          />
                        )}
                      </span>
                      {!(ti === headline.length - 1 && isLastOfToken) && " "}
                    </motion.span>
                  </span>
                );
              }),
            )}
          </h1>

          <motion.div
            className="mt-11 flex flex-wrap items-center gap-3.5"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.05 }}
          >
            <Button asChild size="lg" className="h-[46px] px-5 text-[17px]">
              <a href={`mailto:${site.email}?subject=Let%E2%80%99s%20talk`}>
                Schedule a free call
                <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-[46px] border-[0.6px] border-white/70 px-5 text-[17px]">
              <a href={site.links.upwork} target="_blank" rel="noreferrer">
                Hire on Upwork
                <ArrowUpRight className="transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
