/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        title: "#1C170D",
        subtitle: "#A1824A",
        paragraph: "#7B7A7A",
        accent: "#F5F0E5",
        subtle: "#E5E8EB",
      },
    },
  },

  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
