import { clsx } from "clsx"
import { forwardRef } from "preact/compat"
import type { ForwardedRef } from "preact/compat"
import type { JSX } from "preact/jsx-runtime"
import { IconInfo } from "./icons/IconInfo.js"

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  error?: string
  required?: boolean
  onChange: (value: number | string) => void
}

export const Input = forwardRef(
  (
    { label, required, className, error, onChange, type, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const handleOnChange: JSX.GenericEventHandler<HTMLInputElement> = (
      { target },
    ) => {
      if (target instanceof HTMLInputElement) {
        const { valueAsNumber, value } = target
        type === "number"
          ? onChange(Number.isNaN(valueAsNumber) ? 0 : valueAsNumber)
          : onChange(value)
      }
    }
    return (
      <div className="flex flex-col mb-4">
        <label className="mb-2">
          {label}
          {required && <span className="text-error">*</span>}
        </label>
        <input
          className={clsx(
            "bg-input-bg rounded-lg border p-3 focus:outline-none",
            error ? "border-2 border-error" : "border-inherit ",
            className,
          )}
          {...props}
          ref={ref}
          onChange={(e) => handleOnChange(e)}
          type={type}
        />
        {error && (
          <div className="text-input-error text-sm mt-1 flex items-center">
            <IconInfo className="mr-1" />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  },
)
