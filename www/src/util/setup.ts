import { Westend, westend } from "@capi/westend"
import { ss58 } from "capi"
import { MultisigRune } from "capi/patterns/multisig"
import { Setup } from "common"

export function toMultisigRune(setup: Setup): MultisigRune<Westend, never> {
  const signatories = setup.members.map(([address]) => {
    const [_, addressBytes] = ss58.decode(address)
    return addressBytes
  })

  return MultisigRune.from(westend, { signatories, threshold: setup.threshold })
}
