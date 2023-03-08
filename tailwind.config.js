/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily:{
      Patua:"Patua One",
      Playfair:"Playfair Display",
      noto:"Noto Serif Toto",
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
