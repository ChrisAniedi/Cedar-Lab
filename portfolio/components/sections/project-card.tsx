"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/lib/site";
import { Reveal } from "@/components/motion";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hover, setHover] = React.useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const cx = useSpring(x, { stiffness: 400, damping: 35 });
  const cy = useSpring(y, { stiffness: 400, damping: 35 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  }

  return (
    <Reveal delay={(index % 2) * 0.12}>
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="group block outline-none"
        aria-label={`${project.name} — ${project.summary} (opens in a new tab)`}
      >
        <div className="mb-6">
          <div className="mb-2.5 flex items-center gap-2 text-[15px] tracking-[0.03em] text-muted-foreground lg:text-[17px]">
            <span className="size-2.5 rounded-full bg-primary/90" />
            {project.category}
          </div>
          <div className="flex items-start justify-between gap-6">
            <h3 className="text-[28px] font-normal leading-[1.2] tracking-[-0.035em] lg:text-[34px] lg:leading-[42px]">
              {project.name}
            </h3>
            <span className="mt-1.5 grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-500 group-hover:rotate-45 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-4" />
            </span>
          </div>
          <p className="mt-2 max-w-[60ch] text-[15.5px] leading-[1.8] tracking-[0.02em] text-muted-foreground lg:text-[16.7px]">
            {project.summary}
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.roles.map((r) => (
              <li key={r} className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div
          onPointerMove={onMove}
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
          className="relative aspect-[826/730] overflow-hidden rounded-[4px] ring-1 ring-white/5 transition-shadow duration-500 group-focus-visible:ring-2 group-focus-visible:ring-ring md:cursor-none"
          style={{ backgroundColor: project.tint }}
        >
          {/* Screenshot sits inset 4% from top-left and bleeds off the bottom-right, as in the design. */}
          <div className="absolute left-[4%] top-[4.3%] w-[118%] transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-x-[1.5%] group-hover:-translate-y-[1.5%] group-hover:scale-[1.02]">
            <Image
              src={project.image}
              alt={`${project.name} product screenshot`}
              width={1440}
              height={1024}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full rounded-tl-[8px] shadow-[12px_22px_48px_16px_rgba(0,0,0,0.24)]"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <AnimatePresence>
            {hover && (
              <motion.span
                aria-hidden
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{ left: cx, top: cy }}
                className="pointer-events-none absolute z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-background/90 px-4 py-2.5 text-sm font-normal text-foreground shadow-xl backdrop-blur md:flex"
              >
                View project <ArrowUpRight className="size-4 text-primary" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </a>
    </Reveal>
  );
}
