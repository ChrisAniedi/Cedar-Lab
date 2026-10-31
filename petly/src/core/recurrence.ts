import { addDays, addMonths, dayOfWeek, diffDays, fromDateKey } from './dates';
import type { DateKey, Recurrence } from './types';

/** Does this schedule occur on `date`? `startDate` bounds the first occurrence. */
export function occursOn(rule: Recurrence, date: DateKey, startDate?: DateKey): boolean {
  if (startDate && date < startDate) return false;
  switch (rule.kind) {
    case 'once':
      return rule.date === date;
    case 'daily':
      return true;
    case 'weekly':
      return rule.days.includes(dayOfWeek(date));
    case 'interval': {
      const n = diffDays(rule.startDate, date);
      return n >= 0 && rule.everyDays > 0 && n % rule.everyDays === 0;
    }
    case 'monthly': {
      const d = fromDateKey(date);
      const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      return d.getDate() === Math.min(rule.dayOfMonth, last);
    }
  }
}

/** Next date strictly after `after` on which the rule occurs, or null (one-off / none within a year). */
export function nextOccurrence(rule: Recurrence, after: DateKey): DateKey | null {
  if (rule.kind === 'once') return rule.date > after ? rule.date : null;
  if (rule.kind === 'monthly') {
    for (let i = 0; i <= 12; i++) {
      const candidate = addMonths(after, i);
      for (let d = 0; d < 31; d++) {
        const k = addDays(candidate.slice(0, 8) + '01', d);
        if (k > after && occursOn(rule, k)) return k;
      }
    }
    return null;
  }
  for (let i = 1; i <= 366; i++) {
    const k = addDays(after, i);
    if (occursOn(rule, k)) return k;
  }
  return null;
}

export type RecurrenceSummary =
  | { key: 'once'; date: DateKey }
  | { key: 'daily' }
  | { key: 'weekdays' }
  | { key: 'weekends' }
  | { key: 'weekly'; days: number[] }
  | { key: 'interval'; count: number }
  | { key: 'monthly'; day: number };

/** Structured description for i18n — the UI turns this into copy. */
export function summarize(rule: Recurrence): RecurrenceSummary {
  switch (rule.kind) {
    case 'once':
      return { key: 'once', date: rule.date };
    case 'daily':
      return { key: 'daily' };
    case 'weekly': {
      const days = [...rule.days].sort();
      if (days.join() === '1,2,3,4,5') return { key: 'weekdays' };
      if (days.join() === '0,6') return { key: 'weekends' };
      if (days.length === 7) return { key: 'daily' };
      return { key: 'weekly', days };
    }
    case 'interval':
      return rule.everyDays === 1 ? { key: 'daily' } : { key: 'interval', count: rule.everyDays };
    case 'monthly':
      return { key: 'monthly', day: rule.dayOfMonth };
  }
}
