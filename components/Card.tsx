import classNames from "classnames"
import type { ComponentChildren } from "preact"

interface Props {
  children: ComponentChildren
  className?: string
}

export const Card = ({ children, className }: Props) => {
  return (
    <div
      className={classNames(
        "rounded-lg shadow w-full bg-white border border-nebula py-10 px-4",
        className,
      )}
    >
      {children}
    </div>
  )
}
