import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

/**
 * Secrets go here, never in the kv store. Keychain / Keystore on device.
 * expo-secure-store has no web implementation, so web falls back to memory
 * (nothing secret is persisted in a browser).
 */
const memory = new Map<string, string>();

export const SECURE_KEYS = {
  appLock: 'petly.appLock',
} as const;

export async function getSecret(key: string): Promise<string | null> {
  if (Platform.OS === 'web') return memory.get(key) ?? null;
  return SecureStore.getItemAsync(key);
}

export async function setSecret(key: string, value: string): Promise<void> {
  if (Platform.OS === 'web') {
    memory.set(key, value);
    return;
  }
  await SecureStore.setItemAsync(key, value);
}

export async function deleteSecret(key: string): Promise<void> {
  if (Platform.OS === 'web') {
    memory.delete(key);
    return;
  }
  await SecureStore.deleteItemAsync(key);
}
