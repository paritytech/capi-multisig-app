import type { JSX } from "preact/jsx-runtime"

export const IconMinus = (
  props: JSX.IntrinsicAttributes & JSX.SVGAttributes<SVGSVGElement>,
) => (
  <svg
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    class={props.class}
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15">
    </path>
  </svg>
)
