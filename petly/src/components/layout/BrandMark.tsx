import { View } from 'react-native';

import { Icon } from '../ui/Icon';

/** Petly logo mark: paw on the brand green (icon only — no text on it). */
export function BrandMark({ size = 44 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size * 0.3 }} className="items-center justify-center bg-primary">
      <Icon name="paw" tone="onPrimary" size={size * 0.55} />
    </View>
  );
}
