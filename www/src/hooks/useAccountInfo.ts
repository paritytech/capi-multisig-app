import { westend } from "@capi/westend"
import { useQuery } from "@tanstack/react-query"
import { scope } from "../signals/scope.js"
import { toPubKey } from "../util/capi-helpers.js"

export function useAccountInfo(address: string) {
  return useQuery({
    queryKey: ["AccountInfo", address],
    queryFn: async () => {
      const accountInfo = await westend.System.Account.value(toPubKey(address))
        .run(scope.value)
      if (!accountInfo) return 0n
      return accountInfo.data.free
    },
  })
}
