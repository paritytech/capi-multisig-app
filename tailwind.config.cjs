module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        button: {
          DEFAULT: '#321D47',
          secondary: '#DAE0F2',
          'secondary-text': '#000000E3',
          danger: '#FD4935',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('prettier-plugin-tailwindcss'),
  ],
}
