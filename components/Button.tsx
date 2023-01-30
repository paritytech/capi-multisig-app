import classNames from "classnames"
import { JSX } from "preact"
import type { ComponentChildren } from "preact"

interface Props {
  variant: "fill" | "ghost"
  iconLeft?: ComponentChildren
  iconRight?: ComponentChildren
}
export const Button = (
  { variant, size, disabled, className, iconLeft, iconRight, children, ...rest }:
    & JSX.IntrinsicAttributes
    & JSX.HTMLAttributes<HTMLButtonElement>
    & Props,
) => {
  return (
    <button
      className={classNames(
        "flex flex-row gap-3 items-center rounded-full w-full",
        "font-semibold py-3 px-10",
        "outline-none focus:outline-none",
        { "bg-transparent text-tuna hover:text-pink-800": variant === "ghost" },
        {
          // TODO add hover state
          "bg-tuna text-white": variant === "fill",
        },
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  )
}
