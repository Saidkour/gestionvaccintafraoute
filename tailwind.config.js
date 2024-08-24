/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      extend: {
        fill: (theme) => ({
          primary: theme("colors.primary"),
        }),
      },

      variants: {
        extend: {
          fill: ["group-hover"],
        },
      },
      colors: {
        // custom colors
        primary: "#0192bc",
        secondary: "#44F2C9",
        "semi-gray": "#749cad",
        "semi-white": "#f4f9f9",
        "semi-black": "#000000",
      },
    },
  },
  plugins: [],
};
