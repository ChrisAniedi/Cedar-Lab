import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { VaccinationCard } from '@/components/health/VaccinationCard';
import { PetFilterChips } from '@/components/pets/PetFilterChips';
import { Button } from '@/components/ui/Button';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { Txt } from '@/components/ui/Txt';
import { currentVaccinations, vaccinationStatus, type VaccinationStatus } from '@/core/health';
import { useToday } from '@/hooks/useToday';
import { useVaccinations } from '@/stores/vaccinations';

const GROUPS: { key: VaccinationStatus[]; label: 'overdue' | 'dueSoon' | 'upToDate' }[] = [
  { key: ['overdue'], label: 'overdue' },
  { key: ['dueSoon'], label: 'dueSoon' },
  { key: ['upToDate', 'noBooster'], label: 'upToDate' },
];

export default function Vaccinations() {
  const { t } = useTranslation();
  const router = useRouter();
  const { date } = useToday();
  const [petId, setPetId] = useState<string | null>(null);
  const all = useVaccinations((s) => s.items).filter((v) => !petId || v.petId === petId);
  const current = currentVaccinations(all);
  const currentIds = new Set(current.map((v) => v.id));
  const history = all.filter((v) => !currentIds.has(v.id)).sort((a, b) => b.administeredOn.localeCompare(a.administeredOn));

  return (
    <Screen edges={[]}>
      <Button label={t('vaccinations.add')} icon="add" onPress={() => router.push({ pathname: '/vaccinations/new', params: petId ? { petId } : {} })} />
      <PetFilterChips value={petId} onChange={setPetId} />
      <Disclaimer text={t('vaccinations.sourceNote')} />
      {all.length === 0 ? (
        <EmptyState icon="shield-checkmark-outline" title={t('vaccinations.emptyTitle')} body={t('vaccinations.emptyBody')} />
      ) : (
        GROUPS.map((g) => {
          const list = current.filter((v) => g.key.includes(vaccinationStatus(v, date))).sort((a, b) => (a.nextDueOn ?? '9').localeCompare(b.nextDueOn ?? '9'));
          if (!list.length) return null;
          return (
            <View key={g.label} className="gap-2">
              <Txt variant="overline" tone="textSecondary">
                {t(`vaccinations.${g.label}`)}
              </Txt>
              {list.map((v) => (
                <VaccinationCard key={v.id} vax={v} />
              ))}
            </View>
          );
        })
      )}
      {history.length ? (
        <View className="gap-2">
          <Txt variant="overline" tone="textSecondary">
            {t('vaccinations.history')}
          </Txt>
          {history.map((v) => (
            <VaccinationCard key={v.id} vax={v} current={false} />
          ))}
        </View>
      ) : null}
    </Screen>
  );
}
