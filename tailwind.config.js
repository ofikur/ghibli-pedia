/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ghibli-bg': '#F4F1DE',
        'ghibli-text': '#433434',
        'ghibli-header': '#E0AFA0',
        'ghibli-green': '#5A7247',
        'ghibli-blue': '#81C3D7',
        'ghibli-deep-blue': '#0F1A2D',
      },
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}