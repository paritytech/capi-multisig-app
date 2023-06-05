import { RuntimeCall } from "@capi/westend"
import { useQuery } from "@tanstack/react-query"
import { hex } from "capi"
import { Setup } from "common"
import { useMemo } from "preact/hooks"
import { toMultisigRune } from "../util/capi-helpers.js"
import { getCall } from "../util/local-storage.js"

type Proposal = [callHash: string, callData?: RuntimeCall]

export function useProposals(setup: Setup) {
  const multisig = useMemo(() => toMultisigRune(setup), [setup])

  return useQuery<Array<Proposal>>({
    queryKey: ["proposals", setup.id],
    queryFn: async () => {
      const proposals: Array<Array<Uint8Array>> = await multisig.proposals(5)
        .run()
      return proposals
        .map(([, callHashBytes]) => "0x" + hex.encode(callHashBytes!))
        .map((callHash) => [callHash, getCall(callHash)] as Proposal)
    },
  })
}
