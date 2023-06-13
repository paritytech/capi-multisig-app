import { useQuery } from "@tanstack/react-query"
import { currentChain } from "../signals/chain.js"
import { toPubKey } from "../util/capi-helpers.js"

export function useAccountInfo(address: string) {
  return useQuery({
    queryKey: ["AccountInfo", address],
    queryFn: async () => {
      const accountInfo = await currentChain.value.System.Account.value(
        toPubKey(address),
      ).run()
      if (!accountInfo) return 0n
      return accountInfo.data.free
    },
  })
}
