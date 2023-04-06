/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      0: "var(--0)",
      1: "var(--1)",
      2: "var(--2)",
      3: "var(--3)",
      4: "var(--4)",
      5: "var(--5)",
      6: "var(--6)",
      7: "var(--7)",
      8: "var(--8)",
      9: "var(--9)",
      10: "var(--10)",
      11: "var(--11)",
      12: "var(--12)",
      14: "var(--14)",
      16: "var(--16)",
      20: "var(--20)",
      24: "var(--24)",
      28: "var(--28)",
      32: "var(--32)",
      36: "var(--36)",
      40: "var(--40)",
      44: "var(--44)",
      48: "var(--48)",
      52: "var(--52)",
      56: "var(--56)",
      60: "var(--60)",
      64: "var(--64)",
      72: "var(--72)",
      80: "var(--80)",
      96: "var(--96)",
      boxShadow: {
        pop: "var(--box-shadow-pop)",
        idle: "var(--box-shadow-idle)",
        hover: "var(--box-shadow-hover)"
      },
      colors: {
        background: {
          default: "var(--colors-background-default)",
          system: "var(--colors-background-system)",
      "layer_1": "var(--colors-background-layer-1)"
        },
        fill: {
          primary: "var(--colors-fill-primary)",
          primaryHover: "var(--colors-fill-primary-hover)",
          primaryDown: "var(--colors-fill-primary-down)",
          secondary: "var(--colors-fill-secondary)",
          secondaryHover: "var(--colors-fill-secondary-hover)",
          secondaryDown: "var(--colors-fill-secondary-down)",
          ghost: "var(--colors-fill-ghost)",
          ghostHover: "var(--colors-fill-ghost-hover)",
          ghostDown: "var(--colors-fill-ghost-down)",
          matchBackground: "var(--colors-fill-match-background)",
          disabled: "var(--colors-fill-disabled)",
          danger: "var(--colors-fill-danger)",
          dangerHover: "var(--colors-fill-danger-hover)",
          dangerPressed: "var(--colors-fill-danger-pressed)",
      "elevate_1": "var(--colors-fill-elevate-1)",
          overlay: "var(--colors-fill-overlay)",
          selected: "var(--colors-fill-selected)",
          white: "var(--colors-fill-white)",
      "impress_1": "var(--colors-fill-impress-1)"
        },
        textAndIcons: {
          contrast: "var(--colors-text-and-icons-contrast)",
          dimmed: "var(--colors-text-and-icons-dimmed)",
          matchBackground: "var(--colors-text-and-icons-match-background)",
          primary: "var(--colors-text-and-icons-primary)",
          white: "var(--colors-text-and-icons-white)",
          disabled: "var(--colors-text-and-icons-disabled)",
          danger: "var(--colors-text-and-icons-danger)",
          emphasized: "var(--colors-text-and-icons-emphasized)"
        },
        interactive: {
          hover: "var(--colors-interactive-hover)",
          pressed: "var(--colors-interactive-pressed)",
          hoverTransparentBackground: "var(--colors-interactive-hover-transparent-background)"
        },
        accent: {
          cyan: "var(--colors-accent-cyan)",
          green: "var(--colors-accent-green)",
          lime: "var(--colors-accent-lime)",
          pink: "var(--colors-accent-pink)"
        },
        stroke: {
          contrast: "var(--colors-stroke-contrast)",
          dimmed: "var(--colors-stroke-dimmed)",
          primary: "var(--colors-stroke-primary)",
          danger: "var(--colors-stroke-danger)",
          hint: "var(--colors-stroke-hint)",
          disabled: "var(--colors-stroke-disabled)",
          focus: "var(--colors-stroke-focus)"
        }
      },
      0_5: "var(--0-5)",
      1_5: "var(--1-5)",
      2_5: "var(--2-5)",
      3_5: "var(--3-5)",
      black: "var(--black)",
      white: "var(--white)",
      borderRadius: {
        none: "var(--border-radius-none)",
        sm: "var(--border-radius-sm)",
        default: "var(--border-radius-default)",
        md: "var(--border-radius-md)",
        lg: "var(--border-radius-lg)",
        xl: "var(--border-radius-xl)",
    "2xl": "var(--border-radius-2xl)",
    "3xl": "var(--border-radius-3xl)",
        full: "var(--border-radius-full)"
      },
      number: "var(--number)",
      fontFamily: {
        unbounded: "var(--font-family-unbounded)",
        inter: "var(--font-family-inter)",
        mono: "var(--font-family-mono)"
      },
      lineHeight: {
        0: "var(--line-height-0)",
        1: "var(--line-height-1)",
        2: "var(--line-height-2)",
        3: "var(--line-height-3)",
        4: "var(--line-height-4)",
        5: "var(--line-height-5)",
        6: "var(--line-height-6)",
        7: "var(--line-height-7)",
        8: "var(--line-height-8)",
        9: "var(--line-height-9)",
        10: "var(--line-height-10)",
        11: "var(--line-height-11)",
        12: "var(--line-height-12)",
        13: "var(--line-height-13)",
        14: "var(--line-height-14)",
        15: "var(--line-height-15)"
      },
      fontWeight: {
        unboundedBlack: "var(--font-weight-unbounded-black)",
        unboundedRegular: "var(--font-weight-unbounded-regular)",
        interRegular: "var(--font-weight-inter-regular)",
        interMedium: "var(--font-weight-inter-medium)",
        interBold: "var(--font-weight-inter-bold)",
        monoRegular: "var(--font-weight-mono-regular)",
        monoMedium: "var(--font-weight-mono-medium)"
      },
      fontSize: {
        0: "var(--font-size-0)",
        1: "var(--font-size-1)",
        2: "var(--font-size-2)",
        3: "var(--font-size-3)",
        4: "var(--font-size-4)",
        5: "var(--font-size-5)",
        6: "var(--font-size-6)",
        7: "var(--font-size-7)",
        8: "var(--font-size-8)",
        9: "var(--font-size-9)",
        10: "var(--font-size-10)",
        11: "var(--font-size-11)",
        12: "var(--font-size-12)",
        13: "var(--font-size-13)",
        14: "var(--font-size-14)",
        15: "var(--font-size-15)"
      },
      letterSpacing: {
        0: "var(--letter-spacing-0)",
        1: "var(--letter-spacing-1)"
      },
      paragraphSpacing: {
        0: "var(--paragraph-spacing-0)"
      },
      textCase: {
        none: "var(--text-case-none)"
      },
      textDecoration: {
        none: "var(--text-decoration-none)"
      },
      pink: {
        50: "var(--pink-50)",
        100: "var(--pink-100)",
        200: "var(--pink-200)",
        300: "var(--pink-300)",
        400: "var(--pink-400)",
        500: "var(--pink-500)",
        600: "var(--pink-600)",
        700: "var(--pink-700)",
        800: "var(--pink-800)",
        900: "var(--pink-900)",
        950: "var(--pink-950)"
      },
      gray: {
        50: "var(--gray-50)",
        100: "var(--gray-100)",
        200: "var(--gray-200)",
        300: "var(--gray-300)",
        400: "var(--gray-400)",
        500: "var(--gray-500)",
        600: "var(--gray-600)",
        700: "var(--gray-700)",
        800: "var(--gray-800)",
        900: "var(--gray-900)",
        950: "var(--gray-950)"
      },
      red: {
        50: "var(--red-50)",
        100: "var(--red-100)",
        200: "var(--red-200)",
        300: "var(--red-300)",
        400: "var(--red-400)",
        500: "var(--red-500)",
        600: "var(--red-600)",
        700: "var(--red-700)",
        800: "var(--red-800)",
        900: "var(--red-900)",
        950: "var(--red-950)"
      },
      whiteTransparent: {
        100: "var(--white-transparent-100)",
        200: "var(--white-transparent-200)",
        300: "var(--white-transparent-300)",
        400: "var(--white-transparent-400)",
        500: "var(--white-transparent-500)",
        600: "var(--white-transparent-600)",
        700: "var(--white-transparent-700)",
        800: "var(--white-transparent-800)",
        900: "var(--white-transparent-900)"
      },
      blackTransparent: {
        50: "var(--black-transparent-50)",
        100: "var(--black-transparent-100)",
        200: "var(--black-transparent-200)",
        300: "var(--black-transparent-300)",
        400: "var(--black-transparent-400)",
        500: "var(--black-transparent-500)",
        600: "var(--black-transparent-600)",
        700: "var(--black-transparent-700)",
        800: "var(--black-transparent-800)",
        900: "var(--black-transparent-900)"
      },
      cyan: {
        500: "var(--cyan-500)",
        600: "var(--cyan-600)",
        700: "var(--cyan-700)"
      },
      green: {
        500: "var(--green-500)",
        600: "var(--green-600)",
        700: "var(--green-700)"
      },
      lime: {
        500: "var(--lime-500)",
        600: "var(--lime-600)",
        700: "var(--lime-700)"
      },
      purple: {
        50: "var(--purple-50)",
        100: "var(--purple-100)",
        200: "var(--purple-200)",
        300: "var(--purple-300)",
        400: "var(--purple-400)",
        500: "var(--purple-500)",
        600: "var(--purple-600)",
        700: "var(--purple-700)",
        800: "var(--purple-800)",
        900: "var(--purple-900)",
        925: "var(--purple-925)",
        950: "var(--purple-950)"
      }
    },
  },
  plugins: [require("@tailwindcss/prettier-plugin-tailwindcss"),require("@tailwindcss/forms"),require("@tailwindcss/line-clamp")]
}
