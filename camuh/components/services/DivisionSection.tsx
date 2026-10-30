import Image from 'next/image';
import Link from 'next/link';
import type { Division } from '@/lib/data';
import Reveal from '../Reveal';
import { ArrowRight, Check } from '../Icons';

export default function DivisionSection({ d, tone }: { d: Division; tone: 'white' | 'cream' }) {
  return (
    <section id={d.slug} className={`scroll-mt-28 ${tone === 'cream' ? 'bg-cream' : 'bg-white'} py-24`}>
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow text-smoke">{d.index} — {d.shortName}</p>
            <h2 className="h-two mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.06]">
              {d.name.split(' ').slice(0, -1).join(' ')} <span className="muted">{d.name.split(' ').slice(-1)}</span>
            </h2>
            <p className="mt-5 text-[19px] font-semibold leading-snug">{d.tagline}</p>
            <p className="mt-4 text-[15px] leading-[1.75] text-body">{d.intro}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {d.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-[14px] font-medium">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-ink text-white"><Check width={12} height={12} strokeWidth={2.6} /></span>
                  {h}
                </li>
              ))}
            </ul>
            <Link href={`/request-a-quote?service=${d.slug}`} className="btn-black btn-caps mt-8">Request a quote</Link>
          </Reveal>
          <Reveal delay={0.1} className="relative min-h-[320px] overflow-hidden rounded-2xl bg-white lg:min-h-0">
            <Image
              src={d.products[0].image}
              alt={d.products[0].name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={d.products[0].cutout ? 'object-contain p-12' : 'object-cover'}
            />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {d.products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.06} className="h-full">
              <article id={p.slug} className={`group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl ${tone === 'cream' ? 'bg-white' : 'bg-cream'}`}>
                <div className="relative h-[220px] overflow-hidden bg-gradient-to-b from-[#f4f4f2] to-[#e3e2de]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className={`transition duration-700 group-hover:scale-105 ${p.cutout ? 'object-contain p-8' : 'object-cover'}`}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[12px] font-semibold uppercase tracking-wide text-smoke">{p.subtitle}</p>
                  <h3 className="mt-1.5 text-[20px] font-extrabold tracking-tight">{p.name}</h3>
                  <p className="mt-3 flex-1 text-[14px] leading-relaxed text-body">{p.description}</p>
                  {p.specs && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.specs.map((s) => (<li key={s} className="rounded-full border border-black/10 px-2.5 py-1 text-[11px] font-medium">{s}</li>))}
                    </ul>
                  )}
                  <Link
                    href={`/request-a-quote?service=${d.slug}&product=${p.slug}`}
                    className="mt-5 inline-flex items-center gap-2 self-start text-[13px] font-bold uppercase tracking-wide"
                  >
                    Add to quote <ArrowRight width={16} height={16} className="transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
