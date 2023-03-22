/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dragd': "#39FF14",
        'dragd-alt': "#083300",
        'dragd-2': "#14AEFF",
        'dragd-2-secondary': "#00111A",
        'dragd-dark': "#071604"
      },
    },
  },
  plugins: [require('daisyui')],
}
