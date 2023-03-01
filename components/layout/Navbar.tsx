import type { ComponentChildren } from "preact"
import { Tabs } from "../Tabs.tsx"

const tabs = [
  { name: "New multisig", href: "/create-multisig", current: false },
  { name: "New transaction", href: "/create-transaction", current: true },
]

export const Navbar = ({ title }: { title: ComponentChildren }) => (
  <nav>
    <div className="relative flex items-center bg-white px-6 h-20 rounded-b border border-nebula -mt-px">
      <div className="absolute">
        {title && <div className="flex">{title}</div>}
      </div>
      <div className="flex items-center justify-center flex-grow self-end">
        <Tabs tabs={tabs} />
      </div>
    </div>
  </nav>
)
