/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fff1f1',
          100: '#ffe1e1',
          200: '#ffc7c7',
          300: '#ffa0a0',
          400: '#ff6b6b',
          500: '#ff4d4f',
          600: '#e52e30',
          700: '#c11d1f',
          800: '#9d1c1e',
          900: '#821c1f',
        },
        dark: {
          100: '#1f1f1f',
          200: '#1a1a1a',
          300: '#171717',
          400: '#121212',
          500: '#0d0d0d',
        },
        monad: {
          50: '#eafcf8',
          100: '#d0f7ef',
          200: '#a6ede0',
          300: '#6ddecb',
          400: '#36c7b0',
          500: '#1aac96',
          600: '#0f8b7a',
          700: '#0f6f63',
          800: '#115950',
          900: '#124a43',
        },
      },
      animation: {
        'float-up': 'float-up 3s ease-out forwards',
      },
      keyframes: {
        'float-up': {
          '0%': { transform: 'translateY(100%)', opacity: 1 },
          '100%': { transform: 'translateY(-100%)', opacity: 0 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};