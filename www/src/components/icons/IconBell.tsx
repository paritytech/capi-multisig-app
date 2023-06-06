import type { JSX } from "preact/jsx-runtime";

export const IconBell = (props: JSX.IntrinsicAttributes & JSX.SVGAttributes<SVGSVGElement>) => (
  <svg
    // fill="none"
    stroke="none"
    viewBox="0 0 12 14"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={props.className}
    {...props}
  >
    <path d="M6.00002 13.5C6.73335 13.5 7.33335 12.9 7.33335 12.1667H4.66669C4.66669 12.9 5.26669 13.5 6.00002 13.5ZM10 9.5V6.16667C10 4.12 8.91335 2.40667 7.00002 1.95333V1.5C7.00002 0.946667 6.55335 0.5 6.00002 0.5C5.44669 0.5 5.00002 0.946667 5.00002 1.5V1.95333C3.09335 2.40667 2.00002 4.11333 2.00002 6.16667V9.5L0.666687 10.8333V11.5H11.3334V10.8333L10 9.5ZM8.66669 10.1667H3.33335V6.16667C3.33335 4.51333 4.34002 3.16667 6.00002 3.16667C7.66002 3.16667 8.66669 4.51333 8.66669 6.16667V10.1667Z" />
  </svg>
);
