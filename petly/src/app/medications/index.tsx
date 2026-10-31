import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { MedicationCard } from '@/components/health/MedicationCard';
import { PetFilterChips } from '@/components/pets/PetFilterChips';
import { Button } from '@/components/ui/Button';
import { ComingSoonRow } from '@/components/ui/ComingSoonRow';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { Txt } from '@/components/ui/Txt';
import { medicationStatus } from '@/core/health';
import { useToday } from '@/hooks/useToday';
import { useMedications } from '@/stores/medications';

const GROUPS = ['active', 'scheduled', 'completed'] as const;

export default function Medications() {
  const { t } = useTranslation();
  const router = useRouter();
  const { date } = useToday();
  const [petId, setPetId] = useState<string | null>(null);
  const meds = useMedications((s) => s.medications).filter((m) => !petId || m.petId === petId);
  const params = petId ? { petId } : {};
  return (
    <Screen edges={[]}>
      <Button label={t('medications.add')} icon="add" onPress={() => router.push({ pathname: '/medications/new', params })} />
      <PetFilterChips value={petId} onChange={setPetId} />
      {meds.length === 0 ? (
        <EmptyState icon="medkit-outline" title={t('medications.emptyTitle')} body={t('medications.emptyBody')} />
      ) : (
        GROUPS.map((g) => {
          const list = meds.filter((m) => medicationStatus(m, date) === g);
          if (!list.length) return null;
          return (
            <View key={g} className="gap-2">
              <Txt variant="overline" tone="textSecondary">
                {t(`medications.${g}`)}
              </Txt>
              {list.map((m) => (
                <MedicationCard key={m.id} med={m} />
              ))}
            </View>
          );
        })
      )}
      <ComingSoonRow icon="refresh-outline" label={t('medications.refill')} />
      <Disclaimer text={t('medications.noDosageAdvice')} />
    </Screen>
  );
}
