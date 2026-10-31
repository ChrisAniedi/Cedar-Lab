import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';

import type { TextToken } from '@/core/theme/tokens';

import { Icon, type IconName } from './Icon';
import { Txt } from './Txt';

interface ListRowProps {
  title: string;
  subtitle?: string;
  icon?: IconName;
  iconTone?: TextToken;
  value?: string;
  right?: ReactNode;
  onPress?: () => void;
  destructive?: boolean;
}

export function ListRow({ title, subtitle, icon, iconTone = 'textPrimary', value, right, onPress, destructive }: ListRowProps) {
  const content = (
    <>
      {icon ? (
        <View className={`h-9 w-9 items-center justify-center rounded-full ${destructive ? 'bg-danger-soft' : 'bg-primary-soft'}`}>
          <Icon name={icon} tone={destructive ? 'dangerInk' : iconTone} size={18} />
        </View>
      ) : null}
      <View className="flex-1">
        <Txt variant="callout" tone={destructive ? 'dangerInk' : 'text'}>
          {title}
        </Txt>
        {subtitle ? (
          <Txt variant="caption" tone="textSecondary">
            {subtitle}
          </Txt>
        ) : null}
      </View>
      {value ? (
        <Txt variant="caption" tone="textSecondary">
          {value}
        </Txt>
      ) : null}
      {right}
      {onPress && !right ? <Icon name="chevron-forward" tone="textSecondary" size={18} /> : null}
    </>
  );
  const cls = 'min-h-[56px] flex-row items-center gap-3 py-2.5';
  if (!onPress) return <View className={cls}>{content}</View>;
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title} className={`${cls} active:opacity-70`}>
      {content}
    </Pressable>
  );
}
