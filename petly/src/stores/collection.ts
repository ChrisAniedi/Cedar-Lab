/** Shared immutable helpers for list-shaped slices. */
export type WithId = { id: string };

export const upsert = <T extends WithId>(list: T[], item: T): T[] =>
  list.some((x) => x.id === item.id) ? list.map((x) => (x.id === item.id ? item : x)) : [...list, item];

export const patch = <T extends WithId>(list: T[], id: string, changes: Partial<T>): T[] =>
  list.map((x) => (x.id === id ? { ...x, ...changes } : x));

export const without = <T extends WithId>(list: T[], id: string): T[] => list.filter((x) => x.id !== id);
