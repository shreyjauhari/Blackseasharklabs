/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          black: '#05070a',
          dark: '#0b0f17',
          panel: '#0d121b',
          border: '#1c2433',
          'border-hover': '#2a3a52',
        },
        accent: {
          cyan: '#00bcff',
          'cyan-dim': '#0a7ea8',
          coral: '#ff5d8f',
          'coral-dim': '#a83d5f',
        },
        ink: {
          primary: '#ffffff',
          secondary: '#8a99ad',
          muted: '#5a6878',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.7s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(28,36,51,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(28,36,51,0.4) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
