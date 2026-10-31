import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import type { TaskOccurrence } from '@/core/tasks';

import { CareTaskItem } from '../care/CareTaskItem';
import { useCompleteTask } from '../care/useCompleteTask';
import { Card } from '../ui/Card';
import { EmptyState } from '../ui/EmptyState';
import { SectionHeader } from '../ui/SectionHeader';

const LIMIT = 6;

/** Pending/overdue first so what needs doing is on top; done items follow. */
export function TodayCareCard({ occurrences, showPet }: { occurrences: TaskOccurrence[]; showPet: boolean }) {
  const { t } = useTranslation();
  const router = useRouter();
  const toggle = useCompleteTask();
  const order = { overdue: 0, pending: 1, done: 2 } as const;
  const sorted = [...occurrences].sort((a, b) => order[a.status] - order[b.status]);
  return (
    <Card>
      <View className="gap-3">
        <SectionHeader title={t('dashboard.today')} action={t('common.seeAll')} onAction={() => router.push('/care')} />
        {sorted.length === 0 ? (
          <EmptyState compact icon="checkbox-outline" title={t('dashboard.noTasksTitle')} body={t('dashboard.noTasksBody')} actionLabel={t('quick.task')} onAction={() => router.push('/care/task')} />
        ) : (
          <View className="gap-1.5">
            {sorted.slice(0, LIMIT).map((o) => (
              <CareTaskItem key={o.task.id} occ={o} onToggle={() => toggle(o)} showPet={showPet} />
            ))}
          </View>
        )}
      </View>
    </Card>
  );
}
