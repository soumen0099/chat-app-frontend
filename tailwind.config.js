/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "night"],
    darkMode: ["selector", "[data-theme]"],
  },
  plugins: [require("daisyui")],
}
