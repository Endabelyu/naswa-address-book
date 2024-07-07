/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        primary: '#6987c9',
      },
      boxShadow: {
        sideright: ' 2px 0px 2px 0px rgba(0,0,0,0.75)',
        sidebot: ' box-shadow: 0px 6px 7px 0px rgba(0,0,0,0.75)',
      },
    },
  },
  plugins: [],
};
