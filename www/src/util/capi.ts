import { System } from "@capi/polkadot_westend"
import { ss58 } from "capi"

export async function getBalance(address: string) {
  const addressPubKey = ss58.decode(address)[1]

  const balance = await System.Account.value(
    addressPubKey,
  ).run()

  return balance ? balance.data.free : 0
}
