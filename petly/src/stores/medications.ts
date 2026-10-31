import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createId } from '@/core/id';
import type { DateKey, DoseLog, Medication, TimeKey } from '@/core/types';
import { persistStorage, storeKey } from '@/lib/storage';

import { patch, upsert, without } from './collection';

export type NewMedication = Omit<Medication, 'id' | 'createdAt' | 'isSample'>;

interface MedicationsState {
  medications: Medication[];
  doses: DoseLog[];
  add: (m: NewMedication) => Medication;
  update: (id: string, changes: Partial<Medication>) => void;
  remove: (id: string) => void;
  /** One log per scheduled dose — a second log for the same slot is rejected. */
  logDose: (medicationId: string, date: DateKey, time: TimeKey, status: DoseLog['status'], by: string) => boolean;
  merge: (m: Medication[], d: DoseLog[]) => void;
  removeForPet: (petId: string) => void;
  removeSample: () => void;
}

export const useMedications = create<MedicationsState>()(
  persist(
    (set, get) => ({
      medications: [],
      doses: [],
      add: (input) => {
        const m: Medication = { ...input, id: createId('med-'), isSample: false, createdAt: new Date().toISOString() };
        set((s) => ({ medications: [...s.medications, m] }));
        return m;
      },
      update: (id, changes) => set((s) => ({ medications: patch(s.medications, id, changes) })),
      remove: (id) => set((s) => ({ medications: without(s.medications, id), doses: s.doses.filter((d) => d.medicationId !== id) })),
      logDose: (medicationId, date, time, status, by) => {
        const { medications, doses } = get();
        const med = medications.find((m) => m.id === medicationId);
        if (!med) return false;
        if (doses.some((d) => d.medicationId === medicationId && d.date === date && d.time === time)) return false;
        const dose: DoseLog = { id: createId('dose-'), medicationId, petId: med.petId, date, time, status, by, at: new Date().toISOString() };
        set({ doses: [...doses, dose] });
        return true;
      },
      merge: (m, d) => set((s) => ({ medications: m.reduce(upsert, s.medications), doses: d.reduce(upsert, s.doses) })),
      removeForPet: (petId) =>
        set((s) => ({ medications: s.medications.filter((m) => m.petId !== petId), doses: s.doses.filter((d) => d.petId !== petId) })),
      removeSample: () =>
        set((s) => {
          const medications = s.medications.filter((m) => !m.isSample);
          const ids = new Set(medications.map((m) => m.id));
          return { medications, doses: s.doses.filter((d) => ids.has(d.medicationId)) };
        }),
    }),
    { name: storeKey('medications'), storage: persistStorage, version: 1 },
  ),
);
