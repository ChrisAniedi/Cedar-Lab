import { addDays, compareKeys } from './dates';
import type { DateKey, WeightEntry } from './types';

export type Trend = {
  current: WeightEntry | null;
  previous: WeightEntry | null;
  deltaKg: number | null;
  deltaPct: number | null;
  direction: 'up' | 'down' | 'steady' | 'none';
};

const STEADY_PCT = 1;

export function sortByDate<T extends { date: DateKey }>(list: T[]): T[] {
  return [...list].sort((a, b) => compareKeys(a.date, b.date));
}

export function weightTrend(entries: WeightEntry[]): Trend {
  const sorted = sortByDate(entries);
  const current = sorted.at(-1) ?? null;
  const previous = sorted.at(-2) ?? null;
  if (!current || !previous) return { current, previous, deltaKg: null, deltaPct: null, direction: 'none' };
  const deltaKg = round(current.kg - previous.kg, 2);
  const deltaPct = round((deltaKg / previous.kg) * 100, 1);
  const direction = Math.abs(deltaPct) < STEADY_PCT ? 'steady' : deltaKg > 0 ? 'up' : 'down';
  return { current, previous, deltaKg, deltaPct, direction };
}

export function inRange<T extends { date: DateKey }>(list: T[], today: DateKey, days: number | null): T[] {
  if (days === null) return sortByDate(list);
  const from = addDays(today, -days);
  return sortByDate(list.filter((e) => e.date >= from && e.date <= today));
}

/**
 * A neutral description of a recorded change, for i18n. Never a diagnosis —
 * the UI always pairs it with "talk to your vet if you are concerned".
 */
export type ChangeObservation =
  | { key: 'notEnoughData' }
  | { key: 'steady'; days: number }
  | { key: 'changed'; direction: 'up' | 'down'; pct: number; days: number };

export function describeWeightChange(entries: WeightEntry[], today: DateKey, windowDays = 90): ChangeObservation {
  const recent = inRange(entries, today, windowDays);
  const first = recent[0];
  const last = recent.at(-1);
  if (!first || !last || first === last) return { key: 'notEnoughData' };
  const pct = round(((last.kg - first.kg) / first.kg) * 100, 1);
  const days = Math.max(1, Math.round((Date.parse(last.date) - Date.parse(first.date)) / 86_400_000));
  if (Math.abs(pct) < STEADY_PCT) return { key: 'steady', days };
  return { key: 'changed', direction: pct > 0 ? 'up' : 'down', pct: Math.abs(pct), days };
}

export function average(values: number[]): number | null {
  if (values.length === 0) return null;
  return round(values.reduce((a, b) => a + b, 0) / values.length, 1);
}

export function round(n: number, places: number): number {
  const f = 10 ** places;
  return Math.round(n * f) / f;
}
