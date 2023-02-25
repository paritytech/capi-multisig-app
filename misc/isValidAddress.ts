import { ss58 } from "capi"

export const isValidAddress = (address: string) => {
  try {
    const [prefix, pubKey] = ss58.decode(address) as [prefix: number, pubKey: Uint8Array]
    const _encoded = ss58.encode(prefix, pubKey)
    return !!_encoded
  } catch (_error) {
    return false
  }
}
