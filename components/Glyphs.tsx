import React from 'react';

export const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2"><path d="M5 12l4 4 10-10" /></svg>
);
export const Cross = () => (
  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const Stars = () => (
  <div className="stars">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} viewBox="0 0 24 24"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" /></svg>
    ))}
  </div>
);
