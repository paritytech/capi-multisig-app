import { effect, Signal, signal } from "@preact/signals"
import { client } from "../trpc/trpc.js"
import { SetupType } from "../types/index.js"
import { fromSetupHex } from "../util/capi-helpers.js"
import { getStoredSetups } from "../util/local-storage.js"
import { defaultAccount } from "./accounts.js"

const setups: Signal<SetupType[]> = signal<SetupType[]>([])

effect(function loadSetups() {
  if (defaultAccount.value) {
    client.getAccountSetups.query(defaultAccount.value.address).then(
      async (setupsHex) => {
        const queriedSetups = await Promise.all(
          setupsHex?.map((s) => fromSetupHex(s)) || [],
        )
        setups.value = queriedSetups
      },
    )
  }
})

export { setups }
