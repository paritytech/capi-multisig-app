import type { JSX } from "preact/jsx-runtime"

export const IconPlus = (
  props: JSX.IntrinsicAttributes & JSX.SVGAttributes<SVGSVGElement>,
) => (
  <svg
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={props.className}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    >
    </path>
  </svg>
)
