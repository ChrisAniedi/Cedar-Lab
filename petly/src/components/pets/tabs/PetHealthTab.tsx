import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { currentVaccinations, isMedicationActive } from '@/core/health';
import type { Pet } from '@/core/types';
import { useToday } from '@/hooks/useToday';
import { useMedications } from '@/stores/medications';
import { useVaccinations } from '@/stores/vaccinations';
import { useVisits } from '@/stores/visits';

import { MedicationCard } from '../../health/MedicationCard';
import { VaccinationCard } from '../../health/VaccinationCard';
import { VisitCard } from '../../health/VisitCard';
import { Badge } from '../../ui/Badge';
import { Card } from '../../ui/Card';
import { SectionHeader } from '../../ui/SectionHeader';
import { Txt } from '../../ui/Txt';

export function PetHealthTab({ pet }: { pet: Pet }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { date } = useToday();
  const vax = currentVaccinations(useVaccinations((s) => s.items).filter((v) => v.petId === pet.id));
  const meds = useMedications((s) => s.medications).filter((m) => m.petId === pet.id && isMedicationActive(m, date));
  const visits = useVisits((s) => s.items)
    .filter((v) => v.petId === pet.id)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
  const p = { petId: pet.id };
  return (
    <View className="gap-5">
      <Card>
        <View className="gap-3">
          <Txt variant="subheading">{t('pets.health.allergies')}</Txt>
          {pet.allergies.length ? (
            <View className="flex-row flex-wrap gap-2">
              {pet.allergies.map((a) => (
                <Badge key={a} label={a} tone="danger" icon="warning-outline" />
              ))}
            </View>
          ) : (
            <Txt variant="caption" tone="textSecondary">
              {t('pets.health.noAllergies')}
            </Txt>
          )}
          <Txt variant="subheading">{t('pets.health.conditions')}</Txt>
          {pet.conditions.length ? (
            <View className="flex-row flex-wrap gap-2">
              {pet.conditions.map((c) => (
                <Badge key={c} label={c} tone="warning" />
              ))}
            </View>
          ) : (
            <Txt variant="caption" tone="textSecondary">
              {t('pets.health.noConditions')}
            </Txt>
          )}
        </View>
      </Card>
      <SectionHeader title={t('pets.health.vaccinations')} action={t('common.add')} onAction={() => router.push({ pathname: '/vaccinations/new', params: p })} />
      {vax.map((v) => (
        <VaccinationCard key={v.id} vax={v} />
      ))}
      <SectionHeader title={t('pets.health.medication')} action={t('common.add')} onAction={() => router.push({ pathname: '/medications/new', params: p })} />
      {meds.map((m) => (
        <MedicationCard key={m.id} med={m} />
      ))}
      <SectionHeader title={t('pets.health.visits')} action={t('common.add')} onAction={() => router.push({ pathname: '/visits/new', params: p })} />
      {visits.map((v) => (
        <VisitCard key={v.id} visit={v} />
      ))}
    </View>
  );
}
