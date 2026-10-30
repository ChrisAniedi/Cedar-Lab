import Link from 'next/link';
import Reveal from '../Reveal';
import RotatingWord from '../RotatingWord';

export default function Intro() {
  return (
    <section id="intro" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-[640px] px-5">
        <Reveal>
          <h2 className="text-[clamp(2rem,4.2vw,3.1rem)] font-extrabold leading-[1.12] tracking-[-0.03em]">
            Goodbye <RotatingWord words={['downtime', 'guesswork', 'stock-outs', 'delays', 'ten suppliers']} className="text-smoke" />
            <br />
            We&rsquo;ll take it from here
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-7 text-[16px] leading-[1.75] text-body">
            Camuh Innovations Limited is a Port Harcourt–based oil and gas solutions company. We bring{' '}
            <strong className="font-semibold text-ink">drilling, completion &amp; production chemicals</strong>,{' '}
            <strong className="font-semibold text-ink">IoT &amp; smart sensors</strong>,{' '}
            <strong className="font-semibold text-ink">marine consumables</strong>,{' '}
            <strong className="font-semibold text-ink">spare parts sourcing</strong> and{' '}
            <strong className="font-semibold text-ink">equipment leasing</strong> under one roof. One partner, one quote, one delivery — so your
            team spends less time chasing suppliers and more time producing. Efficient, safe and productive operations, without the
            supply-chain headaches.
          </p>
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Link href="/request-a-quote" className="btn-dark">Get Started</Link>
        </Reveal>
      </div>
    </section>
  );
}
