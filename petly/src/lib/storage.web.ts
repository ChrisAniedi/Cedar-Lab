import { createJSONStorage, type StateStorage } from 'zustand/middleware';

/**
 * Web build only. expo-sqlite on web needs WASM plus cross-origin isolation
 * headers (COOP/COEP), which a plain static host doesn't send. localStorage
 * keeps the same sync semantics. Native (iOS/Android/Expo Go) uses
 * storage.ts → expo-sqlite/kv-store.
 */
const kv: StateStorage = {
  getItem: (key) => (typeof localStorage === 'undefined' ? null : localStorage.getItem(key)),
  setItem: (key, value) => {
    if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
  },
  removeItem: (key) => {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
  },
};

export const persistStorage = createJSONStorage(() => kv);

export const storeKey = (slice: string) => `petly.${slice}.v1`;
