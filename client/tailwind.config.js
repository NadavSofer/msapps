/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customGrey: '#212121',
        customBlue: '#087BC8'
      }
    },
  },
  plugins: [],
}