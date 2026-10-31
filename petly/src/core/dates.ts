import type { DateKey, TimeKey } from './types';

const pad = (n: number) => String(n).padStart(2, '0');

/** Local calendar date of a Date as `YYYY-MM-DD`. */
export function toDateKey(d: Date): DateKey {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Parse `YYYY-MM-DD` as local midnight. */
export function fromDateKey(key: DateKey): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function isDateKey(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return toDateKey(fromDateKey(value)) === value;
}

export function isTimeKey(value: string): boolean {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function addDays(key: DateKey, days: number): DateKey {
  const d = fromDateKey(key);
  d.setDate(d.getDate() + days);
  return toDateKey(d);
}

export function addMonths(key: DateKey, months: number): DateKey {
  const d = fromDateKey(key);
  const day = d.getDate();
  d.setDate(1);
  d.setMonth(d.getMonth() + months);
  const last = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  d.setDate(Math.min(day, last));
  return toDateKey(d);
}

/** Whole days from a to b (b - a). DST-safe. */
export function diffDays(a: DateKey, b: DateKey): number {
  const ua = Date.UTC(...ymd(a));
  const ub = Date.UTC(...ymd(b));
  return Math.round((ub - ua) / 86_400_000);
}

function ymd(key: DateKey): [number, number, number] {
  const [y, m, d] = key.split('-').map(Number);
  return [y ?? 1970, (m ?? 1) - 1, d ?? 1];
}

export function dayOfWeek(key: DateKey): number {
  return fromDateKey(key).getDay();
}

/** Monday-first week containing the date (7 keys). */
export function weekOf(key: DateKey, weekStartsOn: 0 | 1 = 1): DateKey[] {
  const offset = (dayOfWeek(key) - weekStartsOn + 7) % 7;
  const start = addDays(key, -offset);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

/** All the days in a month grid (Monday-first, padded with adjacent days). */
export function monthGrid(year: number, month: number, weekStartsOn: 0 | 1 = 1): DateKey[] {
  const first = toDateKey(new Date(year, month, 1));
  const start = weekOf(first, weekStartsOn)[0] as DateKey;
  const lastDay = toDateKey(new Date(year, month + 1, 0));
  const end = weekOf(lastDay, weekStartsOn)[6] as DateKey;
  const days = diffDays(start, end) + 1;
  return Array.from({ length: days }, (_, i) => addDays(start, i));
}

export function timeToMinutes(time: TimeKey): number {
  const [h, m] = time.split(':').map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export function nowTimeKey(d: Date): TimeKey {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Combine a local date + time into a Date. */
export function atLocal(date: DateKey, time: TimeKey): Date {
  const d = fromDateKey(date);
  const [h, m] = time.split(':').map(Number);
  d.setHours(h ?? 0, m ?? 0, 0, 0);
  return d;
}

export function compareKeys(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}
