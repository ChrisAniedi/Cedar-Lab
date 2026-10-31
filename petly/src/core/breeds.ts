import type { Species } from './types';

/** Common breeds for search. Custom entries are always allowed. */
export const BREEDS: Record<Species, string[]> = {
  dog: [
    'Mixed breed', 'Labrador Retriever', 'Golden Retriever', 'French Bulldog', 'German Shepherd', 'Bulldog', 'Poodle',
    'Beagle', 'Rottweiler', 'Dachshund', 'Cocker Spaniel', 'Border Collie', 'Boxer', 'Shih Tzu', 'Siberian Husky',
    'Pembroke Welsh Corgi', 'Cavalier King Charles Spaniel', 'Staffordshire Bull Terrier', 'Jack Russell Terrier',
    'Yorkshire Terrier', 'Australian Shepherd', 'Cockapoo', 'Labradoodle', 'Chihuahua', 'Pug', 'Whippet', 'Greyhound',
  ],
  cat: [
    'Domestic Shorthair', 'Domestic Longhair', 'British Shorthair', 'Maine Coon', 'Ragdoll', 'Siamese', 'Bengal',
    'Persian', 'Sphynx', 'Scottish Fold', 'Norwegian Forest Cat', 'Russian Blue', 'Abyssinian', 'Burmese',
  ],
  bird: ['Budgerigar', 'Cockatiel', 'African Grey', 'Lovebird', 'Canary', 'Conure', 'Cockatoo', 'Macaw', 'Finch'],
  rabbit: ['Mixed breed', 'Holland Lop', 'Netherland Dwarf', 'Mini Rex', 'Lionhead', 'Flemish Giant', 'Dutch', 'English Lop'],
  fish: ['Goldfish', 'Betta', 'Guppy', 'Neon Tetra', 'Angelfish', 'Koi', 'Molly', 'Platy'],
  reptile: ['Leopard Gecko', 'Bearded Dragon', 'Corn Snake', 'Ball Python', 'Crested Gecko', 'Red-eared Slider', 'Tortoise'],
  other: [],
};

export function searchBreeds(species: Species, query: string, limit = 8): string[] {
  const q = query.trim().toLowerCase();
  const list = BREEDS[species];
  if (!q) return list.slice(0, limit);
  const starts = list.filter((b) => b.toLowerCase().startsWith(q));
  const contains = list.filter((b) => !b.toLowerCase().startsWith(q) && b.toLowerCase().includes(q));
  return [...starts, ...contains].slice(0, limit);
}
