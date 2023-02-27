import { AccountSelect } from "components"
import { useEffect } from "https://esm.sh/v99/preact@10.11.0/hooks/src/index"
import { useState } from "preact/hooks"
import { accounts } from "./WalletConnect.tsx"

export default function Select() {
  const [selectedAccount, setSelectedAccount] = useState(accounts.value[0])

  return (
    <AccountSelect
      selectedAccount={selectedAccount}
      accounts={accounts.value}
      setSelectedAccount={setSelectedAccount}
    />
  )
}
