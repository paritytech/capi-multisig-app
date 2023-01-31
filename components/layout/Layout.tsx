import type { ComponentChildren } from "preact"

import { Head } from "./Head.tsx"
import { Sidebar } from "./Sidebar.tsx"

export const Layout = ({ children }: { children: ComponentChildren }) => {
  return (
    <div className="min-h-screen bg-platinum">
      <Head />
      <Sidebar />
      <main className="flex flex-1 flex-col md:pl-64 w-full -ml-px">{children}</main>
    </div>
  )
}
