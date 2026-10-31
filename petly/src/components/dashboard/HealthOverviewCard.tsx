import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { currentVaccinations, isMedicationActive, vaccinationStatus } from '@/core/health';
import type { Pet } from '@/core/types';
import { inRange, weightTrend } from '@/core/wellness';
import { useFormat } from '@/hooks/useFormat';
import { useToday } from '@/hooks/useToday';
import { useMedications } from '@/stores/medications';
import { useVaccinations } from '@/stores/vaccinations';
import { useWeights } from '@/stores/weights';

import { LineChart } from '../health/LineChart';
import { VACCINE_STATUS } from '../health/VaccinationCard';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Divider } from '../ui/Divider';
import { Icon } from '../ui/Icon';
import { SectionHeader } from '../ui/SectionHeader';
import { Txt } from '../ui/Txt';

export function HealthOverviewCard({ pet }: { pet: Pet }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const { date } = useToday();
  const weights = useWeights((s) => s.items).filter((w) => w.petId === pet.id);
  const vaccinations = useVaccinations((s) => s.items).filter((v) => v.petId === pet.id);
  const meds = useMedications((s) => s.medications).filter((m) => m.petId === pet.id && isMedicationActive(m, date));
  const trend = weightTrend(weights);
  const series = inRange(weights, date, 180);
  const nextVax = currentVaccinations(vaccinations)
    .filter((v) => v.nextDueOn)
    .sort((a, b) => (a.nextDueOn ?? '').localeCompare(b.nextDueOn ?? ''))[0];
  const vaxStatus = nextVax ? vaccinationStatus(nextVax, date) : null;

  return (
    <Card>
      <View className="gap-4">
        <SectionHeader title={t('dashboard.health')} action={t('common.seeAll')} onAction={() => router.push({ pathname: '/pets/[id]', params: { id: pet.id, tab: 'wellness' } })} />
        <View className="flex-row gap-4">
          <View className="flex-1">
            <Txt variant="caption" tone="textSecondary">
              {t('dashboard.currentWeight')}
            </Txt>
            <Txt variant="heading">{trend.current ? f.weight(trend.current.kg) : pet.weightKg ? f.weight(pet.weightKg) : t('common.notSet')}</Txt>
          </View>
          <View className="flex-1">
            <Txt variant="caption" tone="textSecondary">
              {t('dashboard.previousWeight')}
            </Txt>
            <View className="flex-row items-center gap-1">
              <Txt variant="heading" tone="textSecondary">
                {trend.previous ? f.weight(trend.previous.kg) : '–'}
              </Txt>
              {trend.direction === 'up' || trend.direction === 'down' ? (
                <Icon name={trend.direction === 'up' ? 'arrow-up' : 'arrow-down'} tone="textSecondary" size={16} />
              ) : null}
            </View>
          </View>
        </View>
        {series.length > 1 ? (
          <LineChart
            height={110}
            points={series.map((w) => ({ key: w.id, value: f.weightValue(w.kg), label: f.date(w.date), valueLabel: f.weight(w.kg) }))}
            accessibilityLabel={t('wellness.chartLabel', { name: pet.name, weight: f.weight(series.at(-1)!.kg) })}
            pointLabel={(p) => t('wellness.pointLabel', { date: p.label, value: p.valueLabel })}
          />
        ) : null}
        <Divider />
        <View className="gap-2">
          <Txt variant="caption" tone="textSecondary">
            {t('dashboard.nextVaccination')}
          </Txt>
          {nextVax && vaxStatus ? (
            <View className="flex-row flex-wrap items-center gap-2">
              <Txt variant="callout" weight="semibold">
                {nextVax.name}
              </Txt>
              <Txt variant="caption" tone="textSecondary">
                {f.relative(nextVax.nextDueOn!)}
              </Txt>
              <Badge label={t(`vaccinations.${vaxStatus}`)} tone={VACCINE_STATUS[vaxStatus].tone} />
            </View>
          ) : (
            <Txt variant="callout" tone="textSecondary">
              {t('dashboard.noVaccinations')}
            </Txt>
          )}
        </View>
        <View className="gap-2">
          <Txt variant="caption" tone="textSecondary">
            {t('dashboard.activeMeds')}
          </Txt>
          {meds.length ? (
            <View className="flex-row flex-wrap gap-2">
              {meds.map((m) => (
                <Badge key={m.id} label={`${m.name} · ${m.dosage} ${m.dosageUnit}`} tone="primary" icon="medkit-outline" />
              ))}
            </View>
          ) : (
            <Txt variant="callout" tone="textSecondary">
              {t('dashboard.noActiveMeds')}
            </Txt>
          )}
        </View>
      </View>
    </Card>
  );
}
