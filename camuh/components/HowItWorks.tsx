import { steps } from '@/lib/data';
import Reveal from './Reveal';

export default function HowItWorks({ tone = 'white' }: { tone?: 'white' | 'cream' }) {
  return (
    <section className={`${tone === 'cream' ? 'bg-cream' : 'bg-white'} py-24`}>
      <div className="container-x">
        <Reveal>
          <h2 className="h-two text-center text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.12]">
            From request to delivery <br /><span className="muted">in four simple steps</span>
          </h2>
        </Reveal>
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.08} className="h-full">
              <li className="flex h-full flex-col rounded-2xl bg-ink p-7 text-white">
                <span className="font-display text-[56px] font-medium leading-none text-white/25">{s.step}</span>
                <h3 className="mt-10 text-[19px] font-bold">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/65">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
