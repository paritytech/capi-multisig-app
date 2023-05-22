import { clsx } from "clsx"
import { Identicon } from "../components/identicon/Identicon.js"
import { shortAddress } from "../util/address.js"

interface Props {
  name?: string
  address?: string
  shortenAddress?: boolean
}

export function AccountId(
  { name = "", address = "", shortenAddress = true }: Props,
) {
  return (
    <div className="flex">
      <Identicon
        size={24}
        value={address}
        className="mr-2"
      />

      {name && (
        <span className="font-bold mr-2">
          {name}
        </span>
      )}

      <span
        title={address}
        className={clsx({ truncate: shortenAddress })}
      >
        {shortenAddress ? shortAddress(address) : address}
      </span>
    </div>
  )
}
