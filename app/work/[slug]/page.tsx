import FinalCta from '@/components/FinalCta';
import { Arrow, Check } from '@/components/Glyphs';
import ProjectCard from '@/components/ProjectCard';
import PrototypeFrame from '@/components/PrototypeFrame';
import ScreenGallery from '@/components/ScreenGallery';
import { getProject, PROJECTS } from '@/lib/site-data';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProject(params.slug);
  if (!p) return {};
  return { title: p.fullTitle ?? p.title, description: p.blurb ?? p.overview };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const p = getProject(params.slug);
  if (!p) notFound();

  // Defensive defaults so a stale build/cache can never crash the page.
  const images = p.images ?? [];
  const tech = p.tech ?? [];
  const metrics = p.metrics ?? [];
  const built = p.built ?? [];
  const highlights = p.highlights ?? [];
  const title = p.fullTitle ?? p.title;
  const others = PROJECTS.filter((x) => x.slug !== p.slug).slice(0, 3);
  const tags = Array.from(
    new Set([p.tag, ...(p.industry ?? '').split('·').map((s) => s.trim())].filter(Boolean)),
  );

  return (
    <>
      <section className="cs-hero"><div className="wrap cs-narrow">
        <div className="crumb reveal"><Link href="/">Home</Link> / <Link href="/work">Work</Link> / {title}</div>
        <div className="cs-tags reveal d1">{tags.map((t) => <span key={t}>{t}</span>)}</div>
        <h1 className="reveal d1">{title}</h1>
        {p.blurb && <p className="lead reveal d2">{p.blurb}</p>}
      </div></section>

      <section className="cs-shot-wrap"><div className="wrap">
        <figure className="cs-shot reveal">
          {images[0]
            // eslint-disable-next-line @next/next/no-img-element
            ? <img className="cs-hero-img" src={images[0]} alt={`${title} — main screen`} />
            : p.prototypeHtml
              ? <PrototypeFrame html={p.prototypeHtml} title={`${title} product screenshot`} />
              : <div className="cs-mock" dangerouslySetInnerHTML={{ __html: p.mock }} />}
        </figure>
      </div></section>

      <section className="sec cs-main"><div className="wrap cs-narrow">
        {/* project overview bar */}
        <div className="cs-overview reveal">
          <div><div className="cs-ml">Services</div><div className="cs-mv">{p.services ?? '—'}</div></div>
          <div><div className="cs-ml">Industry</div><div className="cs-mv">{p.industry}</div></div>
          <div><div className="cs-ml">Timeline</div><div className="cs-mv">{p.timeline}</div></div>
        </div>

        {/* headline metrics */}
        <div className="cs-metrics reveal d1">
          {metrics.map((m, i) => (
            <div className="mm" key={i}><div className="v">{m[0]}</div><div className="l">{m[1]}</div></div>
          ))}
        </div>

        {/* narrative */}
        <div className="cs-body reveal d2">
          <section className="cs-sec">
            <h2>Overview</h2>
            <p>{p.overview}</p>
          </section>
          <section className="cs-sec">
            <h2>The Challenge</h2>
            <p>{p.challenge}</p>
          </section>
          <section className="cs-sec">
            <h2>What We Built</h2>
            <ul className="cs-built">
              {built.map((b, i) => <li key={i}><Check />{b}</li>)}
            </ul>
          </section>

          {p.goal && (
            <section className="cs-sec">
              <h2>Goal</h2>
              <p>{p.goal}</p>
              {highlights.length > 0 && (
                <div className="cs-highlights">
                  {highlights.map((h, i) => (
                    <div key={i}><div className="hv">{h[0]}</div><div className="hl">{h[1]}</div></div>
                  ))}
                </div>
              )}
            </section>
          )}

          <section className="cs-sec">
            <h2>Technologies</h2>
            <div className="tech">{tech.map((t) => <span key={t}>{t}</span>)}</div>
          </section>

          <blockquote className="cs-quote">
            <p>&ldquo;{p.quote}&rdquo;</p>
            <cite>— {p.quoteBy}</cite>
          </blockquote>
        </div>
      </div></section>

      {images.length > 1 && (
        <section className="sec cs-screens"><div className="wrap">
          <ScreenGallery images={images.slice(1)} title={title} />
        </div></section>
      )}

      {others.length > 0 && (
        <section className="sec cs-more"><div className="wrap">
          <div className="work-head reveal">
            <div>
              <span className="kicker">More Work</span>
              <h2 className="title">Explore other projects</h2>
            </div>
            <Link href="/work" className="btn btn-ghost">View all <Arrow /></Link>
          </div>
          <div className="proj-grid">
            {others.map((o, i) => <ProjectCard key={o.id} p={o} className={`reveal d${i % 3}`} />)}
          </div>
        </div></section>
      )}

      <FinalCta />
    </>
  );
}
