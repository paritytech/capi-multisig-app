import type { JSX } from "preact/jsx-runtime"

export const IconTrash = (
  props: JSX.IntrinsicAttributes & JSX.SVGAttributes<SVGSVGElement>,
) => (
  <svg
    width="24"
    height="25"
    viewBox="0 0 24 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={props.className}
  >
    <path
      d="M16 9.8418V19.8418H8V9.8418H16ZM14.5 3.8418H9.5L8.5 4.8418H5V6.8418H19V4.8418H15.5L14.5 3.8418ZM18 7.8418H6V19.8418C6 20.9418 6.9 21.8418 8 21.8418H16C17.1 21.8418 18 20.9418 18 19.8418V7.8418Z"
      fill="#F3F5FB"
    />
  </svg>
)
