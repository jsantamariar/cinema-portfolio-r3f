const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textShadow: {
        sm: "0.1px 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0.1px 2px 4px var(--tw-shadow-color)",
        lg: "0.1px 8px 16px var(--tw-shadow-color)",
      },
      colors: {
        secondary: "#929292",
        tertiary: "#525252",
        "black-100": "#100d25",
        "black-200": "#090325",
        "black-300": "#141414",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #141414",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "black-pattern": "#141414",
        "hero-pattern": "url('/src/assets/herobg.png')",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") }
      );
    }),
  ],
};
