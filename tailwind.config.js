/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Raleway', 'sans-serif'],
      },
      colors: {
        amber: {
          800: '#8B4513', // Custom amber/brown shade for furniture theme
          900: '#6B3208',
        }
      }
    },
  },
  plugins: [],
};