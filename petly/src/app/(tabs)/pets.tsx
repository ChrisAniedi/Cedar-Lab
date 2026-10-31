import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { PetDirectoryCard } from '@/components/pets/PetDirectoryCard';
import { usePetHealth } from '@/components/pets/usePetHealth';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/EmptyState';
import { OptionChips } from '@/components/ui/OptionChips';
import { Screen } from '@/components/ui/Screen';
import { TextField } from '@/components/ui/TextField';
import { Txt } from '@/components/ui/Txt';
import { filterPets, speciesPresent } from '@/core/pets';
import type { Species } from '@/core/types';
import { useNextForPet } from '@/hooks/useNextForPet';
import { useResponsive } from '@/hooks/useResponsive';
import { usePets } from '@/stores/pets';

export default function MyPets() {
  const { t } = useTranslation();
  const router = useRouter();
  const { width, isWide } = useResponsive();
  const pets = usePets((s) => s.pets);
  const health = usePetHealth();
  const next = useNextForPet();
  const [query, setQuery] = useState('');
  const [species, setSpecies] = useState<Species | 'all'>('all');
  const list = filterPets(pets, query, species);
  const present = speciesPresent(pets);
  const columns = width >= 1200 ? 3 : width >= 640 ? 2 : 1;

  return (
    <Screen>
      <View className="flex-row items-center justify-between pt-2">
        <Txt variant="title" accessibilityRole="header">
          {t('pets.title')}
        </Txt>
        <Button label={t('pets.add')} icon="add" size={isWide ? 'md' : 'sm'} onPress={() => router.push('/pets/new')} />
      </View>
      {pets.length === 0 ? (
        <EmptyState icon="paw-outline" title={t('pets.emptyTitle')} body={t('pets.emptyBody')} actionLabel={t('pets.add')} onAction={() => router.push('/pets/new')} />
      ) : (
        <>
          {pets.length > 1 ? (
            <View className="gap-3">
              <TextField label={t('common.search')} placeholder={t('pets.searchPlaceholder')} value={query} onChangeText={setQuery} autoCorrect={false} />
              {present.length > 1 ? (
                <OptionChips
                  scroll
                  options={[{ value: 'all' as const, label: t('common.all') }, ...present.map((s) => ({ value: s, label: t(`species.${s}`) }))]}
                  value={species}
                  onChange={setSpecies}
                />
              ) : null}
            </View>
          ) : null}
          {list.length === 0 ? (
            <Txt tone="textSecondary">{t('pets.noResults')}</Txt>
          ) : (
            <View className="flex-row flex-wrap" style={{ marginHorizontal: -8 }}>
              {list.map((p) => (
                <View key={p.id} style={{ width: `${100 / columns}%`, padding: 8 }}>
                  <PetDirectoryCard pet={p} status={health(p.id)} next={next(p.id)} />
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </Screen>
  );
}
