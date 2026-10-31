import { bucketReminders } from '@/core/reminders';
import { occurrencesOn } from '@/core/tasks';
import { useCare } from '@/stores/care';
import { useReminders } from '@/stores/reminders';

import { useFormat } from './useFormat';
import { useToday } from './useToday';

/** The next thing that needs doing for a pet: a pending care task today, else the next reminder. */
export function useNextForPet() {
  const now = useToday();
  const f = useFormat();
  const tasks = useCare((s) => s.tasks);
  const log = useCare((s) => s.log);
  const reminders = useReminders((s) => s.items);
  return (petId: string): { title: string; when: string } | null => {
    const occ = occurrencesOn(tasks.filter((t) => t.petId === petId), log, now.date, now).find((o) => o.status !== 'done');
    if (occ) return { title: occ.task.title, when: f.time(occ.task.time) };
    const b = bucketReminders(reminders.filter((r) => r.petId === petId), now);
    const r = b.overdue[0] ?? b.today[0] ?? b.upcoming[0];
    return r ? { title: r.title, when: f.relative(r.dueDate) } : null;
  };
}
