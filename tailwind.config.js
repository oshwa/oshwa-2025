/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  content: [],
  theme: {
    extend: {
      // custom breakpoint
      screens: {
        xs: { raw: '(max-width: 640px)' },
        // => @media (min-height: 800px) { ... }
      },
    },
  },
  plugins: [],
};
