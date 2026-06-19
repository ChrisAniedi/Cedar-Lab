import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#08090A', bg1: '#0D0E10', bg2: '#141518', bg3: '#1B1D21',
        ink: '#F5F6F7', 'ink-2': '#A6ABB2', 'ink-3': '#71767E',
        acc: '#C7F750', 'acc-2': '#D6FF6E', 'acc-deep': '#9FCB33', 'acc-ink': '#0B1300',
      },
      fontFamily: {
        serif: ['"Bricolage Grotesque"', 'serif'],
        sans: ['"Hanken Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: { card: '14px', lg: '22px' },
      maxWidth: { content: '1200px' },
    },
  },
  plugins: [],
};
export default config;
