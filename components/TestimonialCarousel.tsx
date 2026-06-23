'use client';

import { Stars } from './Glyphs';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
  color: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  // Duplicate the list so the marquee can loop seamlessly (track scrolls -50%).
  const loop = [...testimonials, ...testimonials];

  return (
    <div className="tmarquee reveal" aria-label="Client testimonials">
      <div className="tmarquee-track">
        {loop.map((t, i) => (
          <div key={`${t.name}-${i}`} className="tcard" aria-hidden={i >= testimonials.length}>
            <Stars />
            <p className="q">&ldquo;{t.quote}&rdquo;</p>
            <div className="who">
              <span className="av" style={{ background: t.color }}>
                {t.initials}
              </span>
              <div>
                <div className="nm">{t.name}</div>
                <div className="rl">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
