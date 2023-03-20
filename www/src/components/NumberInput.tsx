import type { JSX } from "preact/jsx-runtime"
import { IconMinus } from "./icons/IconMinus.js"
import { IconPlus } from "./icons/IconPlus.js"

type Props = JSX.HTMLAttributes<HTMLInputElement> & {
  value: number
  onChange: (value: number) => void
}

export const NumberInput = (props: Props) => {
  const { onChange, value } = props

  function increase() {
    onChange(value + 1)
  }

  function decrease() {
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
        <IconMinus />
      </button>
      <input
        type="number"
        class="w-11 text-center border-inherit border-t border-b border-l-0 border-r-0 outline-none focus:outline-nonet"
        {...props}
      />
      <button
        type="button"
        class="flex items-center px-4 py-2 rounded-r-lg focus:outline-none border border-l-0"
        onClick={increase}
      >
        <IconPlus />
      </button>
    </div>
  )
}
