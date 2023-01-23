import classNames from "classnames"
import { ComponentChildren } from "preact"

export const TestBlock = (
  { children, className }: { children: ComponentChildren; className?: string },
) => (
  <div className={classNames("rounded-lg border-4 border-dashed border-gray-200 p-4", className)}>
    {children}
  </div>
)
