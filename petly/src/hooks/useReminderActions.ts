import { useTranslation } from 'react-i18next';

import { nextInstance } from '@/core/reminders';
import type { Reminder } from '@/core/types';
import { haptic } from '@/lib/haptics';
import { cancelReminder, scheduleReminder } from '@/lib/notifications';
import { usePets } from '@/stores/pets';
import { useReminders } from '@/stores/reminders';
import { useSettings } from '@/stores/settings';
import { toast } from '@/stores/toast';

import { useFormat } from './useFormat';

/** Reminder side-effects: local notification scheduling and recurring roll-forward. */
export function useReminderActions() {
  const { t } = useTranslation();
  const f = useFormat();
  const store = useReminders();
  const pets = usePets((s) => s.pets);
  const notificationsOn = useSettings((s) => s.notifications.enabled);

  const schedule = async (r: Reminder) => {
    if (!notificationsOn) return;
    const pet = pets.find((p) => p.id === r.petId)?.name ?? '';
    const id = await scheduleReminder(r, { title: t('app.name'), body: t('reminders.notificationBody', { pet, title: r.title }) });
    if (id) useReminders.getState().update(r.id, { notificationId: id });
  };

  return {
    create: async (input: Omit<Reminder, 'id' | 'isSample'>) => {
      const r = store.add(input);
      await schedule(r);
      return r;
    },
    save: async (r: Reminder) => {
      await cancelReminder(r.notificationId);
      store.update(r.id, { ...r, notificationId: null });
      await schedule({ ...r, notificationId: null });
    },
    complete: async (r: Reminder) => {
      await cancelReminder(r.notificationId);
      store.update(r.id, { completedAt: new Date().toISOString(), notificationId: null });
      haptic.success();
      const next = nextInstance(r);
      if (next) {
        const { id: _id, isSample: _s, ...rest } = r;
        const created = store.add({ ...rest, ...next, completedAt: null, dismissedAt: null, notificationId: null });
        await schedule(created);
        toast(t('reminders.nextScheduled', { date: f.date(next.dueDate) }));
      } else {
        toast(t('reminders.doneToast'));
      }
    },
    dismiss: async (r: Reminder) => {
      await cancelReminder(r.notificationId);
      store.update(r.id, { dismissedAt: new Date().toISOString(), notificationId: null });
      toast(t('reminders.dismissedToast'), 'info');
    },
    remove: async (r: Reminder) => {
      await cancelReminder(r.notificationId);
      store.remove(r.id);
    },
  };
}
