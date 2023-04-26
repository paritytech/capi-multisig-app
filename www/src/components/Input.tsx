import { clsx } from "clsx"
import { forwardRef } from "preact/compat"
import type { ForwardedRef } from "preact/compat"
import type { JSX } from "preact/jsx-runtime"
import { IconInfo } from "./icons/IconInfo.js"

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  error?: string
  required?: boolean
}

export const Input = forwardRef(
  (
    { label, required, className, error, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-foreground-contrast text-body2">
          {label}
          {required && <span className="text-error">*</span>}
        </label>
        <input
           className={clsx(
            "bg-background-dip rounded-lg border border-border-hint text-foreground-contrast p-3 focus:outline-none",
            error ? "border-2 border-error" : "border-inherit ",
            className,
          )}
          {...props}
          ref={ref}
        />
        {error && (
          <div className="text-foreground-danger text-body2 flex items-center">
            <IconInfo className="mr-1" />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  },
)
