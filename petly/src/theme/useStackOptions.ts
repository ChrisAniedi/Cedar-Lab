import type { NativeStackNavigationOptions } from 'expo-router/native-stack';

import { fontFamily } from './fonts';
import { useTheme } from './useTheme';

/** Native header styling — colours passed in JS (headers are outside the CSS-variable tree on native). */
export function useStackOptions(): NativeStackNavigationOptions {
  const { colors } = useTheme();
  return {
    headerStyle: { backgroundColor: colors.background },
    headerTintColor: colors.textPrimary,
    headerTitleStyle: { color: colors.text, fontFamily: fontFamily.semibold },
    headerShadowVisible: false,
    headerBackButtonDisplayMode: 'minimal',
    contentStyle: { backgroundColor: colors.background },
  };
}
