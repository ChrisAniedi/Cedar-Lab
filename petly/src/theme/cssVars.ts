import { vars } from 'nativewind';

import { hexToTriplet } from '@/core/theme/contrast';
import { cssVarName, palettes, type Palette, type SchemeName } from '@/core/theme/tokens';

const build = (p: Palette) =>
  vars(Object.fromEntries(Object.entries(p).map(([k, hex]) => [cssVarName(k as keyof Palette), hexToTriplet(hex)])));

/** NativeWind CSS variables per scheme, applied at the app root. */
export const themeVars: Record<SchemeName, ReturnType<typeof vars>> = {
  light: build(palettes.light),
  dark: build(palettes.dark),
};
