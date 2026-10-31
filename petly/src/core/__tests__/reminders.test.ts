import { bucketReminders, nextInstance, notifyAt } from '../reminders';
import type { Reminder } from '../types';

const r = (over: Partial<Reminder>): Reminder => ({
  id: 'r',
  petId: 'p',
  title: 't',
  kind: 'custom',
  dueDate: '2026-10-31',
  dueTime: '09:00',
  recurrence: null,
  notifyMinutesBefore: 30,
  completedAt: null,
  dismissedAt: null,
  notificationId: null,
  isSample: false,
  ...over,
});

describe('reminders', () => {
  it('buckets by due moment; missed ones stay visible as overdue', () => {
    const b = bucketReminders(
      [
        r({ id: 'past', dueDate: '2026-10-01' }),
        r({ id: 'earlier', dueTime: '08:00' }),
        r({ id: 'later', dueTime: '18:00' }),
        r({ id: 'future', dueDate: '2026-11-05' }),
        r({ id: 'done', dueDate: '2026-10-01', completedAt: '2026-10-01T10:00:00Z' }),
      ],
      { date: '2026-10-31', time: '12:00' },
    );
    expect(b.overdue.map((x) => x.id)).toEqual(['past', 'earlier']);
    expect(b.today.map((x) => x.id)).toEqual(['later']);
    expect(b.upcoming.map((x) => x.id)).toEqual(['future']);
    expect(b.completed.map((x) => x.id)).toEqual(['done']);
  });
  it('rolls recurring reminders forward', () => {
    expect(nextInstance(r({ recurrence: { kind: 'weekly', days: [6] } }))).toEqual({ dueDate: '2026-11-07' });
    expect(nextInstance(r({}))).toBeNull();
  });
  it('computes notification time and skips the past', () => {
    const at = notifyAt(r({}), new Date(2026, 9, 31, 6, 0));
    expect(at?.getHours()).toBe(8);
    expect(at?.getMinutes()).toBe(30);
    expect(notifyAt(r({}), new Date(2026, 9, 31, 10, 0))).toBeNull();
  });
});
