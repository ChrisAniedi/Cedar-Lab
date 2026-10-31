import type { Species } from '@/core/types';

/** MaterialCommunityIcons glyph per species. */
export const SPECIES_GLYPH = {
  dog: 'dog',
  cat: 'cat',
  bird: 'bird',
  rabbit: 'rabbit',
  fish: 'fish',
  reptile: 'turtle',
  other: 'paw',
} as const satisfies Record<Species, string>;
