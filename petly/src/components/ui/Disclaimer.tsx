import { View } from 'react-native';

import { Icon } from './Icon';
import { Txt } from './Txt';

/** Calm, non-alarming note — used wherever health data is described. */
export function Disclaimer({ text }: { text: string }) {
  return (
    <View className="flex-row gap-2 rounded-field bg-surface-muted p-3">
      <Icon name="information-circle-outline" tone="textSecondary" size={18} />
      <Txt variant="caption" tone="textSecondary" style={{ flex: 1 }}>
        {text}
      </Txt>
    </View>
  );
}
