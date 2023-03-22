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
          bg: 'rgba(0, 0, 0, 0.03)',
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
      boxShadow: {
        notification: "0px 7px 3px rgba(18, 17, 39, 0.01), 0px 4px 2px rgba(18, 17, 39, 0.05), 0px 2px 2px rgba(18, 17, 39, 0.09), 0px 0px 1px rgba(18, 17, 39, 0.1), 0px 0px 0px rgba(18, 17, 39, 0.1)",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('prettier-plugin-tailwindcss'),
  ],
}
