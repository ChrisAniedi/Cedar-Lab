import '../../global.css';
import '@/lib/i18n';

import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppLockGate } from '@/components/layout/AppLockGate';
import { ToastHost } from '@/components/ui/ToastHost';
import { useSettings } from '@/stores/settings';
import { themeVars } from '@/theme/cssVars';
import { useStackOptions } from '@/theme/useStackOptions';
import { useTheme } from '@/theme/useTheme';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const { t } = useTranslation();
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });
  const onboarded = useSettings((s) => s.onboardingComplete);
  const { scheme } = useTheme();
  const stack = useStackOptions();

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => {});
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const modal = { presentation: 'modal' as const, headerShown: true };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        {/* Theme tokens as CSS variables: one class follows light, dark and system. */}
        <View style={[{ flex: 1 }, themeVars[scheme]]}>
          <BottomSheetModalProvider>
            <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
            <AppLockGate>
              <Stack screenOptions={{ ...stack, headerShown: false }}>
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" />
                <Stack.Protected guard={!onboarded}>
                  <Stack.Screen name="welcome" />
                  <Stack.Screen name="onboarding" />
                </Stack.Protected>
                <Stack.Protected guard={onboarded}>
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="pets/[id]/index" options={{ headerShown: true, title: '' }} />
                  <Stack.Screen name="pets/[id]/edit" options={{ ...modal, title: t('pets.editProfile') }} />
                  <Stack.Screen name="pets/new" options={{ ...modal, title: t('pets.add') }} />
                  <Stack.Screen name="care/task" options={{ ...modal, title: t('care.new') }} />
                  <Stack.Screen name="care/log" options={{ ...modal, title: t('care.log.title') }} />
                  <Stack.Screen name="medications/index" options={{ headerShown: true, title: t('medications.title') }} />
                  <Stack.Screen name="medications/[id]" options={{ headerShown: true, title: '' }} />
                  <Stack.Screen name="medications/new" options={{ ...modal, title: t('medications.add') }} />
                  <Stack.Screen name="vaccinations/index" options={{ headerShown: true, title: t('vaccinations.title') }} />
                  <Stack.Screen name="vaccinations/[id]" options={{ headerShown: true, title: '' }} />
                  <Stack.Screen name="vaccinations/new" options={{ ...modal, title: t('vaccinations.add') }} />
                  <Stack.Screen name="visits/index" options={{ headerShown: true, title: t('visits.title') }} />
                  <Stack.Screen name="visits/[id]" options={{ headerShown: true, title: '' }} />
                  <Stack.Screen name="visits/new" options={{ ...modal, title: t('visits.add') }} />
                  <Stack.Screen name="wellness/index" options={{ headerShown: true, title: t('wellness.title') }} />
                  <Stack.Screen name="wellness/log" options={{ ...modal, title: t('wellness.recordWeight') }} />
                  <Stack.Screen name="documents/index" options={{ headerShown: true, title: t('documents.title') }} />
                  <Stack.Screen name="documents/new" options={{ ...modal, title: t('documents.upload') }} />
                  <Stack.Screen name="reminders/index" options={{ headerShown: true, title: t('reminders.title') }} />
                  <Stack.Screen name="reminders/new" options={{ ...modal, title: t('reminders.add') }} />
                  <Stack.Screen name="care-team/index" options={{ headerShown: true, title: t('team.title') }} />
                  <Stack.Screen name="care-team/new" options={{ ...modal, title: t('team.add') }} />
                  <Stack.Screen name="handover" options={{ headerShown: true, title: t('handover.title') }} />
                  <Stack.Screen name="emergency" options={{ headerShown: true, title: t('emergency.title') }} />
                  <Stack.Screen name="reports" options={{ headerShown: true, title: t('report.screenTitle') }} />
                  <Stack.Screen name="settings" options={{ headerShown: true, title: t('settings.title') }} />
                </Stack.Protected>
              </Stack>
            </AppLockGate>
            <ToastHost />
          </BottomSheetModalProvider>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
