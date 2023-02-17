import classNames from "classnames"
import type { ComponentChildren } from "preact"

export const Card = (
  { children, className }: { children: ComponentChildren; className?: string },
) => {
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
