import Storage from 'expo-sqlite/kv-store';
import { createJSONStorage, type StateStorage } from 'zustand/middleware';

/**
 * Persistence for Zustand slices: expo-sqlite/kv-store (runs in Expo Go,
 * unlike MMKV). The sync API lets slices hydrate before first render, so
 * there is no flash of empty state.
 */
const kv: StateStorage = {
  getItem: (key) => Storage.getItemSync(key),
  setItem: (key, value) => Storage.setItemSync(key, value),
  removeItem: (key) => {
    Storage.removeItemSync(key);
  },
};

export const persistStorage = createJSONStorage(() => kv);

/** Namespaced key per slice: one persisted slice per concern. */
export const storeKey = (slice: string) => `petly.${slice}.v1`;
