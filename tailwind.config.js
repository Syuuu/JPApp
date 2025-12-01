/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff0f4',
          100: '#ffe2eb',
          200: '#ffc7d6',
          300: '#ff9db6',
          400: '#ff6a93',
          500: '#ff3f75',
          600: '#ed1d5c',
          700: '#c2134b',
          800: '#a11342',
          900: '#870f39',
        },
        lavender: '#ede9fe',
        sky: '#e0f2fe'
      }
    },
  },
  plugins: [],
};
