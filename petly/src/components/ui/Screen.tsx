import type { ReactNode } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { useResponsive } from '@/hooks/useResponsive';

interface ScreenProps {
  children: ReactNode;
  scroll?: boolean;
  /** Pinned below the scroll area (e.g. a form's Save button). */
  footer?: ReactNode;
  edges?: Edge[];
  /** Narrow column for forms, wide for dashboards. */
  width?: 'form' | 'content';
}

/** Standard screen: safe area, warm background, centred max-width column. */
export function Screen({ children, scroll = true, footer, edges = ['top'], width = 'content' }: ScreenProps) {
  const { isWide } = useResponsive();
  const column = `w-full self-center ${width === 'form' ? 'max-w-[640px]' : 'max-w-content'} ${isWide ? 'px-8' : 'px-4'}`;
  return (
    <SafeAreaView edges={edges} className="flex-1 bg-background">
      {scroll ? (
        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-10 pt-2"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
        >
          <View className={`${column} gap-5`}>{children}</View>
        </ScrollView>
      ) : (
        <View className={`${column} flex-1`}>{children}</View>
      )}
      {footer ? (
        <View className="border-t border-border bg-surface">
          <View className={`${column} py-3`}>{footer}</View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}
