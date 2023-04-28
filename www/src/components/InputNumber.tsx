import { clsx } from "clsx"
import { forwardRef } from "preact/compat"
import type { ForwardedRef } from "preact/compat"
import type { JSX } from "preact/jsx-runtime"
import { IconInfo } from "./icons/IconInfo.js"
import { IconMinus } from "./icons/IconMinus.js"
import { IconPlus } from "./icons/IconPlus.js"

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  value: number
  onChange: (value: number) => void
  error?: string
  required?: boolean
}

export const InputNumber = forwardRef(
  (
    { onChange, value, label, required, error, className, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const handleOnChange: JSX.GenericEventHandler<HTMLInputElement> = (
      { target },
    ) => {
      if (target instanceof HTMLInputElement) {
        const { valueAsNumber } = target
        onChange(Number.isNaN(valueAsNumber) ? 0 : valueAsNumber)
      }
    }

    const increase = () => {
      onChange(value + 1)
    }

    const decrease = () => {
      if (value > 0) {
        onChange(value - 1)
      }
    }

    return (
      <div
        className={clsx(
          "mb-4 flex flex-col",
        )}
      >
        <label className="mb-2">
          {label}
          {required && <span className="text-error">*</span>}
        </label>
        <div
          className={clsx(
            "flex",
          )}
        >
          <button
            type="button"
            className={clsx(
              "flex items-center px-4 py-2 rounded-l-lg focus:outline-none border border-r-0",
              error ? "border-2 border-error" : "border-inherit ",
            )}
            onClick={decrease}
          >
            <IconMinus className="w-4 h-4 text-black" />
          </button>
          <input
            type="number"
            className={clsx(
              "w-11 border border-l-0 border-r-0 outline-none  focus:ring-0 p-3 focus:outline-none",
              className,
              error ? "border-2 border-error" : "border-inherit ",
            )}
            {...props}
            value={value}
            onChange={(e) => handleOnChange(e)}
            ref={ref}
          />
          <button
            type="button"
            className={clsx(
              "flex items-center px-4 py-2 rounded-r-lg focus:outline-none border border-l-0",
              error ? "border-2 border-error" : "border-inherit ",
            )}
            onClick={increase}
          >
            <IconPlus className="w-4 h-4 text-black" />
          </button>
        </div>

        {error && (
          <div className="text-input-error text-sm mt-1 flex items-center ">
            <IconInfo className="mr-1" />
            <span>{error}</span>
          </div>
        )}
      </div>
    )
  },
)
