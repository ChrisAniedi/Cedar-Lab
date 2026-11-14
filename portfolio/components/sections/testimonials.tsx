import Image from "next/image";

import { testimonials } from "@/lib/site";
import { Reveal } from "@/components/motion";

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="border-b border-border lg:mx-16">
      <div className="px-5 py-16 sm:px-8 lg:px-8 lg:py-20">
        <h2 id="testimonials-title" className="sr-only">
          What people say
        </h2>
        <div className="mx-auto grid max-w-4xl gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <figure className="relative h-full overflow-hidden rounded-[14px] border border-[rgba(231,234,236,0.12)] bg-[#141414] p-7 lg:p-9">
                <svg aria-hidden viewBox="0 0 24 24" className="mb-6 size-8 text-primary"><path fill="currentColor" d="M9.5 6C6 7.2 4 9.8 4 13.4V18h6v-6H7.3c.2-2 1.4-3.4 3.2-4.1L9.5 6Zm10 0C16 7.2 14 9.8 14 13.4V18h6v-6h-2.7c.2-2 1.4-3.4 3.2-4.1L19.5 6Z"/></svg>
                <blockquote className="relative text-pretty text-[18px] font-light leading-[1.6] text-[#d9d2c7] lg:text-[21px]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="relative mt-8 flex items-center gap-3">
                  <Image src={t.avatar} alt="" width={40} height={40} className="size-10 rounded-full object-cover" />
                  <div className="text-sm leading-tight">
                    <div className="font-normal text-foreground">{t.name}</div>
                    <div className="mt-0.5 text-muted-foreground">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
