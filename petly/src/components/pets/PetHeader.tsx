import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { Pet } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { useResponsive } from '@/hooks/useResponsive';

import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { SampleBadge } from '../ui/SampleBadge';
import { Txt } from '../ui/Txt';
import { HealthStatusBadge } from './HealthStatusBadge';
import { PetAvatar } from './PetAvatar';
import { usePetHealth } from './usePetHealth';

/** Passport-style header: photo, identity and the key facts. */
export function PetHeader({ pet }: { pet: Pet }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const { isWide } = useResponsive();
  const status = usePetHealth()(pet.id);
  const facts = [
    { label: t('pets.fields.breed'), value: pet.breed || t(`species.${pet.species}`) },
    { label: t('report.fields.age'), value: f.age(pet) },
    { label: t('report.fields.weight'), value: pet.weightKg ? f.weight(pet.weightKg) : t('common.notSet') },
    { label: t('pets.fields.sex'), value: t(`sex.${pet.sex}`) },
  ];
  return (
    <Card>
      <View className={isWide ? 'flex-row items-center gap-6' : 'items-center gap-4'}>
        <PetAvatar pet={pet} size={isWide ? 144 : 120} shape="rounded" />
        <View className={`flex-1 gap-3 ${isWide ? '' : 'w-full items-center'}`}>
          <View className={`gap-1 ${isWide ? '' : 'items-center'}`}>
            <View className="flex-row flex-wrap items-center gap-2">
              <Txt variant="display" accessibilityRole="header">
                {pet.name}
              </Txt>
              <SampleBadge show={pet.isSample} />
            </View>
            <View className="flex-row flex-wrap gap-2">
              <HealthStatusBadge status={status} />
              <Badge
                label={pet.microchip ? t('pets.microchipped') : t('pets.noMicrochip')}
                tone={pet.microchip ? 'primary' : 'neutral'}
                icon={pet.microchip ? 'hardware-chip-outline' : 'remove-circle-outline'}
              />
            </View>
          </View>
          <View className="w-full flex-row flex-wrap gap-y-3">
            {facts.map((x) => (
              <View key={x.label} className="w-1/2 gap-0.5" style={isWide ? { width: '25%' } : undefined}>
                <Txt variant="caption" tone="textSecondary">
                  {x.label}
                </Txt>
                <Txt variant="callout" weight="semibold" numberOfLines={1}>
                  {x.value}
                </Txt>
              </View>
            ))}
          </View>
          <View className={isWide ? 'self-start' : 'w-full'}>
            <Button label={t('pets.editProfile')} icon="create-outline" variant="secondary" onPress={() => router.push({ pathname: '/pets/[id]/edit', params: { id: pet.id } })} full={!isWide} />
          </View>
        </View>
      </View>
    </Card>
  );
}
