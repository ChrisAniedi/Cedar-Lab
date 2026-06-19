import { Arrow } from './Glyphs';

export interface ProjectCardData {
  tag: string; industry: string; title: string; big: string; rl: string;
  timeline: string; tech: string[]; mock: string;
}

export default function ProjectCard({
  p, clickable = false, className = 'reveal', onOpen,
}: {
  p: ProjectCardData; clickable?: boolean; className?: string; onOpen?: () => void;
}) {
  return (
    <article
      className={`pcard ${clickable ? 'clickable ' : ''}${className}`}
      {...(clickable
        ? {
            tabIndex: 0, role: 'button', 'aria-haspopup': 'dialog',
            onClick: onOpen,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen?.(); }
            },
          }
        : {})}
    >
      <div className="pshot"><span className="tag">{p.tag}</span>
        <div dangerouslySetInnerHTML={{ __html: p.mock }} />
      </div>
      <div className="pbody">
        <div className="ind">{p.industry}</div>
        <h3>{p.title}</h3>
        <div className="result"><span className="big">{p.big}</span><span className="rl">{p.rl}</span></div>
        <div className="pmeta"><span className="time">⏱ {p.timeline}</span>
          <div className="tech">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
        </div>
        {clickable && <div className="pread">Read case study <Arrow /></div>}
      </div>
    </article>
  );
}
