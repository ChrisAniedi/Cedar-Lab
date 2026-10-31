import type { DateKey, Medication, Vaccination, VetVisit } from './types';

export type TimelineEntry =
  | { kind: 'visit'; id: string; date: DateKey; visit: VetVisit }
  | { kind: 'vaccination'; id: string; date: DateKey; vaccination: Vaccination }
  | { kind: 'prescription'; id: string; date: DateKey; medication: Medication };

/** Chronological medical history, newest first. Future visits are excluded. */
export function medicalTimeline(
  input: { visits: VetVisit[]; vaccinations: Vaccination[]; medications: Medication[] },
  today: DateKey,
): TimelineEntry[] {
  const entries: TimelineEntry[] = [
    ...input.visits.filter((v) => v.date <= today).map((visit) => ({ kind: 'visit' as const, id: visit.id, date: visit.date, visit })),
    ...input.vaccinations.map((vaccination) => ({ kind: 'vaccination' as const, id: vaccination.id, date: vaccination.administeredOn, vaccination })),
    ...input.medications
      .filter((m) => m.startDate <= today)
      .map((medication) => ({ kind: 'prescription' as const, id: medication.id, date: medication.startDate, medication })),
  ];
  return entries.sort((a, b) => b.date.localeCompare(a.date) || a.kind.localeCompare(b.kind));
}
