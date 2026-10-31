import { diffDays } from './dates';
import { occursOn } from './recurrence';
import type { DateKey, DoseLog, Medication, Reminder, Vaccination } from './types';

export const DUE_SOON_DAYS = 30;

export type VaccinationStatus = 'overdue' | 'dueSoon' | 'upToDate' | 'noBooster';

export function vaccinationStatus(v: Vaccination, today: DateKey): VaccinationStatus {
  if (!v.nextDueOn) return 'noBooster';
  const days = diffDays(today, v.nextDueOn);
  if (days < 0) return 'overdue';
  if (days <= DUE_SOON_DAYS) return 'dueSoon';
  return 'upToDate';
}

/** Only the latest record per vaccine name matters for "what is due". */
export function currentVaccinations(list: Vaccination[]): Vaccination[] {
  const latest = new Map<string, Vaccination>();
  for (const v of list) {
    const key = `${v.petId}:${v.name.trim().toLowerCase()}`;
    const prev = latest.get(key);
    if (!prev || v.administeredOn > prev.administeredOn) latest.set(key, v);
  }
  return [...latest.values()];
}

export function isMedicationActive(m: Medication, today: DateKey): boolean {
  return m.startDate <= today && (!m.endDate || m.endDate >= today);
}

export function medicationStatus(m: Medication, today: DateKey): 'active' | 'scheduled' | 'completed' {
  if (m.startDate > today) return 'scheduled';
  if (m.endDate && m.endDate < today) return 'completed';
  return 'active';
}

/** Next scheduled dose at or after now, searching up to 60 days. */
export function nextDose(m: Medication, now: { date: DateKey; time: string }): { date: DateKey; time: string } | null {
  if (m.times.length === 0) return null;
  const times = [...m.times].sort();
  for (let i = 0; i <= 60; i++) {
    const d = new Date(now.date + 'T00:00:00');
    d.setDate(d.getDate() + i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    if (key < m.startDate) continue;
    if (m.endDate && key > m.endDate) return null;
    if (!occursOn(m.recurrence, key)) continue;
    for (const t of times) if (i > 0 || t >= now.time) return { date: key, time: t };
  }
  return null;
}

export type PetHealthStatus = 'attention' | 'upcoming' | 'good';

/** Coarse status for badges. Describes records, never a medical judgement. */
export function petHealthStatus(input: {
  vaccinations: Vaccination[];
  reminders: Reminder[];
  today: DateKey;
}): PetHealthStatus {
  const current = currentVaccinations(input.vaccinations).map((v) => vaccinationStatus(v, input.today));
  const openReminders = input.reminders.filter((r) => !r.completedAt && !r.dismissedAt);
  if (current.includes('overdue') || openReminders.some((r) => r.dueDate < input.today)) return 'attention';
  if (current.includes('dueSoon') || openReminders.some((r) => diffDays(input.today, r.dueDate) <= 7)) return 'upcoming';
  return 'good';
}

/** Scheduled dose slots for one day, with any logged outcome. */
export function dosesForDay(m: Medication, doses: DoseLog[], date: DateKey): { time: string; log: DoseLog | null }[] {
  if (date < m.startDate || (m.endDate && date > m.endDate) || !occursOn(m.recurrence, date)) return [];
  return [...m.times].sort().map((time) => ({
    time,
    log: doses.find((d) => d.medicationId === m.id && d.date === date && d.time === time) ?? null,
  }));
}
