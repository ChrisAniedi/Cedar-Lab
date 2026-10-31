import { usePets } from '@/stores/pets';

/** Pet for a new record: explicit param, else the selected pet, else the first. */
export function useDefaultPetId(param?: string | string[]) {
  const pets = usePets((s) => s.pets);
  const selected = usePets((s) => s.selectedPetId);
  const p = Array.isArray(param) ? param[0] : param;
  if (p && pets.some((x) => x.id === p)) return p;
  if (selected && pets.some((x) => x.id === selected)) return selected;
  return pets[0]?.id ?? null;
}
