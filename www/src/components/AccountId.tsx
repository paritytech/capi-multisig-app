import { WalletAccount } from "@talisman-connect/wallets"
import { Identicon } from "../components/identicon/Identicon.js"
import { shortAddress } from "../util/address.js"

interface Props {
  account: WalletAccount | undefined
}

export function AccountId({ account }: Props) {
  return account
    ? (
      <div className="flex">
        <Identicon
          size={24}
          value={account.address}
          className="mr-2"
        />
        <span className="font-bold mr-2">
          {account.name}
        </span>
        <span>{shortAddress(account.address)}</span>
      </div>
    )
    : null
}
