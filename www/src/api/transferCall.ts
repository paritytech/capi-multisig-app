import { westend } from "@capi/westend"
import { toBalance } from "../util/balance.js"
import { toMultiAddressIdRune } from "../util/capi-helpers.js"

export function createTransferCall(from: string, to: string, amount: number) {
  const real = toMultiAddressIdRune(from)
  const dest = toMultiAddressIdRune(to)
  const value = toBalance(amount)

  return westend.Proxy.proxy({
    real,
    call: westend.Balances.transfer({
      dest,
      value,
    }),
  })
}
