import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, View } from 'react-native';

import type { ReminderBucket } from '@/core/reminders';
import type { Reminder, ReminderKind } from '@/core/types';
import { useFormat } from '@/hooks/useFormat';
import { usePetLookup } from '@/hooks/usePetLookup';
import { useReminderActions } from '@/hooks/useReminderActions';

import { Icon, type IconName } from '../ui/Icon';
import { SampleBadge } from '../ui/SampleBadge';
import { Txt } from '../ui/Txt';

export const REMINDER_ICON: Record<ReminderKind, IconName> = {
  vaccination: 'shield-checkmark-outline',
  medication: 'medkit-outline',
  appointment: 'calendar-outline',
  grooming: 'cut-outline',
  feeding: 'restaurant-outline',
  refill: 'refresh-outline',
  custom: 'notifications-outline',
};

/** Overdue reminders stay visible until done or explicitly dismissed. */
export function ReminderCard({ reminder, bucket, compact }: { reminder: Reminder; bucket: ReminderBucket; compact?: boolean }) {
  const { t } = useTranslation();
  const router = useRouter();
  const f = useFormat();
  const pet = usePetLookup()(reminder.petId);
  const actions = useReminderActions();
  const overdue = bucket === 'overdue';
  const done = bucket === 'completed';
  return (
    <View className={`flex-row items-center gap-3 rounded-field px-3 py-3 ${overdue ? 'bg-danger-soft' : done ? 'bg-surface-muted' : 'bg-surface'}`}>
      <View className={`h-10 w-10 items-center justify-center rounded-full ${overdue ? 'bg-surface' : 'bg-primary-soft'}`}>
        <Icon name={REMINDER_ICON[reminder.kind]} tone={overdue ? 'dangerInk' : 'textPrimary'} />
      </View>
      <Pressable className="flex-1 gap-0.5" onPress={() => router.push({ pathname: '/reminders/new', params: { id: reminder.id } })} accessibilityRole="button">
        <View className="flex-row flex-wrap items-center gap-2">
          <Txt variant="callout" weight="semibold" tone={overdue ? 'dangerInk' : 'text'}>
            {reminder.title}
          </Txt>
          <SampleBadge show={reminder.isSample} />
        </View>
        <Txt variant="caption" tone={overdue ? 'dangerInk' : 'textSecondary'}>
          {[pet?.name, `${f.relative(reminder.dueDate)} ${f.time(reminder.dueTime)}`, t(`reminders.kinds.${reminder.kind}`)].filter(Boolean).join(' · ')}
        </Txt>
      </Pressable>
      {!done && !compact ? (
        <View className="flex-row">
          <Pressable onPress={() => actions.dismiss(reminder)} accessibilityRole="button" accessibilityLabel={`${t('reminders.dismiss')}: ${reminder.title}`} className="h-11 w-11 items-center justify-center">
            <Icon name="close" tone={overdue ? 'dangerInk' : 'textSecondary'} />
          </Pressable>
          <Pressable onPress={() => actions.complete(reminder)} accessibilityRole="button" accessibilityLabel={`${t('reminders.markDone')}: ${reminder.title}`} className="h-11 w-11 items-center justify-center">
            <Icon name="checkmark-circle-outline" tone={overdue ? 'dangerInk' : 'textPrimary'} size={24} />
          </Pressable>
        </View>
      ) : null}
      {!done && compact ? (
        <Pressable onPress={() => actions.complete(reminder)} accessibilityRole="button" accessibilityLabel={`${t('reminders.markDone')}: ${reminder.title}`} className="h-11 w-11 items-center justify-center">
          <Icon name="checkmark-circle-outline" tone={overdue ? 'dangerInk' : 'textPrimary'} size={24} />
        </Pressable>
      ) : null}
    </View>
  );
}
