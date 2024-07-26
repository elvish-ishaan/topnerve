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
        dark:{
          main: "#070F2B",
        },
        btn:{
          main: "#2563EB",
          lmain: "#737373"
        }
      }
    },
  },
  plugins: [],
}