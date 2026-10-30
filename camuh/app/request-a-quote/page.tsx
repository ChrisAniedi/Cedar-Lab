import type { Metadata } from 'next';
import QuoteForm from '@/components/quote/QuoteForm';
import Reveal from '@/components/Reveal';
import { company, steps } from '@/lib/data';
import { Mail, Phone, Pin, WhatsApp } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Request a Quote',
  description: 'Request a quote for oilfield chemicals, IoT sensors, marine consumables, spare parts or equipment leasing from Camuh Innovations.',
};

type SP = Promise<Record<string, string | string[] | undefined>>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function QuotePage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const initial = { service: one(sp.service), product: one(sp.product), qty: one(sp.qty), location: one(sp.location) };

  return (
    <>
      {/* Black statement header — same giant split type as the rest of the site */}
      <section className="relative flex h-[62svh] min-h-[440px] flex-col justify-between overflow-hidden bg-ink pb-6 pt-[76px] text-white">
        <p aria-hidden className="pl-3 font-display text-mega font-medium uppercase sm:pl-5">Request</p>
        <p className="mx-auto max-w-[360px] px-6 text-center text-[15px] leading-relaxed text-white/75">
          Tell us what you need. We&rsquo;ll reply with specifications, price and lead time — usually the same business day.
        </p>
        <p aria-hidden className="pr-3 text-right font-display text-mega font-medium uppercase sm:pr-5">A Quote</p>
        <h1 className="sr-only">Request a quote</h1>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          <Reveal y={20}>
            <QuoteForm initial={initial} />
          </Reveal>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Reveal y={20} delay={0.1} className="rounded-2xl bg-ink p-7 text-white">
              <h2 className="text-[20px] font-bold">What happens next</h2>
              <ol className="mt-5 space-y-5">
                {steps.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="font-display text-[22px] font-medium leading-none text-white/35">{s.step}</span>
                    <div>
                      <p className="text-[15px] font-semibold">{s.title}</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-white/60">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal y={20} delay={0.15} className="rounded-2xl bg-white p-7">
              <h2 className="text-[20px] font-bold">Prefer to talk?</h2>
              <ul className="mt-5 space-y-4 text-[14px]">
                {company.phones.map((p) => (
                  <li key={p.href}><a href={p.href} className="flex items-center gap-3 font-medium hover:underline"><Phone className="h-4 w-4 shrink-0" />{p.label}</a></li>
                ))}
                {company.emails.map((e) => (
                  <li key={e}><a href={`mailto:${e}`} className="flex items-center gap-3 break-all font-medium hover:underline"><Mail className="h-4 w-4 shrink-0" />{e}</a></li>
                ))}
                <li>
                  <a href={company.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 font-medium hover:underline">
                    <Pin className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{company.address.join(', ')}</span>
                  </a>
                </li>
              </ul>
              <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn mt-6 w-full bg-[#25D366] text-white hover:brightness-95">
                <WhatsApp /> Chat on WhatsApp
              </a>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
