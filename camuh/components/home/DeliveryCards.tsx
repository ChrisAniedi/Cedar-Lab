import Image from 'next/image';
import { scenes } from '@/lib/data';
import Reveal from '../Reveal';
import { Exchange } from '../Icons';

const items = [
  {
    kicker: 'From our warehouse to your',
    a: 'Chemicals',
    b: 'Wellsite',
    image: scenes.rigPipes,
    alt: 'Drilling rig with stacked pipes',
    badge: 'Same-day quotes',
    title: 'Because supply should feel like a partnership, not a purchase order.',
    body: 'Bentonite, Baryte, KCl, Soda Ash, Xylene and more — batch-tested, documented and delivered to your base, jetty or rig. Bulk or by the bag, we keep your mud program and production chemistry on schedule.',
  },
  {
    kicker: 'From anywhere in the world to your',
    a: 'Spares',
    b: 'Vessel',
    image: scenes.craneVessel,
    alt: 'Crane lifting a supply vessel at the quayside',
    badge: 'Photo-to-part sourcing',
    title: 'Find the part, verify it, deliver it — before downtime adds up.',
    body: 'Send a part number or a photo of the nameplate. We identify it, source genuine or approved equivalents, and coordinate maintenance needs so your vessels and engines get back to work fast.',
  },
];

export default function DeliveryCards() {
  return (
    <section className="bg-white py-20 sm:py-24">
      {items.map((it, idx) => (
        <div key={it.a} className={`container-x ${idx > 0 ? 'mt-24' : ''}`}>
          <Reveal className="text-center">
            <p className="text-[clamp(1rem,1.6vw,1.35rem)] font-light">{it.kicker}</p>
            <p className="mt-1 flex items-center justify-center gap-[clamp(1rem,5vw,4rem)] text-[clamp(2.4rem,5.6vw,4rem)] font-extrabold leading-none tracking-[-0.03em]">
              <span>{it.a}</span>
              <Exchange className="h-[0.55em] w-[0.55em] text-smoke" strokeWidth={1.6} aria-label="to" />
              <span>{it.b}</span>
            </p>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-10 h-[520px] overflow-hidden rounded-2xl sm:h-[440px]">
            <Image src={it.image} alt={it.alt} fill sizes="(max-width: 1200px) 100vw, 1200px" className="object-cover" />
            <span className="absolute left-1/2 top-[34%] -translate-x-1/2 rounded-md bg-white px-6 py-3 text-[12px] font-semibold uppercase tracking-wide text-ink shadow-card">
              {it.badge}
            </span>
            <div className="absolute inset-x-4 bottom-0 rounded-t-xl bg-white px-6 pb-8 pt-8 sm:inset-x-[12%] sm:px-[10%]">
              <h3 className="text-[clamp(1.2rem,2vw,1.5rem)] font-medium leading-snug">{it.title}</h3>
              <p className="mt-3 text-[14px] leading-[1.7] text-body">{it.body}</p>
            </div>
          </Reveal>
        </div>
      ))}
    </section>
  );
}
