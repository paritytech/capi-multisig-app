import type { ComponentChildren } from "preact"
import { Head } from "./Head.tsx"
import { PolkadotLogo } from "./PolkadotLogo.tsx"

export const Layout = ({ children }: {
  children: ComponentChildren
}) => {
  return (
    <>
      <Head />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <header className="w-40">
          <PolkadotLogo />
        </header>
        <main>
          {children}
        </main>
      </div>
    </>
  )
}
