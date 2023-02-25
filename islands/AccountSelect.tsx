import { AccountSelect } from "components"
import { accounts, selectedAccount } from "./WalletConnect.tsx"

export default function Select() {
  return (
    <AccountSelect
      selectedAccount={selectedAccount.value}
      accounts={accounts.value}
      setSelectedAccount={console.log}
    />
  )
}
