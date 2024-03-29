/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{md, mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
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
      fontSize: {
        base: "14px",
        h1: "130px",
        h2: "50px",
        h3: "40px",
        h4: "30px",
        h5: "20px"
      },
      colors: {
        primary: "#40CC92",
        text: "#4D5366",
        dark: "#05031A",
        body: "#FFFFFF",
        footer: "#FAFAFA",
        danger: "#F22F43"
      },
      fontFamily: {
        primary: ['var(--font-pingfang), Sans-Serif'],
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({ generateContainer: false }),
  ],
}
