import { WalletAccount } from "@talisman-connect/wallets"
import { clsx } from "clsx"
import { Identicon } from "../components/identicon/Identicon.js"
import { shortAddress } from "../util/address.js"

interface Props {
  account?: Partial<WalletAccount> & { address: string }
  shortenAddress?: boolean
}

export function AccountId({ account, shortenAddress = true }: Props) {
  if (!account) return null

  return (
    <div className="flex">
      <Identicon
        size={24}
        value={account.address}
        className="mr-2"
      />

      {account.name && (
        <span className="font-bold mr-2">
          {account.name}
        </span>
      )}
        
      <span
        title={account.address}
        className={clsx({ truncate: shortAddress })}
      >
        {shortenAddress ? shortAddress(account.address) : account.address}
      </span>
    </div>
  )
}
