import { timeToMinutes } from './dates';
import { occursOn } from './recurrence';
import type { CareLogEntry, CareTask, DateKey, ID, TimeKey, Timestamp } from './types';

export type OccurrenceStatus = 'done' | 'pending' | 'overdue';

export interface TaskOccurrence {
  task: CareTask;
  date: DateKey;
  status: OccurrenceStatus;
  completedBy: ID | null;
  completedAt: Timestamp | null;
}

/** Latest log entry for one occurrence decides its state; history stays intact. */
export function latestEntry(log: CareLogEntry[], taskId: ID, date: DateKey): CareLogEntry | null {
  let latest: CareLogEntry | null = null;
  for (const e of log) {
    if (e.taskId !== taskId || e.date !== date) continue;
    if (!latest || e.at >= latest.at) latest = e;
  }
  return latest;
}

export function isCompleted(log: CareLogEntry[], taskId: ID, date: DateKey): boolean {
  return latestEntry(log, taskId, date)?.action === 'completed';
}

/**
 * Occurrences of tasks on `date`, sorted by time.
 * `now` (date + time) marks past-due pending items as overdue.
 */
export function occurrencesOn(
  tasks: CareTask[],
  log: CareLogEntry[],
  date: DateKey,
  now: { date: DateKey; time: TimeKey },
): TaskOccurrence[] {
  return tasks
    .filter((t) => occursOn(t.recurrence, date))
    .map((task) => {
      const entry = latestEntry(log, task.id, date);
      const done = entry?.action === 'completed';
      const past = date < now.date || (date === now.date && timeToMinutes(task.time) < timeToMinutes(now.time));
      const status: OccurrenceStatus = done ? 'done' : past ? 'overdue' : 'pending';
      return {
        task,
        date,
        status,
        completedBy: done ? (entry?.by ?? null) : null,
        completedAt: done ? (entry?.at ?? null) : null,
      };
    })
    .sort((a, b) => timeToMinutes(a.task.time) - timeToMinutes(b.task.time));
}

export type ToggleResult =
  | { ok: true; entry: Omit<CareLogEntry, 'id'> }
  | { ok: false; reason: 'alreadyCompleted' | 'notCompleted' };

/** Prevents duplicate completion: completing a done occurrence is rejected. */
export function completeOccurrence(
  log: CareLogEntry[],
  task: CareTask,
  date: DateKey,
  by: ID,
  at: Timestamp,
): ToggleResult {
  if (isCompleted(log, task.id, date)) return { ok: false, reason: 'alreadyCompleted' };
  return { ok: true, entry: { taskId: task.id, petId: task.petId, date, action: 'completed', by, at } };
}

export function undoOccurrence(log: CareLogEntry[], task: CareTask, date: DateKey, by: ID, at: Timestamp): ToggleResult {
  if (!isCompleted(log, task.id, date)) return { ok: false, reason: 'notCompleted' };
  return { ok: true, entry: { taskId: task.id, petId: task.petId, date, action: 'undone', by, at } };
}

export function progress(occurrences: TaskOccurrence[]): { done: number; total: number; ratio: number } {
  const total = occurrences.length;
  const done = occurrences.filter((o) => o.status === 'done').length;
  return { done, total, ratio: total === 0 ? 0 : done / total };
}
