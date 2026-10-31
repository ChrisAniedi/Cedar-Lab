import { Pressable, View } from 'react-native';

import { Txt } from './Txt';

export function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <View className="flex-row items-center justify-between">
      <Txt variant="heading" accessibilityRole="header">
        {title}
      </Txt>
      {action && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="link" hitSlop={10} className="min-h-[44px] justify-center">
          <Txt variant="callout" tone="textPrimary">
            {action}
          </Txt>
        </Pressable>
      ) : null}
    </View>
  );
}
