import type { ComponentChildren } from "preact"
import { Head } from "./Head.tsx"

export * from "./Head.tsx"
export * from "./Header.tsx"
export * from "./Navbar.tsx"

export const Layout = ({ children }: { children: ComponentChildren }) => {
  return (
    <>
      <Head />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-4">
        <main>{children}</main>
      </div>
    </>
  )
}
