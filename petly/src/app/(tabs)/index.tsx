import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { DailyProgressCard } from '@/components/dashboard/DailyProgressCard';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { HealthOverviewCard } from '@/components/dashboard/HealthOverviewCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivityCard } from '@/components/dashboard/RecentActivityCard';
import { TodayCareCard } from '@/components/dashboard/TodayCareCard';
import { UpcomingRemindersCard } from '@/components/dashboard/UpcomingRemindersCard';
import { PetSelector } from '@/components/pets/PetSelector';
import { Banner } from '@/components/ui/Banner';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { bucketReminders } from '@/core/reminders';
import { useResponsive } from '@/hooks/useResponsive';
import { useCareDay } from '@/hooks/useTodayCare';
import { useToday } from '@/hooks/useToday';
import { removeSampleData } from '@/stores/lifecycle';
import { usePets } from '@/stores/pets';
import { useReminders } from '@/stores/reminders';
import { useSettings } from '@/stores/settings';
import { toast } from '@/stores/toast';

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { isWide } = useResponsive();
  const now = useToday();
  const pets = usePets((s) => s.pets);
  const selectPet = usePets((s) => s.selectPet);
  const selectedId = usePets((s) => s.selectedPetId);
  const sample = useSettings((s) => s.usingSampleData);
  const reminders = useReminders((s) => s.items);
  // Multi-pet households start on "All pets"; one-pet households just show that pet.
  const [filter, setFilter] = useState<string | null>(pets.length === 1 ? (pets[0]?.id ?? null) : null);
  const { occurrences, progress } = useCareDay(filter);

  const focusPet = pets.find((p) => p.id === filter) ?? pets.find((p) => p.id === selectedId) ?? pets[0];
  const scopedReminders = filter ? reminders.filter((r) => r.petId === filter) : reminders;
  const overdueReminders = bucketReminders(reminders, now).overdue.length;
  const overdueTasks = occurrences.filter((o) => o.status === 'overdue').length;

  const onSelect = (id: string | null) => {
    setFilter(id);
    if (id) selectPet(id);
  };

  if (pets.length === 0) {
    return (
      <Screen>
        <DashboardHeader hasOverdue={false} />
        <Card>
          <EmptyState icon="paw-outline" title={t('dashboard.emptyTitle')} body={t('dashboard.emptyBody')} actionLabel={t('pets.add')} onAction={() => router.push('/pets/new')} />
        </Card>
      </Screen>
    );
  }

  const left = (
    <View className="gap-5">
      {progress.total > 0 ? <DailyProgressCard done={progress.done} total={progress.total} overdue={overdueTasks} /> : null}
      <TodayCareCard occurrences={occurrences} showPet={!filter} />
      <UpcomingRemindersCard reminders={scopedReminders} />
    </View>
  );
  const right = (
    <View className="gap-5">
      {focusPet ? <HealthOverviewCard pet={focusPet} /> : null}
      <RecentActivityCard petId={filter} />
    </View>
  );

  return (
    <Screen>
      <DashboardHeader hasOverdue={overdueReminders > 0} />
      {sample ? (
        <Banner
          icon="flask-outline"
          text={t('sample.banner')}
          action={t('sample.remove')}
          onAction={() => {
            removeSampleData();
            toast(t('sample.removed'));
          }}
        />
      ) : null}
      <View className="gap-3">
        <SectionHeader title={t('dashboard.yourPets')} />
        <PetSelector pets={pets} selectedId={filter} onSelect={onSelect} />
      </View>
      <View className="gap-3">
        <SectionHeader title={t('dashboard.quickActions')} />
        <QuickActions petId={filter} />
      </View>
      {isWide ? (
        <View className="flex-row gap-5">
          <View className="flex-1">{left}</View>
          <View className="flex-1">{right}</View>
        </View>
      ) : (
        <>
          {left}
          {right}
        </>
      )}
    </Screen>
  );
}
