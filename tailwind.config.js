/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Helvetica', 'Arial', 'sans-serif'],
      serif: ['Georgia', 'serif'],
      custom: ['Custom Font', 'sans-serif'],
    },
    extend: {
      textColor: {
        'custom-red': 'rgba(175, 47, 47, 0.15)',
      },
     
    },
  },
  plugins: [],
}