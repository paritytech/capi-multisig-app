import { RuntimeCall } from "@capi/westend"
import { useQuery } from "@tanstack/react-query"
import { hex } from "capi"
import { Setup } from "common"
import { useMemo } from "preact/hooks"
import { toAddress, toMultisigRune } from "../util/capi-helpers.js"
import { getCall } from "../util/local-storage.js"

type Proposal = {
  callHash: string
  call?: RuntimeCall
  approvals: string[]
  // depositor: string; TODO add once released: https://github.com/paritytech/capi/pull/1045
}

export function useProposals(setup: Setup) {
  const multisig = useMemo(() => toMultisigRune(setup), [setup])

  return useQuery<Array<Proposal>>({
    queryKey: ["proposals", setup.id],
    queryFn: async () => {
      const proposals: Array<Array<Uint8Array>> = await multisig.proposals(5)
        .run()

      return Promise.all(
        proposals.map(async ([, callHashBytes]) => {
          const callHash = "0x" + hex.encode(callHashBytes!)

          return {
            callHash,
            call: getCall(callHash),
            approvals:
              (await multisig.proposal(callHashBytes!).run())?.approvals.map((
                approvalBytes,
              ) => toAddress(approvalBytes)) ?? [],
          } as Proposal
        }),
      )
    },
  })
}
