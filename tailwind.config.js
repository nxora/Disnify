/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}",
                "./App.jsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Roboto"', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif']
      }
    },
  },
  plugins: [],
}

