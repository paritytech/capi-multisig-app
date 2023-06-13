import { westend } from "@capi/westend"
import { westendDev } from "@capi/westend-dev"
import { switchChain } from "../signals/chain.js"
import { accounts, defaultAccount } from "../signals/index.js"
import { AccountSelect } from "./AccountSelect.js"
import { Button } from "./Button.js"
import type { Tab } from "./Tabs.js"
import { Tabs } from "./Tabs.js"

const tabs: Tab[] = [
  { name: "Dashboard", href: "/" },
  { name: "Transaction history", href: "/transaction-history", disabled: true },
]

export function TopBar() {
  return (
    <header className="flex flex-col md:flex-row items-center w-full h-auto md:h-16 px-3 bg-white border-b border-border">
      <div className="self-end mx-auto flex items-center">
        <Tabs tabs={tabs} />
        <div className="py-2 px-7 bg-menu-bg text-gray-500 rounded-full">
          Soon
        </div>
      </div>

      <div className="flex flex-row">
        <Button onClick={() => switchChain(westendDev)} variant="ghost">
          Westend Dev
        </Button>
        <Button onClick={() => switchChain(westend)} variant="ghost">
          Westend
        </Button>
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
