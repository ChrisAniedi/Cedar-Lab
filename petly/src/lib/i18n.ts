import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';

export const resources = { en: { translation: en } } as const;

export const deviceLocale = () => getLocales()[0]?.languageTag ?? 'en-US';
export const deviceRegion = () => getLocales()[0]?.regionCode ?? null;
export const deviceUses24h = () => {
  try {
    return !new Intl.DateTimeFormat(deviceLocale(), { hour: 'numeric' }).resolvedOptions().hour12;
  } catch {
    return false;
  }
};

const i18n = createInstance();

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false,
  initAsync: false,
});

export default i18n;
