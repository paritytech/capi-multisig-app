import { MultiAddress, Westend, westend } from "@capi/westend"
import { ss58, ValueRune } from "capi"
import { MultisigRune } from "capi/patterns/multisig"
import { Setup } from "common"
import { ScaleError } from "scale-codec"
import { SetupType } from "../types/index.js"

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

export function toMultisigRuneFromHex(
  setup: Setup,
): MultisigRune<Westend, ScaleError | typeof ScaleError> {
  return MultisigRune.fromHex(westend, setup.multisigHex)
}

export function toMultisigRune(setup: SetupType): MultisigRune<Westend, never> {
  const signatories = setup.members.map(([address]) => {
    return toPubKey(address)
  })

  return MultisigRune.from(westend, { signatories, threshold: setup.threshold })
}

export async function toSetupHex(
  setup: SetupType,
): Promise<Setup> {
  const multisigRune = toMultisigRune(setup)
  const multisigHex = await multisigRune.hex.run()
  const result = {
    id: setup.multisig,
    multisigHex,
    name: setup.name,
    stash: setup.stash,
  }
  return result
}

export async function fromSetupHex(
  setup: Setup,
): Promise<SetupType> {
  const multisig = await MultisigRune.fromHex(westend, setup.multisigHex).run()
  const members = multisig.signatories.map(
    (s): [user: string, proxy: string] => {
      return [ss58.encode(42, s), ""]
    },
  )
  const result: SetupType = {
    genesisHash: "",
    name: setup.name,
    members,
    threshold: multisig.threshold!,
    multisig: setup.id,
    stash: setup.stash!,
  }
  return result
}

export function toMultiAddressIdRune(
  address: string,
): ValueRune<MultiAddress.Id, never> {
  return MultiAddress.Id(toPubKey(address))
}
