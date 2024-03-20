/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    './src/content/**/*.{md, mdx}',
  ],
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        primary: "#ffffff",
        text: "#747272",
        dark: "#747272",
        cred: "#FD2C2F",
        body: "#000000"
      },
      fontFamily: {
        primary: ['var(--font-pingfang)'],
        secondary: ['var(--font-alimama)', 'MS Gothic', 'Simsun'],
        title: ['var(--font-title)', 'var(--font-pingfang)','MS Gothic', 'Simsun']
      }
    },
  },
  plugins: [],
};
