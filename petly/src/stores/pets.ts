import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { createId } from '@/core/id';
import { resolveSelectedPet } from '@/core/pets';
import type { Pet } from '@/core/types';
import { persistStorage, storeKey } from '@/lib/storage';

import { patch, upsert, without } from './collection';

export type NewPet = Omit<Pet, 'id' | 'createdAt' | 'isSample'>;

export const emptyPet = (): NewPet => ({
  name: '',
  species: 'dog',
  breed: '',
  birthDate: null,
  sex: 'unknown',
  weightKg: null,
  colour: '',
  photoUri: null,
  neutered: null,
  microchip: null,
  allergies: [],
  conditions: [],
  behaviourNotes: '',
  feedingNotes: '',
  vetName: '',
  vetClinic: '',
  vetPhone: '',
});

interface PetsState {
  pets: Pet[];
  selectedPetId: string | null;
  addPet: (pet: NewPet) => Pet;
  updatePet: (id: string, changes: Partial<Pet>) => void;
  removePet: (id: string) => void;
  selectPet: (id: string) => void;
  merge: (pets: Pet[]) => void;
  removeSample: () => void;
}

export const usePets = create<PetsState>()(
  persist(
    (set) => ({
      pets: [],
      selectedPetId: null,
      addPet: (input) => {
        const pet: Pet = { ...input, id: createId('pet-'), isSample: false, createdAt: new Date().toISOString() };
        set((s) => ({ pets: [...s.pets, pet], selectedPetId: pet.id }));
        return pet;
      },
      updatePet: (id, changes) => set((s) => ({ pets: patch(s.pets, id, changes) })),
      removePet: (id) =>
        set((s) => {
          const pets = without(s.pets, id);
          return { pets, selectedPetId: resolveSelectedPet(pets, s.selectedPetId) };
        }),
      selectPet: (id) => set({ selectedPetId: id }),
      merge: (incoming) =>
        set((s) => {
          const pets = incoming.reduce(upsert, s.pets);
          return { pets, selectedPetId: resolveSelectedPet(pets, s.selectedPetId) };
        }),
      removeSample: () =>
        set((s) => {
          const pets = s.pets.filter((p) => !p.isSample);
          return { pets, selectedPetId: resolveSelectedPet(pets, s.selectedPetId) };
        }),
    }),
    { name: storeKey('pets'), storage: persistStorage, version: 1 },
  ),
);
