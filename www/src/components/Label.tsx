import type { ComponentChildren } from "preact"

interface LabelProps {
  htmlFor: string
  children: ComponentChildren
}

// TODO props
export function Label({ htmlFor, children }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="block text-input-text">
      {children}
    </label>
  )
}
