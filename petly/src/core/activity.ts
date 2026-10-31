import type { CareLogEntry, CareTask, DoseLog, ID, Medication, Timestamp, Vaccination, VetVisit, WeightEntry } from './types';

/** Recent activity is derived from the records themselves — no separate log to drift. */
export type ActivityItem =
  | { kind: 'care'; id: ID; petId: ID; at: Timestamp; by: ID; title: string; category: CareTask['category'] }
  | { kind: 'dose'; id: ID; petId: ID; at: Timestamp; by: ID; title: string; status: DoseLog['status'] }
  | { kind: 'weight'; id: ID; petId: ID; at: Timestamp; kg: number }
  | { kind: 'visit'; id: ID; petId: ID; at: Timestamp; title: string }
  | { kind: 'vaccination'; id: ID; petId: ID; at: Timestamp; title: string };

export function recentActivity(
  input: {
    careLog: CareLogEntry[];
    tasks: CareTask[];
    doses: DoseLog[];
    medications: Medication[];
    weights: WeightEntry[];
    visits: VetVisit[];
    vaccinations: Vaccination[];
  },
  opts: { petId?: ID | null; limit?: number; today: string },
): ActivityItem[] {
  const tasks = new Map(input.tasks.map((t) => [t.id, t]));
  const meds = new Map(input.medications.map((m) => [m.id, m]));
  const items: ActivityItem[] = [];

  for (const e of input.careLog) {
    const t = tasks.get(e.taskId);
    if (e.action !== 'completed' || !t) continue;
    items.push({ kind: 'care', id: e.id, petId: e.petId, at: e.at, by: e.by, title: t.title, category: t.category });
  }
  for (const d of input.doses) {
    const m = meds.get(d.medicationId);
    if (m) items.push({ kind: 'dose', id: d.id, petId: d.petId, at: d.at, by: d.by, title: m.name, status: d.status });
  }
  for (const w of input.weights) items.push({ kind: 'weight', id: w.id, petId: w.petId, at: `${w.date}T12:00:00`, kg: w.kg });
  for (const v of input.visits)
    if (v.date <= opts.today) items.push({ kind: 'visit', id: v.id, petId: v.petId, at: `${v.date}T${v.time ?? '09:00'}:00`, title: v.reason });
  for (const v of input.vaccinations)
    items.push({ kind: 'vaccination', id: v.id, petId: v.petId, at: `${v.administeredOn}T10:00:00`, title: v.name });

  return items
    .filter((i) => !opts.petId || i.petId === opts.petId)
    .sort((a, b) => b.at.localeCompare(a.at))
    .slice(0, opts.limit ?? 20);
}
