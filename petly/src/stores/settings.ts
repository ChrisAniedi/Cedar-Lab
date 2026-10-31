import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { EMERGENCY_FIELDS, type EmergencyField } from '@/core/documents';
import type { Currency, ThemePreference, TimeFormat, UnitSystem } from '@/core/types';
import { defaultUnitSystem } from '@/core/units';
import { deviceRegion, deviceUses24h } from '@/lib/i18n';
import { persistStorage, storeKey } from '@/lib/storage';

export interface NotificationPrefs {
  enabled: boolean;
  leadMinutes: number;
  care: boolean;
  medication: boolean;
  vaccination: boolean;
  appointments: boolean;
}

interface SettingsState {
  onboardingComplete: boolean;
  usingSampleData: boolean;
  name: string;
  country: string;
  theme: ThemePreference;
  units: UnitSystem;
  timeFormat: TimeFormat;
  currency: Currency;
  notifications: NotificationPrefs;
  emergencyContact: { name: string; phone: string };
  emergencyFields: EmergencyField[];
  set: (changes: Partial<Omit<SettingsState, 'set' | 'setNotifications' | 'reset'>>) => void;
  setNotifications: (changes: Partial<NotificationPrefs>) => void;
  reset: () => void;
}

const region = deviceRegion();

const initial = {
  onboardingComplete: false,
  usingSampleData: false,
  name: '',
  country: region ?? '',
  theme: 'system' as ThemePreference,
  units: defaultUnitSystem(region),
  timeFormat: (deviceUses24h() ? '24h' : '12h') as TimeFormat,
  currency: (region === 'GB' ? 'GBP' : region === 'CA' ? 'CAD' : region === 'AU' ? 'AUD' : region === 'NZ' ? 'NZD' : ['DE', 'FR', 'ES', 'IT', 'NL', 'IE', 'PT', 'BE', 'AT', 'FI'].includes(region ?? '') ? 'EUR' : 'USD') as Currency,
  notifications: { enabled: true, leadMinutes: 60, care: true, medication: true, vaccination: true, appointments: true },
  emergencyContact: { name: '', phone: '' },
  emergencyFields: [...EMERGENCY_FIELDS].filter((f) => f !== 'microchip'),
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...initial,
      set: (changes) => set(changes),
      setNotifications: (changes) => set((s) => ({ notifications: { ...s.notifications, ...changes } })),
      reset: () => set(initial),
    }),
    { name: storeKey('settings'), storage: persistStorage, version: 1 },
  ),
);
