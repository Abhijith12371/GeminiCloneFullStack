/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',  // Enables dark mode using the 'dark' class on <html> or <body>
  content: [
    "./index.html",  // Include your HTML file
    "./src/**/*.{js,ts,jsx,tsx}",  // Include your source files for JS, JSX, TS, and TSX
  ],
  theme: {
    extend: {},  // You can add custom theme extensions here if needed
  },
  plugins: [],  // Add any Tailwind plugins if necessary
}
