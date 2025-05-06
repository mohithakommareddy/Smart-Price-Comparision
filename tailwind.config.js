/**  @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff8800',
          dark: '#e67a00',
          light: '#ffa033'
        },
        secondary: {
          DEFAULT: '#102f70',
          dark: '#0c255a',
          light: '#1a3f8c'
        }
      }
    },
  },
  plugins: [],
};
 