/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
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
        border: {
          contrast: "var(--colors-border-contrast)",
          dimmed: "var(--colors-border-dimmed)",
          primary: "var(--colors-border-primary)",
          danger: "var(--colors-border-danger)",
          hint: "var(--colors-border-hint)",
          disabled: "var(--colors-border-disabled)",
          focus: "var(--colors-border-focus)"
        },
        foreground: {
          contrast: "var(--colors-foreground-contrast)",
          dimmed: "var(--colors-foreground-dimmed)",
          matchBackground: "var(--colors-foreground-match-background)",
          primary: "var(--colors-foreground-primary)",
          white: "var(--colors-foreground-white)",
          disabled: "var(--colors-foreground-disabled)",
          danger: "var(--colors-foreground-danger)",
          emphasized: "var(--colors-foreground-emphasized)"
        },
        accent: {
          cyan: "var(--colors-accent-cyan)",
          green: "var(--colors-accent-green)",
          lime: "var(--colors-accent-lime)"
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
      fontFamily: {
        unbounded: "var(--font-family-unbounded)",
        inter: "var(--font-family-inter)",
        mono: "var(--font-family-mono)"
      },
      lineHeight: {
    "h2": "var(--line-height-h2)",
    "h1": "var(--line-height-h1)",
    "h3": "var(--line-height-h3)",
    "h4": "var(--line-height-h4)",
    "h5": "var(--line-height-h5)",
    "h6": "var(--line-height-h6)",
        body: "var(--line-height-body)",
    "body_2": "var(--line-height-body-2)",
        subtitle: "var(--line-height-subtitle)",
    "subtitle_2": "var(--line-height-subtitle-2)",
        caption: "var(--line-height-caption)"
      },
      fontWeight: {
        unboundedBold: "var(--font-weight-unbounded-bold)",
        unboundedMedium: "var(--font-weight-unbounded-medium)",
        interRegular: "var(--font-weight-inter-regular)",
        interMedium: "var(--font-weight-inter-medium)",
        interBold: "var(--font-weight-inter-bold)",
        monoRegular: "var(--font-weight-mono-regular)",
        monoMedium: "var(--font-weight-mono-medium)"
      },
      fontSize: {
    "body_2": "var(--font-size-body-2)",
        body: "var(--font-size-body)",
    "h6": "var(--font-size-h6)",
    "h5": "var(--font-size-h5)",
    "h4": "var(--font-size-h4)",
    "h3": "var(--font-size-h3)",
    "h2": "var(--font-size-h2)",
    "h1": "var(--font-size-h1)",
        subtitle: "var(--font-size-subtitle)",
    "subtitle_2": "var(--font-size-subtitle-2)",
        caption: "var(--font-size-caption)"
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