'use client';

import { useEffect, useState } from 'react';
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
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };

  const next = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setAutoplay(false);
  };

  return (
    <div className="carousel-container reveal">
      <div className="carousel-wrapper">
        <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {testimonials.map((t) => (
            <div key={t.name} className="carousel-slide">
              <div className="tcard">
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
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-btn prev"
          onClick={prev}
          aria-label="Previous testimonial"
          onMouseEnter={() => setAutoplay(false)}
        >
          ←
        </button>
        <div className="carousel-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => goToSlide(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="carousel-btn next"
          onClick={next}
          aria-label="Next testimonial"
          onMouseEnter={() => setAutoplay(false)}
        >
          →
        </button>
      </div>
    </div>
  );
}
