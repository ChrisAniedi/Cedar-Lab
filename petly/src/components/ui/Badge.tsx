import { View } from 'react-native';

import type { SurfaceToken, TextToken } from '@/core/theme/tokens';

import { Icon, type IconName } from './Icon';
import { Txt } from './Txt';

export type BadgeTone = 'success' | 'warning' | 'danger' | 'neutral' | 'accent' | 'primary';

/** Each pairing below is measured in core/theme/textPairs.ts. */
const TONES: Record<BadgeTone, { bg: string; fg: TextToken; surface: SurfaceToken }> = {
  success: { bg: 'bg-success-soft', fg: 'successInk', surface: 'successSoft' },
  warning: { bg: 'bg-warning-soft', fg: 'warningInk', surface: 'warningSoft' },
  danger: { bg: 'bg-danger-soft', fg: 'dangerInk', surface: 'dangerSoft' },
  neutral: { bg: 'bg-surface-muted', fg: 'textSecondary', surface: 'surfaceMuted' },
  accent: { bg: 'bg-accent-soft', fg: 'accentInk', surface: 'accentSoft' },
  primary: { bg: 'bg-primary-soft', fg: 'textPrimary', surface: 'primarySoft' },
};

export function Badge({ label, tone = 'neutral', icon }: { label: string; tone?: BadgeTone; icon?: IconName }) {
  const s = TONES[tone];
  return (
    <View className={`flex-row items-center gap-1 self-start rounded-full px-2.5 py-1 ${s.bg}`}>
      {icon ? <Icon name={icon} size={12} tone={s.fg} /> : null}
      <Txt variant="label" tone={s.fg}>
        {label}
      </Txt>
    </View>
  );
}
