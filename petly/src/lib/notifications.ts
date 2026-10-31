import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { notifyAt } from '@/core/reminders';
import type { Reminder } from '@/core/types';

/** Local notifications for reminders. Works in Expo Go (local, not remote push). */

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function ensurePermission(): Promise<boolean> {
  if (Platform.OS === 'web') return false;
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
}

export async function scheduleReminder(r: Reminder, body: { title: string; body: string }): Promise<string | null> {
  if (Platform.OS === 'web') return null;
  const at = notifyAt(r, new Date());
  if (!at) return null;
  if (!(await ensurePermission())) return null;
  try {
    return await Notifications.scheduleNotificationAsync({
      content: { title: body.title, body: body.body, data: { reminderId: r.id, petId: r.petId } },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: at },
    });
  } catch {
    return null;
  }
}

export async function cancelReminder(notificationId: string | null) {
  if (!notificationId || Platform.OS === 'web') return;
  await Notifications.cancelScheduledNotificationAsync(notificationId).catch(() => {});
}
