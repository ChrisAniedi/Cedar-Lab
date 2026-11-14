import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Reveal, WordsReveal } from "@/components/motion";
import { CopyEmail } from "@/components/copy-email";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden lg:mx-16">
      <div aria-hidden className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative grid gap-14 border-b border-border px-5 py-16 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-[66px] lg:py-24">
        <div>
          <Reveal>
            <p className="flex items-center gap-2.5 text-[20px] text-primary lg:text-[24px]">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-primary" />
                <span className="relative inline-flex size-2.5 rounded-full bg-primary" />
              </span>
              Available to work
            </p>
          </Reveal>
          <h2 id="contact-title" className="mt-5 max-w-[16ch] text-balance text-[38px] font-light leading-[1.05] tracking-[-0.055em] text-stone sm:text-[52px] lg:text-[72px]">
            <WordsReveal text="Let’s build products that" />{" "}
            <span className="font-serif italic tracking-[-0.02em] text-foreground">
              <WordsReveal text="matter." delay={0.2} />
            </span>
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-muted-foreground lg:text-[19px]">
              Blending design, strategy and code — one solution at a time. Tell me what you&rsquo;re building.
            </p>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <Button asChild size="lg" className="h-[46px] px-6 text-[17px]">
                <a href={`mailto:${site.email}?subject=Let%E2%80%99s%20talk`}>
                  Schedule a free call
                  <ArrowRight className="transition-transform duration-300 group-hover/button:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-[46px] border-[0.6px] border-white/70 px-6 text-[17px]">
                <a href={site.links.upwork} target="_blank" rel="noreferrer">
                  Hire on Upwork <ArrowUpRight />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.3} className="lg:min-w-[440px]">
          <div className="flex items-center gap-4">
            <Image src="/images/people/chris.webp" alt={site.name} width={94} height={94} className="size-[72px] rounded-full object-cover ring-1 ring-white/10 lg:size-[94px]" />
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <p className="text-[24px] font-normal tracking-[0.01em] text-white lg:text-[32px]">{site.name}</p>
                <span className="text-sm text-stone/80">{site.credential}</span>
              </div>
              <p className="mt-1 text-[15px] text-stone/70 lg:text-base">Technical Product Manager · Product Designer</p>
            </div>
          </div>
          <div className="mt-8">
            <p className="text-[16px] text-muted-foreground lg:text-[18px]">or email me at</p>
            <div className="mt-1.5">
              <CopyEmail email={site.email} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
