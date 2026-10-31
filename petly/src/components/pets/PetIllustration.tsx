import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

import type { Palette } from '@/core/theme/tokens';
import type { Species } from '@/core/types';
import { useTheme } from '@/theme/useTheme';

import { SPECIES_GLYPH } from './speciesIcon';

const TINTS: [keyof Palette, keyof Palette, keyof Palette][] = [
  ['primarySoft', 'secondary', 'textPrimary'],
  ['accentSoft', 'accent', 'accentInk'],
  ['successSoft', 'secondary', 'successInk'],
  ['warningSoft', 'accent', 'warningInk'],
];

const hash = (s: string) => [...s].reduce((a, c) => (a * 31 + c.charCodeAt(0)) >>> 0, 7);

/** Decorative portrait used when a pet has no photo yet. No text on it. */
export function PetIllustration({ id, species, size, radius }: { id: string; species: Species; size: number; radius: number }) {
  const { colors } = useTheme();
  const [a, b, ink] = TINTS[hash(id) % TINTS.length]!;
  return (
    <LinearGradient
      colors={[colors[a], colors[b]]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size, borderRadius: radius, alignItems: 'center', justifyContent: 'center' }}
    >
      <MaterialCommunityIcons name={SPECIES_GLYPH[species]} size={size * 0.5} color={colors[ink]} />
    </LinearGradient>
  );
}
