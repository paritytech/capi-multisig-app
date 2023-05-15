import { westend } from "@capi/westend"
import { ss58 } from "capi"

export function formatBalance(
  balance: bigint,
  { decimalPoints = 4, chainDecimals = 12 } = {},
) {
  let units = ""
  let decimals = ""
  const str = balance.toString()
  const diff = str.length - chainDecimals

  if (diff > 0) {
    units = str.slice(0, diff)
    decimals = str.slice(diff, diff + decimalPoints)
  } else {
    units = "0"
    decimals = "0".repeat(Math.abs(diff)).concat(str)
  }

  return Number(Number(`${units}.${decimals}`).toFixed(4))
}

export async function getBalance(address: string) {
  const addressPubKey = ss58.decode(address)[1]

  const balance = await westend.System.Account.value(
    addressPubKey,
  ).run()

  if (!balance) throw new Error("Could not retrieve balance")

  return balance.data.free
}
