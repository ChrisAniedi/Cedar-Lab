import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, ScrollView } from 'react-native';

import type { Pet } from '@/core/types';

import { Icon } from '../ui/Icon';
import { Txt } from '../ui/Txt';
import { PetChip } from './PetChip';
import { usePetHealth } from './usePetHealth';

/** Scrollable pet switcher with an "add" tile at the end. `null` = all pets. */
export function PetSelector({ pets, selectedId, onSelect }: { pets: Pet[]; selectedId: string | null; onSelect: (id: string | null) => void }) {
  const { t } = useTranslation();
  const router = useRouter();
  const health = usePetHealth();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-4" accessibilityRole="radiogroup">
      {pets.length > 1 ? (
        <Pressable
          onPress={() => onSelect(null)}
          accessibilityRole="radio"
          accessibilityState={{ checked: selectedId === null }}
          className={`w-[96px] items-center justify-center gap-1 rounded-card border p-3 ${selectedId === null ? 'border-primary bg-primary-soft' : 'border-border bg-surface'}`}
        >
          <Icon name="paw" tone={selectedId === null ? 'textPrimary' : 'textSecondary'} size={22} />
          <Txt variant="label" tone={selectedId === null ? 'textPrimary' : 'text'} align="center">
            {t('dashboard.allPets')}
          </Txt>
        </Pressable>
      ) : null}
      {pets.map((p) => (
        <PetChip key={p.id} pet={p} selected={selectedId === p.id} status={health(p.id)} onPress={() => onSelect(p.id)} />
      ))}
      <Pressable
        onPress={() => router.push('/pets/new')}
        accessibilityRole="button"
        accessibilityLabel={t('dashboard.addPet')}
        className="w-[96px] items-center justify-center gap-1 rounded-card border border-dashed border-border p-3"
      >
        <Icon name="add" tone="textPrimary" size={22} />
        <Txt variant="label" tone="textPrimary" align="center">
          {t('dashboard.addPet')}
        </Txt>
      </Pressable>
    </ScrollView>
  );
}
