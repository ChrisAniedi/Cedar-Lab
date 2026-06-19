import React from 'react';

// Inline SVG path set, rendered by <Icon name="..." />.
export const ICON_PATHS: Record<string, string> = {
  mvp: '<path d="M13 2 4 13h6l-1 9 9-13h-6l1-7Z"/>',
  saas: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M7 21h10"/>',
  agent: '<rect x="4" y="6" width="16" height="12" rx="3"/><path d="M9 11h.01M15 11h.01M12 2v4M8 18l-1 4M16 18l1 4"/>',
  ai: '<circle cx="12" cy="12" r="3"/><path d="M12 3v3m0 12v3M3 12h3m12 0h3M6 6l2 2m8 8 2 2m0-12-2 2M8 16l-2 2"/>',
  auto: '<path d="M12 2v4m0 12v4m10-10h-4M6 12H2M19 5l-3 3M8 16l-3 3M19 19l-3-3M8 8 5 5"/>',
  tools: '<path d="M14 3l7 7-4 4-7-7zM3 21l5-1 9-9-4-4-9 9z"/>',
  crm: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 11a3 3 0 1 0 0-6M21 20a5 5 0 0 0-5-5"/>',
  portal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/>',
  market: '<path d="M3 9l2-5h14l2 5M4 9v11h16V9M9 20v-6h6v6"/>',
  web: '<rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 8h18M6 6h.01M9 6h.01"/>',
  mobile: '<rect x="7" y="2" width="10" height="20" rx="3"/><path d="M11 18h2"/>',
  landing: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h4"/>',
  corp: '<path d="M3 21V7l9-4 9 4v14M9 21v-5h6v5"/>',
  home: '<path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  heart: '<path d="M12 21s-7-4.5-9-9a4.5 4.5 0 0 1 8-3 4.5 4.5 0 0 1 8 3c-2 4.5-7 9-7 9z"/>',
  truck: '<rect x="1" y="6" width="13" height="10" rx="1"/><path d="M14 9h4l3 3v4h-7zM5.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>',
  brief: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  wrench: '<path d="M14 3l7 7-4 4-7-7zM3 21l5-1 9-9-4-4-9 9z"/>',
  shop: '<path d="M3 9l2-5h14l2 5M4 9v11h16V9"/>',
  layers: '<path d="M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/>',
  bolt: '<path d="M13 2 4 13h6l-1 9 9-13h-6l1-7Z"/>',
  shield: '<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18z"/>',
  spark: '<path d="M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>',
};

export function Icon({ name, sw = '1.6' }: { name: string; sw?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth={sw}
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] || '' }} />
  );
}
