import { MultiAddress, Westend, westend } from "@capi/westend"
import { ss58, ValueRune } from "capi"
import { MultisigRune } from "capi/patterns/multisig"
import { Setup } from "common"

export function toPubKey(address: string): Uint8Array {
  const [_, addressBytes] = ss58.decode(address)
  return addressBytes
}

export function toPrefix(address: string): number {
  const [prefix] = ss58.decode(address)
  return prefix
}

export function toMultisigRune(setup: Setup): MultisigRune<Westend, never> {
  const signatories = setup.members.map(([address]) => {
    return toPubKey(address)
  })

  return MultisigRune.from(westend, { signatories, threshold: setup.threshold })
}

export function toMultiAddressIdRune(
  address: string,
): ValueRune<MultiAddress.Id, never> {
  return MultiAddress.Id(toPubKey(address))
}
