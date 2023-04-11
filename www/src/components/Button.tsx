import { clsx } from "clsx"
import { JSX } from "preact"
import type { ComponentChildren } from "preact"

export const Button = ({
  variant = "primary",
  size = "md",
  disabled,
  className,
  iconLeft,
  iconRight,
  full,
  children,
  ...rest
}:
  & JSX.IntrinsicAttributes
  & Omit<JSX.HTMLAttributes<HTMLButtonElement>, "size">
  & {
    variant?: "primary" | "secondary" | "ghost" | "danger"
    size?: "md" | "xl"
    full?: boolean
    iconLeft?: ComponentChildren
    iconRight?: ComponentChildren
  }) =>
{
  const iconClassName = clsx(
    "flex items-center ",
    {
      "h-6 w-6": size === "md",
    },
    {
      "h-9 w-9 text-2xl": size === "xl",
    },
  )
  return (
    <button
      className={clsx(
        "flex flex-row items-center gap-2 justify-center whitespace-nowrap box-border",
        "font-semibold rounded-full",
        "outline-none focus:outline-none",
        {
          "py-3 px-8": size === "md",
        },
        {
          "min-w-[300px] h-20 font-bold py-5 px-16 text-2xl": size === "xl",
        },
        full ? "w-full" : "w-fit",
        {
          "bg-transparent text-button": variant === "ghost",
        },
        {
          "bg-button-danger hover:bg-button-danger/90 text-white":
            variant === "danger",
        },
        {
          "bg-button-secondary hover:bg-button-secondary/90 text-button-secondary-text":
            variant === "secondary",
        },
        {
          "hover:bg-fill-secondaryHover bg-fill-secondary text-textAndIcons-white": variant === "primary",
        },
        { "cursor-not-allowed opacity-70": disabled },
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {iconLeft && <div className={iconClassName}>{iconLeft}</div>}
      {children}
      {iconRight && <div className={iconClassName}>{iconRight}</div>}
    </button>
  )
}
