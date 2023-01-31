import type { ComponentChildren } from "preact"
import WalletConnect from "../../islands/WalletConnect.tsx"
import { TestBlock } from "../TestBlock.tsx"

export const Header = ({ title }: { title: ComponentChildren }) => {
  return (
    <header className="bg-white py-2 px-6 rounded-t border border-nebula">
      <div className="flex flex-row flex-nowrap justify-between items-center">
        {title && <div className="flex">{title}</div>}
        <div className="flex items-center gap-4">
          <WalletConnect />
          <TestBlock>Dark / Light mode</TestBlock>
          <TestBlock>Settings</TestBlock>
        </div>
      </div>
    </header>
  )
}
