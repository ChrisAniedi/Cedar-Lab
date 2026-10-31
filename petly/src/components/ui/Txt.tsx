import { Text, type TextProps, type TextStyle } from 'react-native';

import type { TextToken } from '@/core/theme/tokens';
import { fontFamily, type FontWeight } from '@/theme/fonts';
import { useTheme } from '@/theme/useTheme';

export type TxtVariant = 'display' | 'title' | 'heading' | 'subheading' | 'body' | 'callout' | 'caption' | 'label' | 'overline';

const VARIANTS: Record<TxtVariant, { size: number; line: number; weight: FontWeight; tracking?: number; upper?: boolean }> = {
  display: { size: 30, line: 36, weight: 'bold', tracking: -0.5 },
  title: { size: 24, line: 30, weight: 'bold', tracking: -0.3 },
  heading: { size: 18, line: 24, weight: 'semibold' },
  subheading: { size: 16, line: 22, weight: 'semibold' },
  body: { size: 15, line: 22, weight: 'regular' },
  callout: { size: 14, line: 20, weight: 'medium' },
  caption: { size: 13, line: 18, weight: 'regular' },
  label: { size: 12, line: 16, weight: 'semibold' },
  overline: { size: 11, line: 14, weight: 'semibold', tracking: 0.8, upper: true },
};

export interface TxtProps extends TextProps {
  variant?: TxtVariant;
  /** Colour token. Resolved in JS from the theme — never from a Tailwind class. */
  tone?: TextToken;
  weight?: FontWeight;
  align?: TextStyle['textAlign'];
}

/**
 * The only component that renders text.
 *
 * Colour is resolved here in JS from the theme, not left to a `text-*` class:
 * class colours compile to CSS variables, which do not reach native Modals,
 * portals or subtrees outside the variable root — there text silently falls
 * back to black (invisible in dark mode, and only on device).
 */
export function Txt({ variant = 'body', tone = 'text', weight, align, style, ...rest }: TxtProps) {
  const { colors } = useTheme();
  const v = VARIANTS[variant];
  return (
    <Text
      maxFontSizeMultiplier={1.6}
      {...rest}
      style={[
        {
          color: colors[tone],
          fontSize: v.size,
          lineHeight: v.line,
          fontFamily: fontFamily[weight ?? v.weight],
          letterSpacing: v.tracking,
          textTransform: v.upper ? 'uppercase' : undefined,
          textAlign: align,
        },
        style,
      ]}
    />
  );
}
