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
        tabs: {
          DEFAULT: '#E6007A',
          text: '#111827',
          dimmed: '#6C6B80',
        },
        select: {
          border: '#00000029',
          text: '#000000E3',
          active: '#F2F5FF',
        },
        notification: {
          success: "#56F3CE",
          error: "#FE8D81",
        },
      },
      fontFamily: {
        inter: ['"Inter"'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('prettier-plugin-tailwindcss'),
  ],
}
