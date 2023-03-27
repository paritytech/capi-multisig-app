import { AccountSelect } from './AccountSelect.js'
import { Tabs } from './Tabs.js'
import type { Tab } from './Tabs.js'
import { accounts, defaultAccount } from '../signals/index.js'
import { WalletAccount } from '@talisman-connect/wallets'
import { useCallback } from 'preact/hooks'

const tabs: Tab[] = [
  { name: "Dashboard", href: "/" },
  { name: "Transaction history", href: "/transaction-history", disabled: true },
]

export function TopBar() {
  const setSelectedAccount = useCallback((account: WalletAccount) => {
    defaultAccount.value = account
  }, [])

  return (
    <header className="flex flex-col md:flex-row items-center w-full h-auto md:h-16 px-3 bg-white border-b border-border">
      <div className="self-end mx-auto flex items-center">
        <Tabs tabs={tabs} />
        <div className="py-2 px-7 bg-menu-bg text-gray-500 rounded-full">Soon</div>
      </div>

      <div className="w-60 my-2">
        <AccountSelect
          accounts={accounts.value}
          selectedAccount={defaultAccount.value}
          setSelectedAccount={setSelectedAccount}
        />
      </div>
    </header>
  )
}
