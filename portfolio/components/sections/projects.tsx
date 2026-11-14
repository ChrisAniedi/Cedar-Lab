import { ArrowRight } from "lucide-react";

import { projects } from "@/lib/site";
import { Reveal } from "@/components/motion";
import { ProjectCard } from "@/components/sections/project-card";
import { Statement } from "@/components/sections/statement";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-24 border-b border-border lg:mx-16">
      <div className="px-5 pt-14 sm:px-8 lg:px-8 lg:pt-14">
        <Reveal className="flex items-center justify-between">
          <h2 id="projects-title" className="flex items-center gap-3 text-[26px] font-light tracking-[-0.04em] lg:text-[30.5px]">
            Recent Projects
            <span className="grid h-[26px] min-w-8 place-items-center rounded-[10px] bg-stone/30 px-2 text-base tracking-wide text-white">
              {projects.length}
            </span>
          </h2>
          <a
            href="#projects"
            className="group flex items-center gap-1.5 text-[15.9px] tracking-[0.02em] text-foreground/80 transition-colors hover:text-foreground"
          >
            View all
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>

        <div className="mt-12 lg:mt-14">
          <Statement text="Great products are born at the intersection of thoughtful design and purposeful strategy — where user needs are met with clarity, and business goals are achieved through meaningful, human‑centred solutions." />
        </div>
      </div>

      {/* 2-column grid with the hairline centre divider + row dividers from the design */}
      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:mt-20">
        {projects.map((p, i) => (
          <div
            key={p.slug}
            className={[
              "border-t border-border px-5 py-10 sm:px-8 lg:px-8 lg:py-14",
              i % 2 === 0 ? "md:border-r" : "",
            ].join(" ")}
          >
            <ProjectCard project={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
