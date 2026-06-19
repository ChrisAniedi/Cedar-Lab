'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Scroll-reveal, sticky-nav state, and FAQ accordion — re-initialised per route.
export default function ClientEffects() {
  const path = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        if (e.target.classList.contains('velo')) {
          e.target.querySelectorAll<HTMLElement>('.fill').forEach((f) => {
            f.style.width = (f.dataset.w || '0') + '%';
          });
        }
        io.unobserve(e.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    const onScroll = () => {
      document.getElementById('hdr')?.classList.toggle('scrolled', window.scrollY > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, [path]);

  // FAQ accordion (delegated, only fires when a #faq exists on the page)
  useEffect(() => {
    const faq = document.getElementById('faq');
    if (!faq) return;
    const handler = (e: Event) => {
      const btn = (e.target as HTMLElement).closest('.fq');
      if (!btn) return;
      const item = btn.parentElement as HTMLElement;
      const fa = item.querySelector<HTMLElement>('.fa')!;
      const open = item.classList.contains('open');
      document.querySelectorAll('.fitem.open').forEach((o) => {
        o.classList.remove('open');
        (o.querySelector('.fa') as HTMLElement).style.maxHeight = '';
      });
      if (!open) { item.classList.add('open'); fa.style.maxHeight = fa.scrollHeight + 'px'; }
    };
    faq.addEventListener('click', handler);
    return () => faq.removeEventListener('click', handler);
  }, [path]);

  return null;
}
