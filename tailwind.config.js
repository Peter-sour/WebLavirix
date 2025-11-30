/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <--- WAJIB DITAMBAHKAN AGAR TOMBOL BERFUNGSI!
  theme: {
    extend: {},
  },
  plugins: [],
}