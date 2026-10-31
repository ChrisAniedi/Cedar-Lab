import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createId } from '@/core/id';
import { completeOccurrence, undoOccurrence, type ToggleResult } from '@/core/tasks';
import type { CareLogEntry, CareTask, DateKey } from '@/core/types';
import { persistStorage, storeKey } from '@/lib/storage';

import { patch, upsert, without } from './collection';

export type NewTask = Omit<CareTask, 'id' | 'createdAt' | 'isSample'>;

interface CareState {
  tasks: CareTask[];
  log: CareLogEntry[];
  addTask: (t: NewTask) => CareTask;
  updateTask: (id: string, changes: Partial<CareTask>) => void;
  removeTask: (id: string) => void;
  complete: (taskId: string, date: DateKey, by: string) => ToggleResult;
  undo: (taskId: string, date: DateKey, by: string) => ToggleResult;
  merge: (tasks: CareTask[], log: CareLogEntry[]) => void;
  removeForPet: (petId: string) => void;
  removeSample: () => void;
}

export const useCare = create<CareState>()(
  persist(
    (set, get) => {
      const apply = (fn: typeof completeOccurrence, taskId: string, date: DateKey, by: string): ToggleResult => {
        const { tasks, log } = get();
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return { ok: false, reason: 'notCompleted' };
        const res = fn(log, task, date, by, new Date().toISOString());
        if (res.ok) set({ log: [...log, { id: createId('log-'), ...res.entry }] });
        return res;
      };
      return {
        tasks: [],
        log: [],
        addTask: (input) => {
          const task: CareTask = { ...input, id: createId('task-'), isSample: false, createdAt: new Date().toISOString() };
          set((s) => ({ tasks: [...s.tasks, task] }));
          return task;
        },
        updateTask: (id, changes) => set((s) => ({ tasks: patch(s.tasks, id, changes) })),
        removeTask: (id) => set((s) => ({ tasks: without(s.tasks, id) })),
        complete: (taskId, date, by) => apply(completeOccurrence, taskId, date, by),
        undo: (taskId, date, by) => apply(undoOccurrence, taskId, date, by),
        merge: (tasks, log) => set((s) => ({ tasks: tasks.reduce(upsert, s.tasks), log: log.reduce(upsert, s.log) })),
        removeForPet: (petId) =>
          set((s) => ({ tasks: s.tasks.filter((t) => t.petId !== petId), log: s.log.filter((l) => l.petId !== petId) })),
        removeSample: () =>
          set((s) => {
            const tasks = s.tasks.filter((t) => !t.isSample);
            const ids = new Set(tasks.map((t) => t.id));
            return { tasks, log: s.log.filter((l) => ids.has(l.taskId)) };
          }),
      };
    },
    { name: storeKey('care'), storage: persistStorage, version: 1 },
  ),
);
