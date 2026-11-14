import { impact } from "@/lib/site";
import { Reveal } from "@/components/motion";

export function Impact() {
  return (
    <section aria-labelledby="impact-title" className="border-b border-border lg:mx-16">
      <div className="mx-auto max-w-[1660px] px-5 py-16 sm:px-8 lg:px-[66px] lg:py-24">
        <Reveal>
          <h2 id="impact-title" className="text-[26px] font-light leading-tight tracking-[-0.05em] text-primary lg:text-[32px] lg:leading-[38px]">
            Growth matters most when it lifts others too.
          </h2>
          <p className="mt-5 max-w-[1265px] text-pretty text-[19px] font-light leading-[1.45] tracking-[-0.04em] text-foreground/90 lg:text-[26px] lg:leading-[38px]">
            I believe real success is measured in the lives we touch. Beyond wireframes and roadmaps, I want to
            create pathways for others to learn, to grow, and to believe they can achieve more than they ever
            imagined. Every product tells a story — but the greatest story is in the people it empowers.
          </p>
        </Reveal>

        <div className="mt-10 border-t border-border pt-12 lg:mt-12 lg:pt-20">
          <ul className="grid gap-x-16 gap-y-12 md:grid-cols-2 lg:gap-y-24">
            {impact.map((item, i) => (
              <Reveal key={item.title} delay={(i % 2) * 0.1}>
                <li className="group relative pl-5">
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 h-[calc(100%-0.5rem)] w-[5px] origin-top bg-primary transition-transform duration-500 group-hover:scale-y-110"
                  />
                  <h3 className="text-[24px] font-medium leading-[1.2] tracking-[-0.045em] lg:text-[34px] lg:leading-[44px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-[533px] text-[17px] font-light leading-[1.45] tracking-[-0.03em] text-foreground/80 lg:text-[22px] lg:leading-[32px]">
                    {item.body}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
