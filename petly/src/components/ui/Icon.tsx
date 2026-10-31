import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';

import type { Palette } from '@/core/theme/tokens';
import { useTheme } from '@/theme/useTheme';

export type IconName = ComponentProps<typeof Ionicons>['name'];

/** Icons resolve colour in JS for the same reason <Txt> does. */
export function Icon({ name, tone = 'text', size = 20 }: { name: IconName; tone?: keyof Palette; size?: number }) {
  const { colors } = useTheme();
  return <Ionicons name={name} size={size} color={colors[tone]} accessibilityElementsHidden importantForAccessibility="no" />;
}
