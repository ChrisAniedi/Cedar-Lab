import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { PetHealthStatus } from '@/core/health';
import type { Pet } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';

import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { SampleBadge } from '../ui/SampleBadge';
import { Txt } from '../ui/Txt';
import { HealthStatusBadge } from './HealthStatusBadge';
import { PetAvatar } from './PetAvatar';

export function PetDirectoryCard({ pet, status, next }: { pet: Pet; status: PetHealthStatus; next: { title: string; when: string } | null }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  return (
    <Card padded={false} onPress={() => router.push({ pathname: '/pets/[id]', params: { id: pet.id } })} accessibilityLabel={t('a11y.openPet', { name: pet.name })} className="flex-1 overflow-hidden">
      <View className="items-center bg-surface-muted py-5">
        <PetAvatar pet={pet} size={120} shape="rounded" />
      </View>
      <View className="gap-2 p-4">
        <View className="flex-row flex-wrap items-center gap-2">
          <Txt variant="heading">{pet.name}</Txt>
          <SampleBadge show={pet.isSample} />
        </View>
        <Txt variant="caption" tone="textSecondary">
          {[pet.breed || t(`species.${pet.species}`), f.age(pet), pet.weightKg ? f.weight(pet.weightKg) : null].filter(Boolean).join(' · ')}
        </Txt>
        <HealthStatusBadge status={status} />
        <View className="flex-row items-center gap-1.5">
          <Icon name="time-outline" tone="textSecondary" size={14} />
          <Txt variant="caption" tone="textSecondary" numberOfLines={1} style={{ flex: 1 }}>
            {next ? t('pets.next', { title: next.title, when: next.when }) : t('pets.nothingNext')}
          </Txt>
        </View>
      </View>
    </Card>
  );
}
