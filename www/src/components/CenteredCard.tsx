import { ComponentChildren } from "preact"

interface Props {
  children: ComponentChildren
}

export function CenteredCard({ children }: Props) {
  return (
    <div className="flex items-center justify-center pt-16">
      <div className="w-3/5 max-w-[640px] bg-background-float py-6 px-4 rounded-lg shadow-card">{children}</div>
    </div>
  )
}
