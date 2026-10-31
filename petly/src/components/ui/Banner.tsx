import { Pressable, View } from 'react-native';

import { Icon, type IconName } from './Icon';
import { Txt } from './Txt';

/** Inline banner, e.g. "You're exploring sample data". Accent pair is measured. */
export function Banner({ icon, text, action, onAction }: { icon: IconName; text: string; action?: string; onAction?: () => void }) {
  return (
    <View className="flex-row items-center gap-3 rounded-field bg-accent-soft px-3 py-2.5">
      <Icon name={icon} tone="accentInk" size={18} />
      <Txt variant="caption" tone="accentInk" style={{ flex: 1 }}>
        {text}
      </Txt>
      {action && onAction ? (
        <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8} className="min-h-[36px] justify-center">
          <Txt variant="label" tone="accentInk">
            {action}
          </Txt>
        </Pressable>
      ) : null}
    </View>
  );
}
