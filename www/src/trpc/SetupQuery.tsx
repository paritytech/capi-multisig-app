import { ss58 } from "capi"
import { Setup } from "common"
import { defaultAccount } from "../signals/accounts.js"
import { setups } from "../signals/setups.js"
import { SetupType } from "../types/index.js"
import { trpc } from "./trpc.js"

import { toSetup } from "../util/capi-helpers.js"
export function MultisigQuery() {
  if (defaultAccount.value?.address) {
    const getSetupsQuery = trpc.getAccountSetups.useQuery(
      ss58.encode(42, ss58.decode(defaultAccount.value.address)[1]),
    )
    const setUps = getSetupsQuery.data
    if (getSetupsQuery.data) {
      setups.value = getSetupsQuery.data?.map((s) => toSetup(s))
    }
  }
  return
}
