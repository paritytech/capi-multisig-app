import type { ComponentChildren } from "preact"
import { Head } from "./Head.tsx"

export const Layout = ({ children }: { children: ComponentChildren }) => {
  return (
    <div className="min-h-screen bg-platinum">
      <Head />
      <main className="flex flex-1 flex-col w-full">{children}</main>
    </div>
  )
}
