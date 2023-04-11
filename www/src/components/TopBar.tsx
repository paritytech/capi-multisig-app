import { accounts, defaultAccount } from "../signals/index.js"
import { AccountSelect } from "./AccountSelect.js"
import { Tabs } from "./Tabs.js"
import type { Tab } from "./Tabs.js"

const tabs: Tab[] = [
  { name: "Dashboard", href: "/" },
  { name: "Transaction history", href: "/transaction-history", disabled: true },
]

export function TopBar() {
  return (
    <header className="flex flex-col md:flex-row items-center w-full h-auto md:h-16 px-3 bg-white border-b border-border">
      <div className="self-end mx-auto flex items-center">
        <Tabs tabs={tabs} />
        <div className="py-2 px-7 bg-menu-bg text-textAndIcons-primary rounded-full">
          Soon
        </div>
      </div>

      <div className="w-60 my-2">
        <AccountSelect
          accounts={accounts.value}
          value={defaultAccount.value}
          onChange={(account) => {
            defaultAccount.value = account
          }}
        />
      </div>
    </header>
  )
}
