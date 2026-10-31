import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { VetVisit } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { usePetLookup } from '@/hooks/usePetLookup';

import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { SampleBadge } from '../ui/SampleBadge';
import { Txt } from '../ui/Txt';

export function VisitCard({ visit }: { visit: VetVisit }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const pet = usePetLookup()(visit.petId);
  return (
    <Card onPress={() => router.push({ pathname: '/visits/[id]', params: { id: visit.id } })} accessibilityLabel={`${visit.reason}, ${pet?.name ?? ''}, ${f.date(visit.date)}`}>
      <View className="flex-row items-start gap-3">
        <View className="h-12 w-12 items-center justify-center rounded-field bg-primary-soft">
          <Txt variant="label" tone="textPrimary">
            {f.date(visit.date, 'short')}
          </Txt>
        </View>
        <View className="flex-1 gap-1">
          <View className="flex-row flex-wrap items-center gap-2">
            <Txt variant="subheading">{visit.reason}</Txt>
            <SampleBadge show={visit.isSample} />
          </View>
          <Txt variant="caption" tone="textSecondary">
            {[pet?.name, visit.clinic, visit.vet, visit.time ? f.time(visit.time) : null].filter(Boolean).join(' · ')}
          </Txt>
          {visit.diagnosis ? (
            <Txt variant="caption" numberOfLines={2}>
              {visit.diagnosis}
            </Txt>
          ) : null}
          {visit.followUpOn ? (
            <View className="flex-row items-center gap-1">
              <Icon name="return-down-forward-outline" tone="textSecondary" size={14} />
              <Txt variant="caption" tone="textSecondary">
                {t('visits.followUp', { date: f.date(visit.followUpOn) })}
              </Txt>
            </View>
          ) : null}
        </View>
      </View>
    </Card>
  );
}
