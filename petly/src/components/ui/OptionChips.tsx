import { ScrollView, View } from 'react-native';

import { Chip } from './Chip';
import type { IconName } from './Icon';

interface Option<T extends string> {
  value: T;
  label: string;
  icon?: IconName;
}

interface Single<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  multiple?: false;
  scroll?: boolean;
}
interface Multiple<T extends string> {
  options: Option<T>[];
  value: T[];
  onChange: (v: T[]) => void;
  multiple: true;
  scroll?: boolean;
}

/** Single- or multi-select chip group. */
export function OptionChips<T extends string>(props: Single<T> | Multiple<T>) {
  const chips = props.options.map((o) => {
    const selected = props.multiple ? props.value.includes(o.value) : props.value === o.value;
    const onPress = () => {
      if (props.multiple) {
        props.onChange(selected ? props.value.filter((v) => v !== o.value) : [...props.value, o.value]);
      } else {
        props.onChange(o.value);
      }
    };
    return <Chip key={o.value} label={o.label} icon={o.icon} selected={selected} onPress={onPress} role={props.multiple ? 'checkbox' : 'radio'} />;
  });
  if (props.scroll) {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2" accessibilityRole={props.multiple ? undefined : 'radiogroup'}>
        {chips}
      </ScrollView>
    );
  }
  return (
    <View className="flex-row flex-wrap gap-2" accessibilityRole={props.multiple ? undefined : 'radiogroup'}>
      {chips}
    </View>
  );
}
