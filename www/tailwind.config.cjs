module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0px 7px 3px rgba(18, 17, 39, 0.01), 0px 4px 2px rgba(18, 17, 39, 0.05), 0px 2px 2px rgba(18, 17, 39, 0.09), 0px 0px 1px rgba(18, 17, 39, 0.1), 0px 0px 0px rgba(18, 17, 39, 0.1)'
      },
      colors: {
        border: '#00000029',
        divider: '#D1D1DB',
        link: {
          DEFAULT: '#E6007A',
        },
        menu: {
          active: '#E6007A',
          bg: "#F3F3F6",
        },
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
