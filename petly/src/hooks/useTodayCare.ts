import { occurrencesOn, progress } from '@/core/tasks';
import type { DateKey } from '@/core/types';
import { useCare } from '@/stores/care';

import { useToday } from './useToday';

/** Care occurrences for a day (defaults to today), optionally for one pet. */
export function useCareDay(petId: string | null, date?: DateKey) {
  const now = useToday();
  const tasks = useCare((s) => s.tasks);
  const log = useCare((s) => s.log);
  const day = date ?? now.date;
  const occurrences = occurrencesOn(petId ? tasks.filter((t) => t.petId === petId) : tasks, log, day, now);
  return { occurrences, progress: progress(occurrences), date: day };
}
