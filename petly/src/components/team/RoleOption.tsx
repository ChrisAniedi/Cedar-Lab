import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import type { Role } from '@/core/types';

import { Icon } from '../ui/Icon';
import { Txt } from '../ui/Txt';

export function RoleOption({ role, selected, onPress }: { role: Role; selected: boolean; onPress: () => void }) {
  const { t } = useTranslation();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      className={`min-h-[56px] flex-row items-center gap-3 rounded-field border px-3 py-3 ${selected ? 'border-primary bg-primary-soft' : 'border-border bg-surface'}`}
    >
      <Icon name={selected ? 'radio-button-on' : 'radio-button-off'} tone={selected ? 'textPrimary' : 'textSecondary'} />
      <View className="flex-1">
        <Txt variant="callout" weight="semibold" tone={selected ? 'textPrimary' : 'text'}>
          {t(`team.roles.${role}`)}
        </Txt>
        <Txt variant="caption" tone={selected ? 'textPrimary' : 'textSecondary'}>
          {t(`team.roleDescriptions.${role}`)}
        </Txt>
      </View>
    </Pressable>
  );
}
