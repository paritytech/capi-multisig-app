import { forwardRef } from "preact/compat"
import type { ForwardedRef } from "preact/compat"
import type { JSX } from "preact/jsx-runtime"
import { IconMinus } from "./icons/IconMinus.js"
import { IconPlus } from "./icons/IconPlus.js"

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  value: number
  onChange: (value: number) => void
}

export const InputNumber = forwardRef(
  (
    { onChange, value, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const handleOnChange: JSX.GenericEventHandler<HTMLInputElement> = (
      { target },
    ) => {
      if (target instanceof HTMLInputElement) {
        const value = parseInt(target.value)
        onChange(value)
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
      <div class="flex ">
        <button
          type="button"
          class="flex items-center px-4 py-2 rounded-l-lg focus:outline-none border border-r-0"
          onClick={decrease}
        >
          <IconMinus class="w-4 h-4 text-black" />
        </button>
        <input
          type="number"
          class="w-11 text-center border-inherit border-t border-b border-l-0 border-r-0 outline-none focus:border-inherit focus:ring-0"
          {...props}
          value={value}
          onChange={handleOnChange}
          min={0}
          ref={ref}
        />
        <button
          type="button"
          class="flex items-center px-4 py-2 rounded-r-lg focus:outline-none border border-l-0"
          onClick={increase}
        >
          <IconPlus class="w-4 h-4 text-black" />
        </button>
      </div>
    )
  },
)