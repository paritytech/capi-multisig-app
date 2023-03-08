import { AccountSelect } from './AccountSelect'
import { Tabs } from './Tabs'
import type { Tab } from './Tabs'
import { accounts, defaultAccount } from '../signals'
import { useState } from 'preact/hooks'

const tabs: Tab[] = [
  { name: 'Dashboard', href: '/' },
  { name: 'Transaction history', href: '/transaction-history', disabled: true },
]

export function TopBar() {
  const [selectedAccount, setSelectedAccount] = useState(defaultAccount.value)

  return (
    <header className="flex flex-col md:flex-row items-center w-full h-auto md:h-16 px-3 bg-white">
      <div className="self-end mx-auto">
        <Tabs tabs={tabs} />
      </div>
      <div className="w-[400px]">
        <AccountSelect
          accounts={accounts.value}
          selectedAccount={selectedAccount}
          setSelectedAccount={setSelectedAccount}
        />
      </div>
    </header>
  )
}
