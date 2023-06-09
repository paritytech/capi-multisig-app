import { westendDev as westend } from "@capi/westend-dev"
import { ss58 } from "capi"

export function formatBalance(
  balance: bigint,
  { precision = 4, tokenDecimals = 12 } = {},
) {
  let units = ""
  let decimals = ""
  const str = balance.toString()
  const diff = str.length - tokenDecimals

  if (diff > 0) {
    units = str.slice(0, diff)
    decimals = str.slice(diff, diff + precision)
  } else {
    units = "0"
    decimals = "0".repeat(Math.abs(diff)).concat(str.slice(0, precision)).slice(
      0,
      precision,
    )
  }

  return Number(`${units}.${decimals}`).toFixed(precision)
}

export async function getBalance(address: string) {
  const addressPubKey = ss58.decode(address)[1]

  const balance = await westend.System.Account.value(addressPubKey).run()

  if (!balance) throw new Error("Could not retrieve balance")

  return balance.data.free
}

export function toBalance(value: number, tokenDecimals = 12): bigint {
  if (Number.isInteger(value)) {
    return BigInt(value) * 10n ** BigInt(tokenDecimals)
  }

  const [integer = "0", _ = "0"] = String(value).split(".")
  const decimal = _.substring(0, tokenDecimals)
  return BigInt(integer) * 10n ** BigInt(tokenDecimals)
    + BigInt(decimal) * 10n ** BigInt(tokenDecimals - decimal.length)
}
