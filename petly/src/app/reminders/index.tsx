import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { ReminderCard } from '@/components/health/ReminderCard';
import { PetFilterChips } from '@/components/pets/PetFilterChips';
import { Button } from '@/components/ui/Button';
import { ComingSoonRow } from '@/components/ui/ComingSoonRow';
import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { OptionChips } from '@/components/ui/OptionChips';
import { Txt } from '@/components/ui/Txt';
import { bucketReminders, type ReminderBucket } from '@/core/reminders';
import { useToday } from '@/hooks/useToday';
import { useReminders } from '@/stores/reminders';

export default function Reminders() {
  const { t } = useTranslation();
  const router = useRouter();
  const now = useToday();
  const [petId, setPetId] = useState<string | null>(null);
  const all = useReminders((s) => s.items).filter((r) => !petId || r.petId === petId);
  const buckets = bucketReminders(all, now);
  const [tab, setTab] = useState<ReminderBucket>(buckets.overdue.length ? 'overdue' : 'today');
  const list = buckets[tab];

  return (
    <Screen edges={[]}>
      <Button label={t('reminders.add')} icon="add" onPress={() => router.push({ pathname: '/reminders/new', params: petId ? { petId } : {} })} />
      <PetFilterChips value={petId} onChange={setPetId} />
      <OptionChips
        scroll
        options={(['overdue', 'today', 'upcoming', 'completed'] as const).map((b) => ({ value: b, label: `${t(`reminders.${b}`)} · ${buckets[b].length}` }))}
        value={tab}
        onChange={setTab}
      />
      {all.length === 0 ? (
        <EmptyState icon="notifications-outline" title={t('reminders.emptyTitle')} body={t('reminders.emptyBody')} />
      ) : list.length === 0 ? (
        <Txt tone="textSecondary">{t('reminders.emptyBucket')}</Txt>
      ) : (
        <View className="gap-2">
          {list.map((r) => (
            <ReminderCard key={r.id} reminder={r} bucket={tab} />
          ))}
        </View>
      )}
      <ComingSoonRow icon="mail-outline" label={t('settings.emailNotifications')} />
    </Screen>
  );
}
