module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        button: {
          DEFAULT: "#321D47",
          secondary: "#DAE0F2",
          "secondary-text": "#000000E3",
          danger: "#FD4935",
        },
        tabs: {
          DEFAULT: "#E6007A",
          text: "#111827",
          dimmed: "#6C6B80",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("prettier-plugin-tailwindcss"),
  ],
}
