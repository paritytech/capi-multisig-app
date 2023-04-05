import { Balances } from "@capi/westend"
import { MultiAddress } from "@capi/westend/types/sp_runtime/multiaddress.js"
import { ss58 } from "capi"
import { isValidAddress } from "./address.js"

export async function estimateFee(address: string, value: bigint) {
  if (!address || !isValidAddress(address)) throw new Error("Invalid address")
  const addressPubKey = ss58.decode(address)[1]
  const fee = await Balances.transfer({
    value,
    dest: MultiAddress.Id(addressPubKey),
  })
    .feeEstimate()
    .run()
  return fee.partialFee
}
