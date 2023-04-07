/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./pages/**/*.{js,ts,jsx,tsx}","./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
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
          colors: {
            pPink: "var(--colors-accent-colors-p-pink)"
          }
        },
        stroke: {
          contrast: "var(--colors-stroke-contrast)",
          dimmed: "var(--colors-stroke-dimmed)",
          primary: "var(--colors-stroke-primary)",
          danger: "var(--colors-stroke-danger)",
          hint: "var(--colors-stroke-hint)",
          disabled: "var(--colors-stroke-disabled)",
          focus: "var(--colors-stroke-focus)"
        },
        black: "var(--colors-black)",
        white: "var(--colors-white)",
        pPink: {
          50: "var(--colors-p-pink-50)",
          100: "var(--colors-p-pink-100)",
          200: "var(--colors-p-pink-200)",
          300: "var(--colors-p-pink-300)",
          400: "var(--colors-p-pink-400)",
          500: "var(--colors-p-pink-500)",
          600: "var(--colors-p-pink-600)",
          700: "var(--colors-p-pink-700)",
          800: "var(--colors-p-pink-800)",
          900: "var(--colors-p-pink-900)",
          950: "var(--colors-p-pink-950)"
        },
        pGray: {
          50: "var(--colors-p-gray-50)",
          100: "var(--colors-p-gray-100)",
          200: "var(--colors-p-gray-200)",
          300: "var(--colors-p-gray-300)",
          400: "var(--colors-p-gray-400)",
          500: "var(--colors-p-gray-500)",
          600: "var(--colors-p-gray-600)",
          700: "var(--colors-p-gray-700)",
          800: "var(--colors-p-gray-800)",
          900: "var(--colors-p-gray-900)",
          950: "var(--colors-p-gray-950)"
        },
        pRed: {
          50: "var(--colors-p-red-50)",
          100: "var(--colors-p-red-100)",
          200: "var(--colors-p-red-200)",
          300: "var(--colors-p-red-300)",
          400: "var(--colors-p-red-400)",
          500: "var(--colors-p-red-500)",
          600: "var(--colors-p-red-600)",
          700: "var(--colors-p-red-700)",
          800: "var(--colors-p-red-800)",
          900: "var(--colors-p-red-900)",
          950: "var(--colors-p-red-950)"
        },
        pWhiteTransparent: {
          100: "var(--colors-p-white-transparent-100)",
          200: "var(--colors-p-white-transparent-200)",
          300: "var(--colors-p-white-transparent-300)",
          400: "var(--colors-p-white-transparent-400)",
          500: "var(--colors-p-white-transparent-500)",
          600: "var(--colors-p-white-transparent-600)",
          700: "var(--colors-p-white-transparent-700)",
          800: "var(--colors-p-white-transparent-800)",
          900: "var(--colors-p-white-transparent-900)"
        },
        pBlackTransparent: {
          50: "var(--colors-p-black-transparent-50)",
          100: "var(--colors-p-black-transparent-100)",
          200: "var(--colors-p-black-transparent-200)",
          300: "var(--colors-p-black-transparent-300)",
          400: "var(--colors-p-black-transparent-400)",
          500: "var(--colors-p-black-transparent-500)",
          600: "var(--colors-p-black-transparent-600)",
          700: "var(--colors-p-black-transparent-700)",
          800: "var(--colors-p-black-transparent-800)",
          900: "var(--colors-p-black-transparent-900)"
        },
        accentCyan: {
          500: "var(--colors-accent-cyan-500)",
          600: "var(--colors-accent-cyan-600)",
          700: "var(--colors-accent-cyan-700)"
        },
        accentGreen: {
          500: "var(--colors-accent-green-500)",
          600: "var(--colors-accent-green-600)",
          700: "var(--colors-accent-green-700)"
        },
        accentLime: {
          500: "var(--colors-accent-lime-500)",
          600: "var(--colors-accent-lime-600)",
          700: "var(--colors-accent-lime-700)"
        },
        pPurple: {
          50: "var(--colors-p-purple-50)",
          100: "var(--colors-p-purple-100)",
          200: "var(--colors-p-purple-200)",
          300: "var(--colors-p-purple-300)",
          400: "var(--colors-p-purple-400)",
          500: "var(--colors-p-purple-500)",
          600: "var(--colors-p-purple-600)",
          700: "var(--colors-p-purple-700)",
          800: "var(--colors-p-purple-800)",
          900: "var(--colors-p-purple-900)",
          925: "var(--colors-p-purple-925)",
          950: "var(--colors-p-purple-950)"
        }
      },
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
      }
    },
  },
  plugins: [require("@tailwindcss/forms"),require("@tailwindcss/line-clamp")]
}
