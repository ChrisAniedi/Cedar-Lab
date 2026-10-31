/**
 * Colours are CSS variables set at the app root from src/core/theme/tokens.ts,
 * so one class (e.g. `bg-surface`) follows light, dark and system.
 * Never use `dark:` variants. Text colour is NOT set with classes — use <Txt>.
 */
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: v('background'),
        surface: v('surface'),
        'surface-muted': v('surface-muted'),
        border: v('border'),
        primary: v('primary'),
        'primary-soft': v('primary-soft'),
        secondary: v('secondary'),
        accent: v('accent'),
        'accent-soft': v('accent-soft'),
        success: v('success'),
        'success-soft': v('success-soft'),
        warning: v('warning'),
        'warning-soft': v('warning-soft'),
        danger: v('danger'),
        'danger-soft': v('danger-soft'),
      },
      borderRadius: { card: '16px', field: '12px' },
      maxWidth: { content: '1120px' },
    },
  },
  plugins: [],
};
