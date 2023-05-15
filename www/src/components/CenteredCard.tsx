import { ComponentChildren } from "preact"

interface Props {
  children: ComponentChildren
}

export function CenteredCard({ children }: Props) {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-4 border border-border rounded-lg shadow-card">
        {children}
      </div>
    </div>
  )
}
