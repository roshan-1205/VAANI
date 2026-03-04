/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Poppins', 'sans-serif'], // Map Montserrat to Poppins
        display: ['Poppins', 'sans-serif'],
      },
      colors: {
        dark: '#01070f',
        'dark-light': '#0a1628',
        primary: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
}
