/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#003145",
        Slatetxt: '#FFFFFF',
        veryDarkBg: '#002A3B',
        card: '#F8F9FD',
        explore: '#002A3B',
        hackathon: '#003145',
      },
      keyframes: {
        rotate: {
          to: { transform: 'rotate(1turn)' },
        },
      },
      animation: {
        spinCustom: 'rotate 1.5s linear infinite',
      },
    },
  },
  plugins: [],
};