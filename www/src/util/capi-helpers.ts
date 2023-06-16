import { MultiAddress } from "@capi/westend"
import { ss58, ValueRune } from "capi"
import { MultisigRune } from "capi/patterns/multisig"
import { Setup } from "common"
import { currentChain, SupportedChain } from "../signals/chain.js"

export function toPubKey(address: string): Uint8Array {
  const [_, addressBytes] = ss58.decode(address)
  return addressBytes
}

export function toPrefix(address: string): number {
  const [prefix] = ss58.decode(address)
  return prefix
}

export function toAddress(bytes: Uint8Array, prefix = 42): string {
  return ss58.encode(prefix, bytes)
}

export function toMultisigRune(
  setup: Setup,
): MultisigRune<SupportedChain, never> {
  const signatories = setup.members.map(([address]) => {
    return toPubKey(address)
  })

  return MultisigRune.from(currentChain.value, {
    signatories,
    threshold: setup.threshold,
  })
}

export function toMultiAddressIdRune(
  address: string,
): ValueRune<MultiAddress.Id, never> {
  return MultiAddress.Id(toPubKey(address))
}
