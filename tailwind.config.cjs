/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: ["./src/**/*.{ts,tsx}"],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          gray: "#1b1e21",
          lightGray: "#5E5B56",
          offWhite: "#EDE9E1",
          cream: "#E6DCCC",
          actionBlue: "#0858A3",
          hoverBlue: "#11ADDE",
          subtleBlue: "#78ADDE",
          lightBlue: "#CCE1F2",
        },
      },
    },
    fontFamily: {
      body: ["Work Sans", "sans-serif"],
      heading: ["Changa One", "sans-serif"],
    },
    animation: {
      "fade-in-down": "fade-in-down 0.5s ease-out",
      "fade-in": "fade-in 0.2s ease-out",
      "fade-in-delay": "fade-in-delay 1s ease-out",
    },
  },
  plugins: [
    require("prettier-plugin-tailwindcss"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/line-clamp"),
  ],
};
