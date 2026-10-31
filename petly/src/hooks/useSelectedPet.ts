import { usePets } from '@/stores/pets';

export function useSelectedPet() {
  const pets = usePets((s) => s.pets);
  const selectedId = usePets((s) => s.selectedPetId);
  return pets.find((p) => p.id === selectedId) ?? pets[0] ?? null;
}
