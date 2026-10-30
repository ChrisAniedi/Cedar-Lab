import type { Config } from 'tailwindcss';

// Palette follows the Vanity Pass look (black / white / warm cream / sand,
// two-tone headings with a cool grey) with Camuh's logo blue as a quiet accent.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050605',
        cream: '#F5F2EC',
        sand: '#EAE3DD',
        mist: '#E6E5E3',
        smoke: '#9CA3AF',
        body: '#4B5563',
        brand: { DEFAULT: '#2E3092', 600: '#25277A', 50: '#EEEEF8' },
        sky: '#006CB5',
      },
      fontFamily: {
        sans: ['"Cabinet Grotesk"', 'var(--font-figtree)', 'system-ui', 'sans-serif'],
        display: ['var(--font-figtree)', '"Cabinet Grotesk"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Fluid giant display type, like the Vanity Pass hero words
        mega: ['clamp(2.6rem, 13.2vw, 13.5rem)', { lineHeight: '0.84', letterSpacing: '-0.02em' }],
        huge: ['clamp(2.25rem, 5vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
      },
      maxWidth: { content: '1200px' },
      boxShadow: {
        btn: '0 20px 25px -5px rgba(0,0,0,.18), 0 8px 10px -6px rgba(0,0,0,.12)',
        card: '0 30px 60px -20px rgba(0,0,0,.25)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        kenburns: { from: { transform: 'scale(1.08)' }, to: { transform: 'scale(1.0)' } },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(8px)' } },
        pop: { '0%': { transform: 'scale(.4)', opacity: '0' }, '70%': { transform: 'scale(1.12)', opacity: '1' }, '100%': { transform: 'scale(1)' } },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        kenburns: 'kenburns 14s ease-out forwards',
        bob: 'bob 2.2s ease-in-out infinite',
        pop: 'pop .6s cubic-bezier(.2,.8,.2,1) both',
      },
    },
  },
  plugins: [],
};
export default config;
