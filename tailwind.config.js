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
        'dragd-secondary': "#14AEFF",
        'dragd-dark': "#071604"
      },
    },
  },
  plugins: [],
}
