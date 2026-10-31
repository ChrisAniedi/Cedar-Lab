import { atLocal } from './dates';
import { nextOccurrence } from './recurrence';
import type { DateKey, Reminder, TimeKey } from './types';

export type ReminderBucket = 'overdue' | 'today' | 'upcoming' | 'completed';

export function bucketOf(r: Reminder, now: { date: DateKey; time: TimeKey }): ReminderBucket {
  if (r.completedAt || r.dismissedAt) return 'completed';
  if (r.dueDate < now.date || (r.dueDate === now.date && r.dueTime < now.time)) return 'overdue';
  if (r.dueDate === now.date) return 'today';
  return 'upcoming';
}

export function bucketReminders(reminders: Reminder[], now: { date: DateKey; time: TimeKey }) {
  const out: Record<ReminderBucket, Reminder[]> = { overdue: [], today: [], upcoming: [], completed: [] };
  for (const r of reminders) out[bucketOf(r, now)].push(r);
  const byDue = (a: Reminder, b: Reminder) => (a.dueDate + a.dueTime).localeCompare(b.dueDate + b.dueTime);
  out.overdue.sort(byDue);
  out.today.sort(byDue);
  out.upcoming.sort(byDue);
  out.completed.sort((a, b) => (b.completedAt ?? b.dismissedAt ?? '').localeCompare(a.completedAt ?? a.dismissedAt ?? ''));
  return out;
}

/** For a recurring reminder, the next instance after completion (or null). */
export function nextInstance(r: Reminder): Pick<Reminder, 'dueDate'> | null {
  if (!r.recurrence) return null;
  const next = nextOccurrence(r.recurrence, r.dueDate);
  return next ? { dueDate: next } : null;
}

/** When the device should notify, or null if that moment has passed. */
export function notifyAt(r: Reminder, now: Date): Date | null {
  const at = new Date(atLocal(r.dueDate, r.dueTime).getTime() - r.notifyMinutesBefore * 60_000);
  return at > now ? at : null;
}
