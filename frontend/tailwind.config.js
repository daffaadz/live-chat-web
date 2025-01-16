/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '1': '#0098FF',
        '2': '#007ACC',
        '3': '#0065A9',
        '4': '#070738'
      },
      backgroundImage: {
        'laptop': "url('./src/assets/laptop.png')",
      },
    },
  },
  plugins: [],
}

