import { fromDateKey } from './dates';
import type { DateKey } from './types';

export type Age = { years: number; months: number };

export function ageOn(birthDate: DateKey, today: DateKey): Age {
  const b = fromDateKey(birthDate);
  const t = fromDateKey(today);
  let months = (t.getFullYear() - b.getFullYear()) * 12 + (t.getMonth() - b.getMonth());
  if (t.getDate() < b.getDate()) months -= 1;
  months = Math.max(0, months);
  return { years: Math.floor(months / 12), months: months % 12 };
}

/** Estimated birth date from an age in years (for "I only know roughly"). */
export function birthDateFromAge(years: number, today: DateKey): DateKey {
  const t = fromDateKey(today);
  const y = t.getFullYear() - Math.floor(years);
  const m = t.getMonth() - Math.round((years % 1) * 12);
  const d = new Date(y, m, 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-01`;
}
