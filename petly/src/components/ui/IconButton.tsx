import { Pressable, View } from 'react-native';

import type { Palette } from '@/core/theme/tokens';

import { Icon, type IconName } from './Icon';

interface IconButtonProps {
  icon: IconName;
  label: string;
  onPress: () => void;
  tone?: keyof Palette;
  badge?: boolean;
  variant?: 'plain' | 'filled';
}

/** 44pt minimum target. `label` is required — icon-only controls must be named. */
export function IconButton({ icon, label, onPress, tone = 'text', badge, variant = 'plain' }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      className={`h-11 w-11 items-center justify-center rounded-full ${variant === 'filled' ? 'border border-border bg-surface' : ''} active:opacity-70`}
    >
      <Icon name={icon} tone={tone} size={22} />
      {badge ? <View className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-surface bg-danger" /> : null}
    </Pressable>
  );
}
