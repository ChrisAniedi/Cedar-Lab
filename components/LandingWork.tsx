'use client';
import { useEffect, useState } from 'react';
import { Arrow, Check } from './Glyphs';

// Serialisable shape passed from the server page. Carries everything a card
// needs plus the extra detail shown in the modal (mirrors the main-site
// case-study page, but as an on-page modal so nothing navigates away).
export type Example = {
  title: string; blurb: string; tags: string[]; big: string; rl: string; timeline: string; tech: string[];
  logo: { txt: string; bg: string }; tint: string;
  img?: string; mockHtml?: string;
  services?: string; industry?: string;
  metrics?: [string, string][];
  overview?: string; challenge?: string; built?: string[];
  quote?: string; quoteBy?: string; gallery?: string[];
};

function Shot({ ex, className }: { ex: Example; className: string }) {
  return ex.img
    // eslint-disable-next-line @next/next/no-img-element
    ? <img className={className} src={ex.img} alt={`${ex.title} preview`} loading="lazy" />
    : <div className="pshot-mock" dangerouslySetInnerHTML={{ __html: ex.mockHtml ?? '' }} />;
}

export default function LandingWork({ items }: { items: Example[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const ex = open !== null ? items[open] : null;

  // Esc to close + lock background scroll while the modal is up.
  useEffect(() => {
    if (ex === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [ex]);

  return (
    <>
      <div className="proj-grid">
        {items.map((it, i) => (
          <div
            role="button"
            tabIndex={0}
            className={`pcard lw-card reveal d${i % 3}`}
            key={it.title}
            onClick={() => setOpen(i)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(i); } }}
            aria-label={`View details for ${it.title}`}
          >
            <div className="pshot" style={{ background: it.tint }}>
              <div className="pshot-frame"><Shot ex={it} className="pshot-img" /></div>
            </div>
            <div className="ptags">{it.tags.map((t) => <span key={t}>{t}</span>)}</div>
            <div className="pfoot">
              <span className="plogo" style={{ background: it.logo.bg }} aria-hidden>{it.logo.txt}</span>
              <div className="pf-txt"><div className="ptitle">{it.title}</div><div className="pdesc">{it.blurb}</div></div>
            </div>
            <div className="pcard-meta">
              <div className="pcard-result"><span className="big">{it.big}</span><span className="rl">{it.rl}</span></div>
              <div className="pcard-sub">
                <span className="pcard-time">⏱ {it.timeline}</span>
                <div className="pcard-tech">{it.tech.slice(0, 3).map((t) => <span key={t}>{t}</span>)}</div>
              </div>
            </div>
            <span className="lw-view">View details <Arrow /></span>
          </div>
        ))}
      </div>

      {ex && (
        <div className="lw-overlay" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-label={`${ex.title} details`}>
          <div className="lw-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="lw-close" onClick={() => setOpen(null)} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>

            <div className="lw-scroll">
              <div className="lw-hero" style={{ background: ex.tint }}><Shot ex={ex} className="lw-hero-img" /></div>

              <div className="lw-body">
                <div className="lw-head">
                  <span className="plogo" style={{ background: ex.logo.bg }} aria-hidden>{ex.logo.txt}</span>
                  <div>
                    <h3>{ex.title}</h3>
                    <div className="ptags">{ex.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  </div>
                </div>

                {ex.blurb && <p className="lw-lead">{ex.blurb}</p>}

                {ex.metrics && ex.metrics.length > 0 && (
                  <div className="lw-metrics">
                    {ex.metrics.map((m, i) => <div className="mm" key={i}><div className="v">{m[0]}</div><div className="l">{m[1]}</div></div>)}
                  </div>
                )}

                {ex.overview && (
                  <section className="lw-sec"><h4>Overview</h4><p>{ex.overview}</p></section>
                )}
                {ex.challenge && (
                  <section className="lw-sec"><h4>The Challenge</h4><p>{ex.challenge}</p></section>
                )}
                {ex.built && ex.built.length > 0 && (
                  <section className="lw-sec"><h4>What We Built</h4>
                    <ul className="lw-built">{ex.built.map((b, i) => <li key={i}><Check />{b}</li>)}</ul>
                  </section>
                )}

                {ex.gallery && ex.gallery.length > 0 && (
                  <div className="lw-shots">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {ex.gallery.map((src, i) => <img key={i} src={src} alt={`${ex.title} screen ${i + 2}`} loading="lazy" />)}
                  </div>
                )}

                <section className="lw-sec"><h4>Technologies</h4>
                  <div className="tech">{ex.tech.map((t) => <span key={t}>{t}</span>)}</div>
                </section>

                {ex.quote && (
                  <blockquote className="lw-quote"><p>&ldquo;{ex.quote}&rdquo;</p>{ex.quoteBy && <cite>— {ex.quoteBy}</cite>}</blockquote>
                )}

                <a href="#contact" className="btn btn-primary lw-cta" onClick={() => setOpen(null)}>Get a Free Mockup <Arrow /></a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
