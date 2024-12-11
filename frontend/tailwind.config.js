/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainClr': '#B22222',
        'secClr': '#000000',
        'thrdClr': '#E6BE00',
        'anyClr': '#F5F5F5',
        'bgClr': '#212121'
      },
      fontFamily: {
        'main-bebas-neue': ['Bebas Neue', 'sans-serif'],
        'sec-oswald': ['Oswald', 'sans-serif'],
        'thrd-roboto': ['Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}