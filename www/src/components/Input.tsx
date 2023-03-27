import { clsx } from "clsx"

type Props = {
  label: string
  value: string
  onChange: (event: preact.JSX.TargetedEvent<HTMLInputElement, Event>) => void
  error?: string
  id?: string
  name?: string
  placeholder?: string
}

export const Input = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  ...props
}: Props) => {
  return (
    <div class="flex flex-col mb-4">
      <label class="mb-2">
        {label}
        <span class="text-[#E6007A]">*</span>
      </label>
      <input
        class={clsx(
          "bg-[#f7f7f7] rounded-lg border p-3 focus:outline-none",
          error ? "border-red-500" : "border-inherit",
        )}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {error && <p class="text-[#E31902] text-sm mt-1">{error}</p>}
    </div>
  )
}
