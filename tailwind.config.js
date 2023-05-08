/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './modules/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefbf3',
          100: '#d6f5e1',
          200: '#b0eac7',
          300: '#7cd9a8',
          400: '#3db278',
          500: '#24a569',
          600: '#168553',
          700: '#126a45',
          800: '#115438',
          900: '#0f4530',
          950: '#07271b'
        }
      }
    }
  },
  plugins: []
};
