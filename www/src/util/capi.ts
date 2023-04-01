import { Balances, chain, System } from "@capi/polkadot_westend"
import { MultiAddress } from "@capi/polkadot_westend/types/sp_runtime/multiaddress.js"
import { ss58 } from "capi"
import { isValidAddress } from "./isValidAddress.js"

type Token = "DOT" | "KSM" | "WND"

export function formatBalance(
  balance: bigint,
  decimalPoints = 4,
  tokenSymbol: Token = "WND",
  chainDecimals = 12,
) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: tokenSymbol,
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  })
  let units = ""
  let decimals = ""
  const str = balance.toString()
  const diff = str.length - chainDecimals

  if (diff > 0) {
    units = str.slice(0, diff)
    decimals = str.slice(diff, diff + decimalPoints)
  } else {
    units = "0"
    decimals = "0".repeat(Math.abs(diff)).concat(str.slice(0, decimalPoints))
      .slice(0, decimalPoints)
  }

  return formatter.format(Number(`${units}.${decimals}`))
}

export async function getBalance(address: string) {
  const addressPubKey = ss58.decode(address)[1]

  const balance = await System.Account.value(
    addressPubKey,
  ).run()

  if (!balance) throw new Error("Could not retrieve balance")

  return balance.data.free
}

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

export async function getExistentialDeposit() {
  return await chain
    .pallet("Balances")
    .constant("ExistentialDeposit").decoded
    .run()
}
