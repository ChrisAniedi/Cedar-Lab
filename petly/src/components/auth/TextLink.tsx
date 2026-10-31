import { Pressable } from 'react-native';

import { Txt } from '../ui/Txt';

export function TextLink({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="link" className="min-h-[44px] items-center justify-center">
      <Txt variant="callout" tone="textPrimary">
        {label}
      </Txt>
    </Pressable>
  );
}
