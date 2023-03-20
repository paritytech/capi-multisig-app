import type { JSX } from "preact/jsx-runtime"

export const IconPlus = (
  props: JSX.IntrinsicAttributes & JSX.SVGAttributes<SVGSVGElement>,
) => (
  <svg
    width="14"
    height="14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M14 8H8v6H6V8H0V6h6V0h2v6h6v2Z" fill="#000" fill-opacity=".89" />
  </svg>
)
