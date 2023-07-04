import { effect, Signal, signal } from "@preact/signals"
import { storageClient } from "../storage/index.js"
import { SetupType } from "../types/index.js"
import { defaultAccount } from "./accounts.js"

const setups: Signal<SetupType[]> = signal<SetupType[]>([])

effect(function loadSetups() {
  if (defaultAccount.value) {
    storageClient.getSetups(defaultAccount.value.address).then(
      async (queriedSetups) => {
        setups.value = queriedSetups
      },
    )
  }
})

export { setups }
