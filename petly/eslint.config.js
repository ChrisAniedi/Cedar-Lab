// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  { ignores: ['dist/*', '.expo/*', 'node_modules/*'] },
  {
    // Every user-facing string lives in src/locales. No literal copy in JSX.
    files: ['src/**/*.tsx'],
    rules: {
      'react/jsx-no-literals': ['error', { noStrings: false, allowedStrings: ['·', '•', '/', '%', '+', '–', '—', ':'] }],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react-native',
              importNames: ['Text'],
              message: 'Use <Txt> from @/components/ui/Txt so text colour is resolved from the theme in JS.',
            },
          ],
        },
      ],
    },
  },
  {
    // Test fixtures may use literal strings.
    files: ['src/**/__tests__/**'],
    rules: { 'react/jsx-no-literals': 'off' },
  },
  {
    // The one place allowed to render the raw RN Text.
    files: ['src/components/ui/Txt.tsx'],
    rules: { 'no-restricted-imports': 'off' },
  },
  {
    // core/ is framework-free: no React, React Native or Expo.
    files: ['src/core/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['react', 'react-*', 'react/*'], message: 'core/ must stay framework-free.' },
            { group: ['react-native', 'react-native-*', 'react-native/*'], message: 'core/ must stay framework-free.' },
            { group: ['expo', 'expo-*', '@expo/*', 'nativewind', 'zustand', 'zustand/*', 'i18next'], message: 'core/ must stay framework-free.' },
            { group: ['@/components/*', '@/stores/*', '@/lib/*', '@/app/*'], message: 'core/ must not depend on app layers.' },
          ],
        },
      ],
    },
  },
]);
