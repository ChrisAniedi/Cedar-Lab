import { fromDateKey, timeToMinutes } from './dates';
import type { Currency, DateKey, TimeFormat, TimeKey } from './types';

/** Locale-aware formatting via Intl. Framework-free. */

export type DateStyle = 'short' | 'medium' | 'long' | 'weekday' | 'dayMonth' | 'weekdayShort' | 'dayNumber' | 'monthYear';

const DATE_OPTIONS: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  short: { day: 'numeric', month: 'short' },
  medium: { day: 'numeric', month: 'short', year: 'numeric' },
  long: { weekday: 'long', day: 'numeric', month: 'long' },
  weekday: { weekday: 'long' },
  weekdayShort: { weekday: 'short' },
  dayMonth: { day: 'numeric', month: 'long' },
  dayNumber: { day: 'numeric' },
  monthYear: { month: 'long', year: 'numeric' },
};

export function formatDate(key: DateKey, locale: string, style: DateStyle = 'medium'): string {
  try {
    return new Intl.DateTimeFormat(locale, DATE_OPTIONS[style]).format(fromDateKey(key));
  } catch {
    return key;
  }
}

export function formatTime(time: TimeKey, format: TimeFormat): string {
  const mins = timeToMinutes(time);
  const h = Math.floor(mins / 60);
  const m = String(mins % 60).padStart(2, '0');
  if (format === '24h') return `${String(h).padStart(2, '0')}:${m}`;
  const suffix = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m} ${suffix}`;
}

export function formatMoney(amount: number, currency: Currency, locale: string): string {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}

export function formatNumber(n: number, locale: string, maxFractionDigits = 1): string {
  try {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: maxFractionDigits }).format(n);
  } catch {
    return String(n);
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return ((parts[0]?.[0] ?? '') + (parts.length > 1 ? (parts.at(-1)?.[0] ?? '') : '')).toUpperCase() || '?';
}

export type GreetingKey = 'morning' | 'afternoon' | 'evening';
export function greetingFor(hour: number): GreetingKey {
  if (hour < 12) return 'morning';
  if (hour < 18) return 'afternoon';
  return 'evening';
}
