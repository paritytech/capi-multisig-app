import { ComponentChildren } from 'preact'

interface Props {
  children: ComponentChildren
}

export function CenteredCard({ children }: Props) {
  return (
    <div className="flex items-center justify-center pt-16">
      <div className="bg-white p-4 w-3/5">{children}</div>
    </div>
  )
}
