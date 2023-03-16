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
        input: {
          focus: '#E6007A',
          text: '#111827',
          border: '#00000029',
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
