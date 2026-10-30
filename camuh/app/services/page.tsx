import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import DivisionTabs from '@/components/services/DivisionTabs';
import DivisionSection from '@/components/services/DivisionSection';
import BigStatement from '@/components/BigStatement';
import HowItWorks from '@/components/HowItWorks';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import { divisions, scenes } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Services & Products',
  description:
    'Drilling, completion & production chemicals, IoT & smart sensors, marine consumables, spare parts sourcing and oil & gas equipment leasing from Camuh Innovations, Port Harcourt.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        top="Our"
        bottom="Services"
        image={scenes.rigPipes}
        alt="Drilling rig and stacked drill pipes"
        caption="Five service lines. 25+ products. One accountable partner for your field."
      />

      <section className="bg-white py-24">
        <div className="mx-auto max-w-[760px] px-5">
          <Reveal>
            <h2 className="h-two text-[clamp(1.9rem,3.8vw,2.8rem)] leading-[1.1]">
              Cutting-edge solutions for <span className="muted">efficiency, safety and productivity in oil &amp; gas.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-[16px] leading-[1.75] text-body">
              From high-performance drilling fluid additives and production chemicals to IoT sensors that bring your field online, marine
              stores for daily vessel operations, hard-to-find spare parts and flexible equipment leasing — Camuh helps operators run more
              efficiently, reduce risk and stay ahead in a fast-changing industry.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-black/10 sm:grid-cols-5">
              {divisions.map((d) => (
                <li key={d.slug} className="bg-cream p-4">
                  <p className="text-[12px] font-semibold text-smoke">{d.index}</p>
                  <p className="mt-1 text-[14px] font-bold leading-tight">{d.shortName}</p>
                  <p className="mt-1 text-[12px] text-body">{d.products.length} products</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <DivisionTabs />
      {divisions.slice(0, 2).map((d, i) => (<DivisionSection key={d.slug} d={d} tone={i % 2 ? 'cream' : 'white'} />))}

      <BigStatement
        top={['Solutions', 'For']}
        lead="Vessel stores, critical spares and leased equipment —"
        rotating={['On time', 'On spec', 'On site']}
        bottom={['How You', 'Sail']}
        image={scenes.cargoAerial}
        imageAlt="Aerial view of a cargo vessel at sea"
      />

      {divisions.slice(2).map((d, i) => (<DivisionSection key={d.slug} d={d} tone={i % 2 ? 'cream' : 'white'} />))}

      <HowItWorks tone="cream" />
      <Faq />
      <CtaBand title="Ready when you are" />
    </>
  );
}
