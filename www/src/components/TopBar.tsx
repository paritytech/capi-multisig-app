import AccountSelect from "./AccountSelect.js"
import { type Tab, Tabs } from "./Tabs.js"

const tabs: Tab[] = [
  { name: "Dashboard", href: "/" },
  { name: "Transaction history", href: "/transaction-history", disabled: true },
]

export function TopBar() {
  return (
    <header className="flex flex-col md:flex-row items-center w-full h-auto md:h-16 px-3 bg-white">
      <div className="self-end mx-auto">
        <Tabs tabs={tabs} />
      </div>
      <AccountSelect />
    </header>
  )
}
