module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['"Inter"'],
      },
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
          focus: '#E6007A',
          active: '#F2F5FF',
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
