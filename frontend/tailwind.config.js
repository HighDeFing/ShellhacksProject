/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        newfrank: ["New Frank", "sans-serif"],
      },
      colors: {
        "fiu-gold": "#FFCC00",
        "fiu-blue": "#081E3F",
      },
    },
  },
  plugins: [],
};
