import Link from 'next/link';
import PrototypeFrame from './PrototypeFrame';

export interface ProjectCardData {
  id: number; slug: string; tag: string; industry: string; title: string;
  blurb?: string; tech: string[]; mock: string; prototypeHtml?: string;
  timeline: string; big: string; rl: string;
}

const FRAME_TINTS = [
  'linear-gradient(145deg,#26314b 0%,#0d1019 70%)',
  'linear-gradient(145deg,#2a2442 0%,#0e0c17 70%)',
  'linear-gradient(145deg,#123034 0%,#0a1413 70%)',
  'linear-gradient(145deg,#33291a 0%,#14100a 70%)',
  'linear-gradient(145deg,#1c2e46 0%,#0b0f17 70%)',
  'linear-gradient(145deg,#2e1f2e 0%,#120b12 70%)',
];
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
    bg: '#1A4FBA',
    svg: (
      <svg width="19" height="19" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" />
        <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.6" />
        <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.6" />
        <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.3" />
      </svg>
    ),
  },
};

export default function ProjectCard({ p, className = 'reveal' }: { p: ProjectCardData; className?: string }) {
  const frame = FRAME_TINTS[p.id % FRAME_TINTS.length];
  const brand = BRAND_LOGOS[p.slug];
  const tags = Array.from(
    new Set([p.tag, ...p.industry.split('·').map((s) => s.trim())].filter(Boolean)),
  ).slice(0, 3);
  const mono = (p.title.replace(/[^A-Za-z0-9]/g, '')[0] || '?').toUpperCase();

  return (
    <Link href={`/work/${p.slug}`} className={`pcard ${className}`}>
      <div className="pshot" style={{ background: frame }}>
        <div className="pshot-frame">
          {p.prototypeHtml
            ? <PrototypeFrame html={p.prototypeHtml} title={`${p.title} preview`} />
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
