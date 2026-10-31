import { Switch, View } from 'react-native';

import { useTheme } from '@/theme/useTheme';

import { Txt } from './Txt';

interface SwitchRowProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
  disabled?: boolean;
}

export function SwitchRow({ label, description, value, onValueChange, disabled }: SwitchRowProps) {
  const { colors } = useTheme();
  return (
    <View className="min-h-[56px] flex-row items-center gap-3 py-2">
      <View className="flex-1">
        <Txt variant="callout">{label}</Txt>
        {description ? (
          <Txt variant="caption" tone="textSecondary">
            {description}
          </Txt>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        accessibilityLabel={label}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor={colors.surface}
        ios_backgroundColor={colors.border}
      />
    </View>
  );
}
