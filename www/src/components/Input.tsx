import { clsx } from "clsx"
import { forwardRef } from "preact/compat"
import type { ForwardedRef } from "preact/compat"
import type { JSX } from "preact/jsx-runtime"

type Props = JSX.HTMLAttributes<HTMLInputElement> & { error?: string }

export const Input = forwardRef(
  ({ label, error, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <div class="flex flex-col mb-4">
        <label class="mb-2">
          {label}
          <span class="text-error">*</span>
        </label>
        <input
          class={clsx(
            "bg-input-bg rounded-lg border p-3 focus:outline-none",
            error ? "border-2 border-red-500" : "border-inherit ",
          )}
          {...props}
          ref={ref}
        />
        {error && <p class="text-input-error text-sm mt-1">{error}</p>}
      </div>
    )
  },
)
