import { JSX } from "preact/jsx-runtime"

export const IconInfo = (
  props: JSX.IntrinsicAttributes & JSX.SVGAttributes<SVGSVGElement>,
) => (
  <svg
    width="15"
    height="14"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M6.833 3.667h1.334V5H6.833V3.667Zm0 2.666h1.334v4H6.833v-4Zm.667-6A6.67 6.67 0 0 0 .833 7 6.67 6.67 0 0 0 7.5 13.667 6.67 6.67 0 0 0 14.167 7 6.67 6.67 0 0 0 7.5.333Zm0 12A5.34 5.34 0 0 1 2.167 7 5.34 5.34 0 0 1 7.5 1.667 5.34 5.34 0 0 1 12.833 7 5.34 5.34 0 0 1 7.5 12.333Z" />
  </svg>
)
