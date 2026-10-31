import { View } from 'react-native';

import { initials } from '@/core/format';

import { Txt } from './Txt';

/** Initials avatar for people (caregivers). Uses the measured primary-soft pair. */
export function Avatar({ name, size = 32 }: { name: string; size?: number }) {
  return (
    <View
      style={{ width: size, height: size, borderRadius: size / 2 }}
      className="items-center justify-center border border-surface bg-primary-soft"
      accessibilityLabel={name}
    >
      <Txt variant={size >= 40 ? 'subheading' : 'label'} tone="textPrimary">
        {initials(name)}
      </Txt>
    </View>
  );
}
