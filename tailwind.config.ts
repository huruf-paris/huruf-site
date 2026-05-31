import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night: '#0D1B2A',
        'night-deep': '#111D2B',
        gold: '#D4AF37',
        'gold-dark': '#8B6914',
        pearl: '#F8F4EE',
        teal: '#4A9BA8',
      },
      fontFamily: {
        playfair: ['var(--font-playfair)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        amiri: ['var(--font-amiri)', 'serif'],
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(105deg, transparent 40%, rgba(212,175,55,0.4) 50%, transparent 60%)',
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'draw-line': 'drawLine 1.2s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        drawLine: {
          from: { strokeDashoffset: '300' },
          to: { strokeDashoffset: '0' },
        },
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [],
}

export default config
