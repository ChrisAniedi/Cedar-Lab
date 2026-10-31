import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { Pet } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { useToday } from '@/hooks/useToday';
import { useVisits } from '@/stores/visits';

import { HealthOverviewCard } from '../../dashboard/HealthOverviewCard';
import { QuickActions } from '../../dashboard/QuickActions';
import { RecentActivityCard } from '../../dashboard/RecentActivityCard';
import { Card } from '../../ui/Card';
import { ListRow } from '../../ui/ListRow';
import { SectionHeader } from '../../ui/SectionHeader';
import { Txt } from '../../ui/Txt';

export function PetOverviewTab({ pet }: { pet: Pet }) {
  const { t } = useTranslation();
  const f = useFormat();
  const { date } = useToday();
  const nextVisit = useVisits((s) => s.items)
    .filter((v) => v.petId === pet.id && v.date >= date)
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  return (
    <View className="gap-5">
      <HealthOverviewCard pet={pet} />
      <Card>
        <View className="gap-1">
          <SectionHeader title={t('pets.overview.nextAppointment')} />
          {nextVisit ? (
            <ListRow icon="calendar-outline" title={nextVisit.reason} subtitle={[f.relative(nextVisit.date), nextVisit.time ? f.time(nextVisit.time) : null, nextVisit.clinic].filter(Boolean).join(' · ')} />
          ) : (
            <Txt variant="caption" tone="textSecondary">
              {t('pets.overview.noAppointment')}
            </Txt>
          )}
        </View>
      </Card>
      <View className="gap-3">
        <SectionHeader title={t('dashboard.quickActions')} />
        <QuickActions petId={pet.id} />
      </View>
      <RecentActivityCard petId={pet.id} />
    </View>
  );
}
