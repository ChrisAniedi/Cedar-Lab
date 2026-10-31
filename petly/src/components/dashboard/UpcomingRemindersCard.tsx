import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { bucketReminders } from '@/core/reminders';
import type { Reminder } from '@/core/types';
import { useToday } from '@/hooks/useToday';

import { ReminderCard } from '../health/ReminderCard';
import { Card } from '../ui/Card';
import { SectionHeader } from '../ui/SectionHeader';
import { Txt } from '../ui/Txt';

export function UpcomingRemindersCard({ reminders }: { reminders: Reminder[] }) {
  const { t } = useTranslation();
  const router = useRouter();
  const now = useToday();
  const b = bucketReminders(reminders, now);
  const items = [...b.overdue.map((r) => ({ r, k: 'overdue' as const })), ...b.today.map((r) => ({ r, k: 'today' as const })), ...b.upcoming.map((r) => ({ r, k: 'upcoming' as const }))].slice(0, 4);
  return (
    <Card>
      <View className="gap-3">
        <SectionHeader title={t('dashboard.upcoming')} action={t('common.seeAll')} onAction={() => router.push('/reminders')} />
        {items.length === 0 ? (
          <Txt variant="caption" tone="textSecondary">
            {t('dashboard.noReminders')}
          </Txt>
        ) : (
          <View className="gap-1.5">
            {items.map(({ r, k }) => (
              <ReminderCard key={r.id} reminder={r} bucket={k} compact />
            ))}
          </View>
        )}
      </View>
    </Card>
  );
}
