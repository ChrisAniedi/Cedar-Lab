import Link from 'next/link';
import Reveal from './Reveal';

export default function CtaBand({
  title = 'Start your quote',
  sub = 'Tell us what you need. We’ll reply with specs, price and lead time — usually the same business day.',
  href = '/request-a-quote',
  cta = 'Request a quote',
}: { title?: string; sub?: string; href?: string; cta?: string }) {
  return (
    <section className="bg-ink py-32 text-center text-white sm:py-40">
      <Reveal className="mx-auto max-w-[720px] px-5">
        <h2 className="text-[clamp(2.2rem,4.6vw,3.2rem)] font-extrabold tracking-[-0.03em]">{title}</h2>
        <p className="mx-auto mt-4 max-w-[480px] text-[15px] leading-relaxed text-white/65">{sub}</p>
        <Link href={href} className="btn-white btn-caps mt-8 rounded-none px-7 py-3 text-[12px]">{cta}</Link>
      </Reveal>
    </section>
  );
}
