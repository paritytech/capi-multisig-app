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
      background: {
        default: "var(--background-default)",
        system: "var(--background-system)",
    "layer_1": "var(--background-layer-1)"
      },
      fill: {
        primary: "var(--fill-primary)",
        primaryHover: "var(--fill-primary-hover)",
        primaryDown: "var(--fill-primary-down)",
        secondary: "var(--fill-secondary)",
        secondaryHover: "var(--fill-secondary-hover)",
        secondaryDown: "var(--fill-secondary-down)",
        ghost: "var(--fill-ghost)",
        ghostHover: "var(--fill-ghost-hover)",
        ghostDown: "var(--fill-ghost-down)",
        matchBackground: "var(--fill-match-background)",
        disabled: "var(--fill-disabled)",
        danger: "var(--fill-danger)",
        dangerHover: "var(--fill-danger-hover)",
        dangerPressed: "var(--fill-danger-pressed)",
    "elevate_1": "var(--fill-elevate-1)",
        overlay: "var(--fill-overlay)",
        selected: "var(--fill-selected)",
        white: "var(--fill-white)",
    "impress_1": "var(--fill-impress-1)"
      },
      textAndIcons: {
        contrast: "var(--text-and-icons-contrast)",
        dimmed: "var(--text-and-icons-dimmed)",
        matchBackground: "var(--text-and-icons-match-background)",
        primary: "var(--text-and-icons-primary)",
        white: "var(--text-and-icons-white)",
        disabled: "var(--text-and-icons-disabled)",
        danger: "var(--text-and-icons-danger)",
        emphasized: "var(--text-and-icons-emphasized)"
      },
      interactive: {
        hover: "var(--interactive-hover)",
        pressed: "var(--interactive-pressed)",
        hoverTransparentBackground: "var(--interactive-hover-transparent-background)"
      },
      accent: {
        cyan: "var(--accent-cyan)",
        green: "var(--accent-green)",
        lime: "var(--accent-lime)",
        pink: "var(--accent-pink)"
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
      },
      stroke: {
        contrast: "var(--stroke-contrast)",
        dimmed: "var(--stroke-dimmed)",
        primary: "var(--stroke-primary)",
        danger: "var(--stroke-danger)",
        hint: "var(--stroke-hint)",
        disabled: "var(--stroke-disabled)",
        focus: "var(--stroke-focus)"
      },
      padding: {
        36: {
          leftRight: "var(--padding-36-left-right)",
          topBottom: "var(--padding-36-top-bottom)"
        },
        40: {
          leftRight: "var(--padding-40-left-right)",
          topBottom: "var(--padding-40-top-bottom)"
        },
        48: {
          leftRight: "var(--padding-48-left-right)",
          topBottom: "var(--padding-48-top-bottom)"
        },
        76: {
          leftRight: "var(--padding-76-left-right)",
          topBottom: "var(--padding-76-top-bottom)"
        },
        min: {
          leftRight: "var(--padding-min-left-right)",
          topBottom: "var(--padding-min-top-bottom)"
        }
      },
      gap: {
        medium: "var(--gap-medium)",
        small: "var(--gap-small)",
        large: "var(--gap-large)"
      },
      icon: {
        20: "var(--icon-20)",
        24: "var(--icon-24)",
        36: "var(--icon-36)"
      },
      desktop: {
    "h1": "var(--desktop-h1)",
    "h2": "var(--desktop-h2)",
    "h3": "var(--desktop-h3)",
    "h4": "var(--desktop-h4)",
    "h5": "var(--desktop-h5)",
    "h6": "var(--desktop-h6)",
    "body1": "var(--desktop-body1)",
    "body2": "var(--desktop-body2)",
    "body2Medium": "var(--desktop-body2-medium)",
    "subtitle1": "var(--desktop-subtitle1)",
    "subtitle2": "var(--desktop-subtitle2)",
        caption: "var(--desktop-caption)"
      },
      mobile: {
    "h1": "var(--mobile-h1)",
    "h2": "var(--mobile-h2)",
    "h3": "var(--mobile-h3)",
    "h4": "var(--mobile-h4)",
    "h5": "var(--mobile-h5)",
    "h6": "var(--mobile-h6)",
    "subtitle1": "var(--mobile-subtitle1)",
    "subtitle2": "var(--mobile-subtitle2)",
    "body1": "var(--mobile-body1)",
    "body2": "var(--mobile-body2)",
        caption: "var(--mobile-caption)",
        label: "var(--mobile-label)",
        overline: "var(--mobile-overline)"
      },
      pill: "var(--pill)",
      default: "var(--default)",
      none: "var(--none)",
      xl: "var(--xl)"
    },
  },
  plugins: [require("@tailwindcss/prettier-plugin-tailwindcss"),require("@tailwindcss/forms"),require("@tailwindcss/line-clamp")]
}
