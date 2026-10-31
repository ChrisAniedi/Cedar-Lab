import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { medicalTimeline } from '@/core/timeline';
import type { Pet } from '@/core/types';
import { useToday } from '@/hooks/useToday';
import { useMedications } from '@/stores/medications';
import { useVaccinations } from '@/stores/vaccinations';
import { useVisits } from '@/stores/visits';

import { TimelineEntryRow } from '../../health/TimelineEntryRow';
import { Card } from '../../ui/Card';
import { EmptyState } from '../../ui/EmptyState';
import { SectionHeader } from '../../ui/SectionHeader';

export function PetRecordsTab({ pet }: { pet: Pet }) {
  const { t } = useTranslation();
  const { date } = useToday();
  const mine = <T extends { petId: string }>(list: T[]) => list.filter((x) => x.petId === pet.id);
  const entries = medicalTimeline(
    {
      visits: mine(useVisits((s) => s.items)),
      vaccinations: mine(useVaccinations((s) => s.items)),
      medications: mine(useMedications((s) => s.medications)),
    },
    date,
  );
  return (
    <Card>
      <View className="gap-4">
        <SectionHeader title={t('pets.records.title')} />
        {entries.length === 0 ? (
          <EmptyState compact icon="document-text-outline" title={t('pets.records.title')} body={t('pets.records.empty')} />
        ) : (
          <View>
            {entries.map((e, i) => (
              <TimelineEntryRow key={`${e.kind}-${e.id}`} entry={e} last={i === entries.length - 1} />
            ))}
          </View>
        )}
      </View>
    </Card>
  );
}
