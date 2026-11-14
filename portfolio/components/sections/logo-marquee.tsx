import Image from "next/image";

import { clientLogos } from "@/lib/site";

function LogoRow({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-16 pr-16 lg:gap-20 lg:pr-20">
      {clientLogos.map((logo) => (
        <li
          key={logo.name}
          className="flex items-center gap-2 opacity-45 grayscale transition-opacity duration-300 hover:opacity-100"
        >
          <Image
            src={logo.src}
            alt={hidden || logo.label ? "" : logo.name}
            width={logo.width}
            height={logo.height}
            className="h-7 w-auto brightness-0 invert lg:h-8"
          />
          {logo.label && (
            <span className="whitespace-nowrap text-2xl font-semibold tracking-[-0.04em] text-foreground">
              {logo.label}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  return (
    <section aria-label="Teams I've designed and built for" className="border-b border-border lg:mx-16">
      <div className="flex flex-col gap-6 px-5 py-6 sm:px-8 md:flex-row md:items-center md:gap-0 lg:px-8">
        <p className="shrink-0 text-[15px] leading-snug text-muted-foreground md:w-44 md:border-r md:border-border md:pr-6 lg:text-[17px]">
          Design &amp; PM
          <br className="hidden md:block" /> impact for
        </p>
        <div className="mask-fade-x group relative flex overflow-hidden md:pl-6 [--marquee-duration:38s]">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
            <LogoRow />
            <LogoRow hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
