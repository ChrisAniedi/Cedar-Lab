import type { Pet, Species } from './types';

export function filterPets(pets: Pet[], query: string, species: Species | 'all'): Pet[] {
  const q = query.trim().toLowerCase();
  return pets.filter(
    (p) =>
      (species === 'all' || p.species === species) &&
      (!q || p.name.toLowerCase().includes(q) || p.breed.toLowerCase().includes(q)),
  );
}

export function speciesPresent(pets: Pet[]): Species[] {
  return [...new Set(pets.map((p) => p.species))];
}

/** Keep a valid selection when pets change (deleted pet, first pet added). */
export function resolveSelectedPet(pets: Pet[], selectedId: string | null): string | null {
  if (selectedId && pets.some((p) => p.id === selectedId)) return selectedId;
  return pets[0]?.id ?? null;
}
