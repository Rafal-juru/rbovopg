/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-black': '#1f1811',
        'brand-gray': '#6f6559',
        'brand-gold': '#d8be8a',
        'brand-gold-deep': '#a88449',
        'brand-cream': '#f8f1e8',
        'bg-light': '#f6eee5',
        'text-main': '#1A1A1A',
      },
      fontFamily: {
        title: ['Arial', 'sans-serif'],
        display: ['PlayaDelAmor', 'serif'],
        body: ['Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
