import type { ReactNode } from 'react';
import { View } from 'react-native';

import { Txt } from './Txt';

/** Label above a non-text control (chips, toggles, pickers). */
export function FieldLabel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <View className="gap-2" accessible={false}>
      <Txt variant="label">{label}</Txt>
      {children}
    </View>
  );
}
