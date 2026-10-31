import { Pressable, View } from 'react-native';

import { Txt } from './Txt';

interface Props<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}

export function SegmentedControl<T extends string>({ options, value, onChange }: Props<T>) {
  return (
    <View className="flex-row rounded-field bg-surface-muted p-1" accessibilityRole="tablist">
      {options.map((o) => {
        const selected = o.value === value;
        return (
          <Pressable
            key={o.value}
            onPress={() => onChange(o.value)}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            className={`min-h-[40px] flex-1 items-center justify-center rounded-lg px-2 ${selected ? 'bg-surface' : ''}`}
          >
            <Txt variant="callout" tone={selected ? 'textPrimary' : 'textSecondary'} weight={selected ? 'semibold' : 'medium'} numberOfLines={1}>
              {o.label}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}
