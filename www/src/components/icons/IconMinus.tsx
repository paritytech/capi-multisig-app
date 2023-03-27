import type { JSX } from "preact/jsx-runtime"

export const IconMinus = (
  props: JSX.IntrinsicAttributes & JSX.SVGAttributes<SVGSVGElement>,
) => (
  <svg
    width="14"
    height="2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14 2H0V0h14v2Z" fill="#000" fill-opacity=".89" />
  </svg>
)
