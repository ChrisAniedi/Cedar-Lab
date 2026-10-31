import { Pressable } from 'react-native';

import { Icon, type IconName } from './Icon';
import { Txt } from './Txt';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  icon?: IconName;
  /** Checkbox semantics for multi-select groups, radio for single. */
  role?: 'radio' | 'checkbox' | 'button';
}

export function Chip({ label, selected = false, onPress, icon, role = 'radio' }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={role}
      accessibilityState={role === 'button' ? undefined : { checked: selected, selected }}
      accessibilityLabel={label}
      className={`min-h-[40px] flex-row items-center gap-1.5 rounded-full border px-3.5 ${
        selected ? 'border-primary bg-primary-soft' : 'border-border bg-surface-muted'
      } active:opacity-80`}
    >
      {icon ? <Icon name={icon} size={16} tone={selected ? 'textPrimary' : 'textSecondary'} /> : null}
      <Txt variant="callout" tone={selected ? 'textPrimary' : 'text'}>
        {label}
      </Txt>
    </Pressable>
  );
}
