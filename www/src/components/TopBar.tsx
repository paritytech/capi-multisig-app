import { accounts, defaultAccount } from "../signals/index.js"
import { AccountSelect } from "./AccountSelect.js"
import { Tabs } from "./Tabs.js"
import type { Tab } from "./Tabs.js"
import ThemeSwitchToggle from "./ThemeSwitchToggle.js"
import PolkadotLogo from "./icons/PolkadotLogo.js"


const tabs: Tab[] = [
  { name: "Dashboard", href: "/" },
  { name: "Transaction history", href: "/transaction-history", disabled: true },
]

export function TopBar() {


  return (
    <header className="flex flex-col md:flex-row items-center w-full h-auto md:h-16 px-6 lg:px-16 bg-background-default text-foreground-contrast">
      <div className="w-full flex items-center justify-between">
        <div className='flex gap-4 items-center'>
          <PolkadotLogo />
          <div className='w-[2px] h-5 bg-fill-separator' />
         <span className='font-unbounded font-medium text-h5' >Multisig</span>
        </div>
          <Tabs tabs={tabs} />
          <div className='flex gap-3 items-center' >
        <ThemeSwitchToggle />
        <AccountSelect
          accounts={accounts.value}
          value={defaultAccount.value}
          onChange={(account) => {
            defaultAccount.value = account
          }}
        /></div>
      </div>


    </header>
  )
}
