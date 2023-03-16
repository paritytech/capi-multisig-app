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
    <header className="flex flex-col md:flex-row items-center w-full h-auto md:h-16 px-3 bg-white">
      <div className="self-end mx-auto">
        <Tabs tabs={tabs} />
      </div>
      <div className="w-[240px] my-2">
        <AccountSelect
          accounts={accounts.value}
          selectedAccount={defaultAccount.value}
          setSelectedAccount={setSelectedAccount}
        />
      </div>
    </header>
  )
}
