import { clientLogos } from '@/lib/data';
import Reveal from '../Reveal';

// Placeholder "logos" set as wordmarks. Swap for real client logos (SVG/PNG) when available.
function Wordmark({ name, i }: { name: string; i: number }) {
  const styles = [
    'font-extrabold tracking-tight',
    'font-medium uppercase tracking-[0.2em] text-[0.8em]',
    'font-bold italic',
    'font-semibold uppercase tracking-wide',
  ];
  return <span className={`whitespace-nowrap text-[22px] text-ink/45 transition hover:text-ink ${styles[i % styles.length]}`}>{name}</span>;
}

export default function Clients() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section className="overflow-hidden bg-white py-24">
      <Reveal className="container-x">
        <h2 className="h-two text-center text-[clamp(1.9rem,3.6vw,2.6rem)] leading-[1.12]">
          Supply partner to <br /><span className="muted">some of the region&rsquo;s toughest operations</span>
        </h2>
      </Reveal>
      <div className="relative mt-14 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-16 hover:[animation-play-state:paused]">
          {row.map((n, i) => (<Wordmark key={`${n}-${i}`} name={n} i={i} />))}
        </div>
      </div>
      <p className="mt-12 text-center text-[13px] text-body">
        And many more, <br />supplied from our base in Trans Amadi, Port Harcourt
      </p>
    </section>
  );
}
