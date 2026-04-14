/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#000000',
        'brand-gray': '#8E8E8E',
        'bg-light': '#F0F1EB',
        'text-main': '#1A1A1A',
      },
      fontFamily: {
        title: ['PlayaDelAmor', 'serif'],
        body: ['Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
