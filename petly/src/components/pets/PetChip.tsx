import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import type { PetHealthStatus } from '@/core/health';
import type { Pet } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';

import { Txt } from '../ui/Txt';
import { PetAvatar } from './PetAvatar';

const DOT = { good: 'bg-success', upcoming: 'bg-warning', attention: 'bg-danger' } as const;

/** Horizontal selector card on the dashboard. */
export function PetChip({ pet, selected, status, onPress }: { pet: Pet; selected: boolean; status: PetHealthStatus; onPress: () => void }) {
  const { t } = useTranslation();
  const f = useFormat();
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, selected }}
      accessibilityLabel={`${pet.name}, ${f.age(pet)}, ${t(`species.${pet.species}`)}, ${t(`healthStatus.${status}`)}`}
      className={`w-[168px] gap-2 rounded-card border p-3 ${selected ? 'border-primary bg-primary-soft' : 'border-border bg-surface'} active:opacity-80`}
    >
      <View className="flex-row items-center gap-2.5">
        <PetAvatar pet={pet} size={44} />
        <View className="flex-1">
          <Txt variant="subheading" numberOfLines={1} tone={selected ? 'textPrimary' : 'text'}>
            {pet.name}
          </Txt>
          <Txt variant="caption" tone={selected ? 'textPrimary' : 'textSecondary'} numberOfLines={1}>
            {f.age(pet)} · {t(`species.${pet.species}`)}
          </Txt>
        </View>
      </View>
      <View className="flex-row items-center gap-1.5">
        <View className={`h-2 w-2 rounded-full ${DOT[status]}`} />
        <Txt variant="caption" tone={selected ? 'textPrimary' : 'textSecondary'} numberOfLines={1}>
          {t(`healthStatus.${status}`)}
        </Txt>
      </View>
    </Pressable>
  );
}
