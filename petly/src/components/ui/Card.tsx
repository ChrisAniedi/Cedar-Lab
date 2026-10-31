import type { ReactNode } from 'react';
import { Pressable, View, type ViewStyle } from 'react-native';

import { useTheme } from '@/theme/useTheme';

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  className?: string;
  padded?: boolean;
  style?: ViewStyle;
}

const SHADOW: ViewStyle = {
  shadowOpacity: 0.06,
  shadowRadius: 12,
  shadowOffset: { width: 0, height: 4 },
  elevation: 1,
};

export function Card({ children, onPress, accessibilityLabel, className = '', padded = true, style }: CardProps) {
  const { colors } = useTheme();
  const shadow = [SHADOW, { shadowColor: colors.text }, style];
  const base = `rounded-card border border-border bg-surface ${padded ? 'p-4' : ''} ${className}`;
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        className={`${base} active:opacity-80`}
        style={shadow}
      >
        {children}
      </Pressable>
    );
  }
  return (
    <View className={base} style={shadow}>
      {children}
    </View>
  );
}
