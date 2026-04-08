/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0d1a2e',
          800: '#0f2340',
          700: '#133158',
          600: '#1a4070',
        },
        gold: '#f59e0b',
        havico: {
          blue: '#1565C0',
          orange: '#E65100',
          navy: '#0d1a2e',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Arial', 'sans-serif'],
      }
    }
  },
  plugins: []
};
