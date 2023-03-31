import { System } from "@capi/polkadot_westend"
import { ss58 } from "capi"

type Token = "DOT" | "KSM" | "WND"

export function formatBalance(
  balance: bigint,
  tokenSymbol: Token = "WND",
  decimalPoints = 12,
) {
  const str = balance.toString()
  const diff = str.length - decimalPoints
  if (diff > 0) {
    const units = str.slice(0, diff)
    const decimals = str.slice(diff, diff + 4)
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: tokenSymbol,
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    })
    return formatter.format(Number(`${units}.${decimals}`))
  }
  const decimals = "0".repeat(Math.abs(diff)).concat(str.slice(0, 4))
    .slice(0, 4)

  return `0.${decimals} ${tokenSymbol}`
}

export async function getBalance(address: string) {
  const addressPubKey = ss58.decode(address)[1]

  const balance = await System.Account.value(
    addressPubKey,
  ).run()

  if (!balance) throw new Error("Could not retrieve balance")

  return balance.data.free
}
