import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';
import type { ColorValue } from 'react-native';

import { useResponsive } from '@/hooks/useResponsive';
import { fontFamily } from '@/theme/fonts';
import { useTheme } from '@/theme/useTheme';

type Glyph = ComponentProps<typeof Ionicons>['name'];
const icon = (name: Glyph, active: Glyph) =>
  function TabIcon({ color, focused, size }: { color: ColorValue; focused: boolean; size: number }) {
    return <Ionicons name={focused ? active : name} color={color as string} size={size} />;
  };

/** Bottom tabs on phones; a left sidebar on wide screens (tablet / desktop web). */
export default function TabsLayout() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { isWide } = useResponsive();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarPosition: isWide ? 'left' : 'bottom',
        tabBarVariant: isWide ? 'material' : 'uikit',
        tabBarLabelPosition: isWide ? 'beside-icon' : 'below-icon',
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarActiveBackgroundColor: isWide ? colors.primarySoft : undefined,
        tabBarStyle: { backgroundColor: colors.surface, borderColor: colors.border, ...(isWide ? { width: 232, paddingTop: 24 } : {}) },
        tabBarLabelStyle: { fontFamily: fontFamily.medium, fontSize: isWide ? 15 : 11 },
        tabBarItemStyle: isWide ? { borderRadius: 12, marginHorizontal: 12, marginVertical: 2, justifyContent: 'flex-start' } : undefined,
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen name="index" options={{ title: t('nav.home'), tabBarIcon: icon('home-outline', 'home') }} />
      <Tabs.Screen name="pets" options={{ title: t('nav.pets'), tabBarIcon: icon('paw-outline', 'paw') }} />
      <Tabs.Screen name="care" options={{ title: t('nav.care'), tabBarIcon: icon('checkbox-outline', 'checkbox') }} />
      <Tabs.Screen name="health" options={{ title: t('nav.health'), tabBarIcon: icon('heart-outline', 'heart') }} />
      <Tabs.Screen name="more" options={{ title: t('nav.more'), tabBarIcon: icon('grid-outline', 'grid') }} />
    </Tabs>
  );
}
