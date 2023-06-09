import { MultiAddress, westendDev as westend } from "@capi/westend-dev"
import { ss58 } from "capi"
import { isValidAddress } from "./address.js"

export async function estimateFee(address: string, value: bigint) {
  if (!address || !isValidAddress(address)) throw new Error("Invalid address")
  const addressPubKey = ss58.decode(address)[1]
  const fee = await westend.Balances.transfer({
    value,
    dest: MultiAddress.Id(addressPubKey),
  })
    .estimate()
    .run()
  return fee
}
