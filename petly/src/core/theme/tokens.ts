/**
 * Theme tokens — the single source of truth for colour.
 *
 * Surfaces (backgrounds, borders) reach components as CSS variables via
 * NativeWind (`bg-surface`, `border-border`…). Text colours are resolved in
 * JS by <Txt> from these same tokens. Every text-on-surface pair the UI uses
 * is listed in `textPairs.ts` and measured against WCAG AA in tests.
 */

export type SchemeName = 'light' | 'dark';

export type SurfaceToken =
  | 'background'
  | 'surface'
  | 'surfaceMuted'
  | 'border'
  | 'primary'
  | 'primarySoft'
  | 'secondary'
  | 'accent'
  | 'accentSoft'
  | 'successSoft'
  | 'warningSoft'
  | 'dangerSoft'
  | 'danger'
  | 'success'
  | 'warning';

export type TextToken =
  | 'text'
  | 'textSecondary'
  | 'textPrimary'
  | 'onPrimary'
  | 'onSecondary'
  | 'onAccent'
  | 'accentInk'
  | 'successInk'
  | 'warningInk'
  | 'dangerInk'
  | 'onDanger';

export type Palette = Record<SurfaceToken | TextToken, string>;

export const palettes: Record<SchemeName, Palette> = {
  light: {
    background: '#F8F9F6',
    surface: '#FFFFFF',
    surfaceMuted: '#EEF2EC',
    border: '#DFE4DC',
    primary: '#285C49',
    primarySoft: '#E2EEE5',
    secondary: '#A8C6AE',
    accent: '#F4B99E',
    accentSoft: '#FCEDE5',
    success: '#2F7A4F',
    successSoft: '#E3F1E7',
    warning: '#C98A12',
    warningSoft: '#FCF0D9',
    danger: '#B03F35',
    dangerSoft: '#F8E3E0',

    text: '#252B28',
    // The PRD's #7A827D measures ~3.9:1 on white — below AA. Darkened to pass.
    textSecondary: '#5B635E',
    textPrimary: '#285C49',
    onPrimary: '#FFFFFF',
    onSecondary: '#1C2B22',
    onAccent: '#3B2116',
    accentInk: '#8A3F1E',
    successInk: '#1E6A3F',
    warningInk: '#7D5100',
    dangerInk: '#9C3229',
    onDanger: '#FFFFFF',
  },
  dark: {
    background: '#111513',
    surface: '#1A1F1D',
    surfaceMuted: '#232A27',
    border: '#313935',
    primary: '#7CC3A1',
    primarySoft: '#1E3A2F',
    secondary: '#A8C6AE',
    accent: '#F4B99E',
    accentSoft: '#3A261C',
    success: '#7DCB9B',
    successSoft: '#1B3325',
    warning: '#E9B651',
    warningSoft: '#3A2D12',
    danger: '#E57D72',
    dangerSoft: '#3D1F1C',

    text: '#EDF1EE',
    textSecondary: '#A7B1AB',
    textPrimary: '#8FD1B1',
    onPrimary: '#0E271D',
    onSecondary: '#1C2B22',
    onAccent: '#3B2116',
    accentInk: '#F6C3AA',
    successInk: '#93D8AD',
    warningInk: '#F2C66D',
    dangerInk: '#F4A49A',
    onDanger: '#2A0E0B',
  },
};

/** Map palette tokens → CSS variable names used by tailwind.config.js. */
export const cssVarName = (token: SurfaceToken | TextToken): string =>
  `--c-${token.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}`;
