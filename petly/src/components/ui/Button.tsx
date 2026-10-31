import { ActivityIndicator, Pressable, View } from 'react-native';

import type { TextToken } from '@/core/theme/tokens';
import { useTheme } from '@/theme/useTheme';

import { Icon, type IconName } from './Icon';
import { Txt } from './Txt';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const STYLES: Record<Variant, { box: string; tone: TextToken }> = {
  primary: { box: 'bg-primary', tone: 'onPrimary' },
  secondary: { box: 'bg-surface border border-border', tone: 'textPrimary' },
  ghost: { box: '', tone: 'textPrimary' },
  danger: { box: 'bg-danger', tone: 'onDanger' },
};

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: Variant;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  size?: 'md' | 'sm';
  full?: boolean;
  accessibilityHint?: string;
}

export function Button({ label, onPress, variant = 'primary', icon, loading, disabled, size = 'md', full, accessibilityHint }: ButtonProps) {
  const { colors } = useTheme();
  const s = STYLES[variant];
  const inactive = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: !!inactive, busy: !!loading }}
      className={`flex-row items-center justify-center gap-2 rounded-field ${s.box} ${size === 'sm' ? 'min-h-[36px] px-3' : 'min-h-[48px] px-5'} ${full ? 'w-full' : ''} ${inactive ? 'opacity-50' : 'active:opacity-80'}`}
    >
      {loading ? (
        <ActivityIndicator color={colors[s.tone]} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon ? <Icon name={icon} tone={s.tone} size={size === 'sm' ? 16 : 18} /> : null}
          <Txt variant={size === 'sm' ? 'label' : 'callout'} weight="semibold" tone={s.tone}>
            {label}
          </Txt>
        </View>
      )}
    </Pressable>
  );
}
