import { clsx } from "clsx"
import type { ForwardedRef } from "preact/compat"
import { forwardRef } from "preact/compat"
import type { JSX } from "preact/jsx-runtime"
import { NumericFormat, NumericFormatProps } from "react-number-format"
import { IconInfo } from "./icons/IconInfo.js"

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  error?: string
  required?: boolean
  onChange: (value: number) => void
} & Partial<NumericFormatProps>

export const BalanceInput = forwardRef(
  (
    {
      label,
      required,
      className,
      error,
      onChange,
      decimalScale = 4,
      ...props
    }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="flex flex-col mb-4">
        <label className="mb-2">
          {label}
          {required && <span className="text-error">*</span>}
        </label>
        <NumericFormat
          allowLeadingZeros={false}
          allowNegative={false}
          className={clsx(
            "bg-input-bg rounded-lg border p-3 focus:outline-none",
            error ? "border-2 border-error" : "border-inherit ",
            className,
          )}
          thousandSeparator
          thousandsGroupStyle="thousand"
          getInputRef={ref}
          decimalScale={decimalScale}
          {...props}
          onValueChange={(valueChange) => {
            onChange(valueChange.floatValue)
          }}
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
