import { usePets } from '@/stores/pets';

/** Map of petId → pet, for labelling records with their pet. */
export function usePetLookup() {
  const pets = usePets((s) => s.pets);
  const byId = new Map(pets.map((p) => [p.id, p]));
  return (id: string) => byId.get(id);
}
