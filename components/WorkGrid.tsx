'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProjectCard from './ProjectCard';
import type { CaseStudy } from '@/lib/site-data';

type Project = CaseStudy & { id: number; mock: string };

export default function WorkGrid({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const c = open === null ? null : projects[open];

  useEffect(() => {
    document.body.style.overflow = c ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(null); };
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [c]);

  return (
    <>
      <div className="proj-grid">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} p={p} clickable onOpen={() => setOpen(i)} />
        ))}
      </div>

      <div className={`modal${c ? ' open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="cmTitle">
        <div className="scrim" onClick={() => setOpen(null)} />
        {c && (
          <div className="sheet">
            <button className="close" aria-label="Close case study" onClick={() => setOpen(null)}>
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
            <div className="m-hero">
              <div className="mtags">{[c.industry, c.tag, c.timeline].map((t) => <span key={t}>{t}</span>)}</div>
              <h2 id="cmTitle">{c.title}</h2>
            </div>
            <div className="m-metrics">
              {c.metrics.map((m, i) => (
                <div className="mm" key={i}><div className="v">{m[0]}</div><div className="l">{m[1]}</div></div>
              ))}
            </div>
            <div className="m-body">
              <p>{c.overview}</p>
              <h4>The Challenge</h4><p>{c.challenge}</p>
              <h4>What We Built</h4>
              <ul className="built">
                {c.built.map((b, i) => (
                  <li key={i}><svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2"><path d="M5 12l4 4 10-10" />
                  </svg>{b}</li>
                ))}
              </ul>
              <h4>Technologies</h4>
              <div className="m-tech">{c.tech.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="m-quote"><p>&ldquo;{c.quote}&rdquo;</p><div className="qa">— {c.quoteBy}</div></div>
            </div>
            <div className="m-foot">
              <Link href="/contact" className="btn btn-primary">Start a similar project</Link>
              <Link href="/contact" className="btn btn-ghost">Book a call</Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
