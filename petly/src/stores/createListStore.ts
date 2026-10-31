import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createId } from '@/core/id';
import { persistStorage, storeKey } from '@/lib/storage';

import { patch, upsert, without } from './collection';

type Record_ = { id: string; petId: string; isSample: boolean };

export interface ListState<T extends Record_> {
  items: T[];
  add: (input: Omit<T, 'id' | 'isSample'>) => T;
  update: (id: string, changes: Partial<T>) => void;
  remove: (id: string) => void;
  merge: (items: T[]) => void;
  removeForPet: (petId: string) => void;
  removeSample: () => void;
}

/** A persisted slice for one pet-scoped record type. */
export function createListStore<T extends Record_>(slice: string, idPrefix: string) {
  return create<ListState<T>>()(
    persist(
      (set) => ({
        items: [],
        add: (input) => {
          const item = { ...input, id: createId(idPrefix), isSample: false } as T;
          set((s) => ({ items: [...s.items, item] }));
          return item;
        },
        update: (id, changes) => set((s) => ({ items: patch(s.items, id, changes) })),
        remove: (id) => set((s) => ({ items: without(s.items, id) })),
        merge: (items) => set((s) => ({ items: items.reduce(upsert, s.items) })),
        removeForPet: (petId) => set((s) => ({ items: s.items.filter((i) => i.petId !== petId) })),
        removeSample: () => set((s) => ({ items: s.items.filter((i) => !i.isSample) })),
      }),
      { name: storeKey(slice), storage: persistStorage, version: 1 },
    ),
  );
}
