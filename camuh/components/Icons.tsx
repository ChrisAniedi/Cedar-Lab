import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;
const base = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const ArrowRight = (p: P) => (<svg {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>);
export const ArrowLeft = (p: P) => (<svg {...base} {...p}><path d="M19 12H5M11 6l-6 6 6 6" /></svg>);
export const ChevronLeft = (p: P) => (<svg {...base} {...p}><path d="M15 6l-6 6 6 6" /></svg>);
export const ChevronRight = (p: P) => (<svg {...base} {...p}><path d="M9 6l6 6-6 6" /></svg>);
export const ChevronDown = (p: P) => (<svg {...base} {...p}><path d="M6 9l6 6 6-6" /></svg>);
export const Exchange = (p: P) => (<svg {...base} {...p}><path d="M4 8h14l-4-4M20 16H6l4 4" /></svg>);
export const Check = (p: P) => (<svg {...base} {...p}><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>);
export const Plus = (p: P) => (<svg {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>);
export const Close = (p: P) => (<svg {...base} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>);
export const Search = (p: P) => (<svg {...base} {...p}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4.2-4.2" /></svg>);
export const Lock = (p: P) => (<svg {...base} {...p}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></svg>);
export const Phone = (p: P) => (<svg {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>);
export const Mail = (p: P) => (<svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>);
export const Pin = (p: P) => (<svg {...base} {...p}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const Bullet = (p: P) => (<svg width="18" height="18" viewBox="0 0 18 18" {...p}><circle cx="9" cy="9" r="8" fill="currentColor" opacity=".12" /><circle cx="9" cy="9" r="3.5" fill="currentColor" /></svg>);

export const Facebook = (p: P) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M14 8.5V6.8c0-.8.5-1 1-1h2.3V2.1L14.2 2C10.8 2 10 4.5 10 6.2v2.3H7.5v3.8H10V22h4v-9.7h3l.4-3.8H14z" /></svg>);
export const LinkedIn = (p: P) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M4.98 3.5A2.5 2.5 0 112.5 6a2.5 2.5 0 012.48-2.5zM3 8.98h4V21H3zM9.5 8.98h3.8v1.7h.06a4.17 4.17 0 013.75-2.06c4 0 4.74 2.64 4.74 6.07V21h-4v-5.6c0-1.34 0-3.06-1.86-3.06s-2.15 1.46-2.15 2.96V21h-4z" /></svg>);
export const WhatsApp = (p: P) => (<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12.04 2a9.9 9.9 0 00-8.5 14.98L2 22l5.17-1.5A9.9 9.9 0 1012.04 2zm0 18.1a8.2 8.2 0 01-4.2-1.15l-.3-.18-3.07.9.92-3-.2-.31a8.2 8.2 0 1116.04-2.46 8.2 8.2 0 01-9.19 6.2zm4.5-6.1c-.25-.12-1.46-.72-1.69-.8s-.39-.12-.55.12-.63.8-.78.96-.29.19-.53.06a6.7 6.7 0 01-3.33-2.9c-.25-.43.25-.4.72-1.34a.45.45 0 000-.43c-.06-.12-.55-1.33-.76-1.82s-.4-.41-.55-.42h-.47a.9.9 0 00-.65.3 2.73 2.73 0 00-.85 2.03 4.74 4.74 0 001 2.52 10.86 10.86 0 004.15 3.67c1.55.67 2.15.73 2.93.61a2.5 2.5 0 001.64-1.16 2.03 2.03 0 00.14-1.16c-.06-.1-.22-.16-.46-.28z" /></svg>);
