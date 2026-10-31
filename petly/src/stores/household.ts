import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createId } from '@/core/id';
import type { Member, Role } from '@/core/types';
import { persistStorage, storeKey } from '@/lib/storage';

import { patch, upsert, without } from './collection';

export const SELF_ID = 'me';

interface HouseholdState {
  members: Member[];
  /** Who is using this device — attributed on every completion. */
  currentMemberId: string;
  addMember: (name: string, role: Role) => Member;
  updateMember: (id: string, changes: Partial<Member>) => void;
  removeMember: (id: string) => void;
  setSelfName: (name: string) => void;
  setCurrentMember: (id: string) => void;
  merge: (members: Member[]) => void;
  removeSample: () => void;
}

const self: Member = { id: SELF_ID, name: '', role: 'owner', isSelf: true, isSample: false };

export const useHousehold = create<HouseholdState>()(
  persist(
    (set) => ({
      members: [self],
      currentMemberId: SELF_ID,
      addMember: (name, role) => {
        const m: Member = { id: createId('mb-'), name, role, isSelf: false, isSample: false };
        set((s) => ({ members: [...s.members, m] }));
        return m;
      },
      updateMember: (id, changes) => set((s) => ({ members: patch(s.members, id, changes) })),
      removeMember: (id) =>
        set((s) => (id === SELF_ID ? s : { members: without(s.members, id), currentMemberId: s.currentMemberId === id ? SELF_ID : s.currentMemberId })),
      setSelfName: (name) => set((s) => ({ members: patch(s.members, SELF_ID, { name }) })),
      setCurrentMember: (id) => set((s) => (s.members.some((m) => m.id === id) ? { currentMemberId: id } : s)),
      merge: (members) => set((s) => ({ members: members.reduce(upsert, s.members) })),
      removeSample: () =>
        set((s) => {
          const members = s.members.filter((m) => !m.isSample);
          return { members, currentMemberId: members.some((m) => m.id === s.currentMemberId) ? s.currentMemberId : SELF_ID };
        }),
    }),
    { name: storeKey('household'), storage: persistStorage, version: 1 },
  ),
);
