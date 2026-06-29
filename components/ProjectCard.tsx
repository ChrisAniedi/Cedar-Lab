'use client';
import Link from 'next/link';
import type { MouseEvent } from 'react';
import PrototypeFrame from './PrototypeFrame';

// Cursor-following 3D tilt — the card angles toward the pointer, then eases back.
function handleMove(e: MouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transition = 'none';
  el.style.transform = `perspective(950px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg) translateY(-8px)`;
}
function handleLeave(e: MouseEvent<HTMLAnchorElement>) {
  const el = e.currentTarget;
  el.style.transition = 'transform .45s cubic-bezier(.22,1,.36,1)';
  el.style.transform = '';
}

export interface ProjectCardData {
  id: number; slug: string; tag: string; industry: string; title: string;
  blurb?: string; tech: string[]; mock: string; prototypeHtml?: string; images?: string[];
  timeline: string; big: string; rl: string;
}

// One consistent frame tint for every card, so the grid reads as a cohesive
// set rather than a patchwork of different-coloured boxes.
const FRAME_TINT = 'linear-gradient(150deg,#1c2336 0%,#0c0e15 78%)';
const LOGO_TINTS = [
  'linear-gradient(135deg,#7B6CF6,#5B4DE0)',
  'linear-gradient(135deg,#3B82F6,#1A4FBA)',
  'linear-gradient(135deg,#2DD4BF,#0E9F8E)',
  'linear-gradient(135deg,#F59E0B,#D97706)',
  'linear-gradient(135deg,#60A5FA,#2563EB)',
  'linear-gradient(135deg,#F472B6,#C026D3)',
];

// Real product marks (mirroring each app's own logo) for projects that have one.
const BRAND_LOGOS: Record<string, { bg: string; svg: React.ReactNode }> = {
  talently: {
    bg: 'linear-gradient(135deg,#7B6CF6,#5B4DE0)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 17 17" fill="none">
        <path d="M3 5.5a2 2 0 0 1 2-2h2l1-1.5h2L11 3.5h1a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
        <circle cx="8.5" cy="8.5" r="2.3" stroke="white" strokeWidth="1.3" />
      </svg>
    ),
  },
  hovra: {
    bg: 'linear-gradient(135deg,#3B82F6,#2057D8)',
    svg: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M3 9.3 10 4l7 5.3V16a1 1 0 0 1-1 1h-3.3v-4.4H7.3V17H4a1 1 0 0 1-1-1z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  resa: {
    bg: 'linear-gradient(135deg,#8B5CF6,#6D28D9)',
    svg: (
      <svg width="19" height="19" viewBox="0 0 14 14" fill="none">
        <path d="M7 1.5C4.2 1.5 2 3.5 2 6c0 1.3.6 2.4 1.5 3.2L3 11l2.2-1.1C5.7 10 6.4 10.2 7 10.2c2.8 0 5-2 5-4.2S9.8 1.5 7 1.5z" stroke="white" strokeWidth="1.3" />
      </svg>
    ),
  },
};

export default function ProjectCard({ p, className = 'reveal' }: { p: ProjectCardData; className?: string }) {
  const frame = FRAME_TINT;
  const brand = BRAND_LOGOS[p.slug];
  const tags = Array.from(
    new Set([p.tag, ...p.industry.split('·').map((s) => s.trim())].filter(Boolean)),
  ).slice(0, 3);
  const mono = (p.title.replace(/[^A-Za-z0-9]/g, '')[0] || '?').toUpperCase();

  return (
    <Link href={`/work/${p.slug}`} className={`pcard ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <div className="pshot" style={{ background: frame }}>
        <div className="pshot-frame">
          {p.prototypeHtml
            ? <PrototypeFrame html={p.prototypeHtml} title={`${p.title} preview`} />
            : p.images && p.images[0]
              // eslint-disable-next-line @next/next/no-img-element
              ? <img className="pshot-img" src={p.images[0]} alt={`${p.title} preview`} loading="lazy" />
              : <div className="pshot-mock" dangerouslySetInnerHTML={{ __html: p.mock }} />}
        </div>
      </div>

      <div className="ptags">{tags.map((t) => <span key={t}>{t}</span>)}</div>

      <div className="pfoot">
        <span className="plogo" style={{ background: brand ? brand.bg : LOGO_TINTS[p.id % LOGO_TINTS.length] }} aria-hidden>
          {brand ? brand.svg : mono}
        </span>
        <div className="pf-txt">
          <div className="ptitle">{p.title}</div>
          {p.blurb && <div className="pdesc">{p.blurb}</div>}
        </div>
      </div>

      <div className="pcard-meta">
        <div className="pcard-result"><span className="big">{p.big}</span><span className="rl">{p.rl}</span></div>
        <div className="pcard-sub">
          <span className="pcard-time">⏱ {p.timeline}</span>
          <div className="pcard-tech">{p.tech.slice(0, 3).map((t) => <span key={t}>{t}</span>)}</div>
        </div>
      </div>
    </Link>
  );
}
