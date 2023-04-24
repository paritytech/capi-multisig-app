import { accounts, defaultAccount } from "../signals/index.js"
import { AccountSelect } from "./AccountSelect.js"
import { Tabs } from "./Tabs.js"
import type { Tab } from "./Tabs.js"
import ThemeSwitchToggle from "./ThemeSwitchToggle.js"


const tabs: Tab[] = [
  { name: "Dashboard", href: "/" },
  { name: "Transaction history", href: "/transaction-history", disabled: true },
]

export function TopBar() {


  return (
    <header className="flex flex-col md:flex-row items-center w-full h-auto md:h-16 px-3 bg-background-default text-foreground-contrast">
      <div className="w-full flex items-center justify-between">
        <div>logo</div>
        <div className='flex gap-2 items-center'>
          <Tabs tabs={tabs} />
          <div className="py-2 text-body_2 px-7 bg-fill-disabled text-foreground-disabled rounded-full">
             Soon
          </div>
          <ThemeSwitchToggle />
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
      </div>


    </header>
  )
}
