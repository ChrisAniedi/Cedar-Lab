import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { vaccinationStatus } from '@/core/health';
import type { Vaccination } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { usePetLookup } from '@/hooks/usePetLookup';
import { useToday } from '@/hooks/useToday';

import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Icon } from '../ui/Icon';
import { SampleBadge } from '../ui/SampleBadge';
import { Txt } from '../ui/Txt';

export const VACCINE_STATUS = {
  overdue: { tone: 'danger', icon: 'alert-circle' },
  dueSoon: { tone: 'warning', icon: 'time' },
  upToDate: { tone: 'success', icon: 'checkmark-circle' },
  noBooster: { tone: 'neutral', icon: 'remove-circle-outline' },
} as const;

export function VaccinationCard({ vax, current = true }: { vax: Vaccination; current?: boolean }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const { date } = useToday();
  const pet = usePetLookup()(vax.petId);
  const status = vaccinationStatus(vax, date);
  return (
    <Card onPress={() => router.push({ pathname: '/vaccinations/[id]', params: { id: vax.id } })} accessibilityLabel={`${vax.name}, ${pet?.name ?? ''}`}>
      <View className="flex-row items-start gap-3">
        <View className="h-10 w-10 items-center justify-center rounded-full bg-primary-soft">
          <Icon name="shield-checkmark-outline" tone="textPrimary" />
        </View>
        <View className="flex-1 gap-1">
          <View className="flex-row flex-wrap items-center gap-2">
            <Txt variant="subheading">{vax.name}</Txt>
            <SampleBadge show={vax.isSample} />
          </View>
          <Txt variant="caption" tone="textSecondary">
            {[pet?.name, t('vaccinations.given', { date: f.date(vax.administeredOn) }), vax.clinic].filter(Boolean).join(' · ')}
          </Txt>
          {current ? (
            <View className="mt-1 flex-row flex-wrap items-center gap-2">
              <Badge label={t(`vaccinations.${status}`)} tone={VACCINE_STATUS[status].tone} icon={VACCINE_STATUS[status].icon} />
              {vax.nextDueOn ? (
                <Txt variant="caption" tone={status === 'overdue' ? 'dangerInk' : 'textSecondary'}>
                  {t('vaccinations.nextDue', { date: f.date(vax.nextDueOn) })}
                </Txt>
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
    </Card>
  );
}
