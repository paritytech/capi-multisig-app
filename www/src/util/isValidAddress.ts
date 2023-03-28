import { ss58 } from "capi"

export function isValidAddress(address: unknown) {
  if (typeof address !== "string") return false
  try {
    return !!ss58.encode(...ss58.decode(address))
  } catch (_error) {
    return false
  }
}
