import { System } from "@capi/polkadot_westend"
import { ss58 } from "capi"

export async function getBalance(address: string) {
  const addressPubKey = ss58.decode(address)[1]

  const balance = await System.Account.value(
    addressPubKey,
  ).run()

  const balanceFree = balance ? balance.data.free : 0

  return balanceFree
}

export function formatBalance(balance: number | bigint) {
  return `${balance.toString().slice(0, -10)}.${balance.toString().slice(-10)}`
}
