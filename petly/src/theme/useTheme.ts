import { useColorScheme } from 'react-native';

import { palettes, type Palette, type SchemeName } from '@/core/theme/tokens';
import { useSettings } from '@/stores/settings';

export type Theme = { scheme: SchemeName; colors: Palette };

/**
 * Resolves the active palette from the persisted preference + OS scheme.
 * Reads global stores only — no React context — so it works anywhere:
 * native Modals, portals, bottom sheets, subtrees outside any provider.
 */
export function useTheme(): Theme {
  const pref = useSettings((s) => s.theme);
  const os = useColorScheme();
  const scheme: SchemeName = pref === 'system' ? (os === 'dark' ? 'dark' : 'light') : pref;
  return { scheme, colors: palettes[scheme] };
}
