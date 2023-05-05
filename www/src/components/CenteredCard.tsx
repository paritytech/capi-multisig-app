import { ComponentChildren } from "preact"

interface Props {
  children: ComponentChildren
}

export function CenteredCard({ children }: Props) {
  return (
    <div className="flex items-center justify-center pt-16">
      <div className="w-5/6 max-w-3xl bg-white py-6 px-4 border border-border rounded-lg shadow-card">
        {children}
      </div>
    </div>
  )
}
