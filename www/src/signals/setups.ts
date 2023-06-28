import { effect, Signal, signal } from "@preact/signals"
import { SetupType } from "../types/index.js"
import { getStoredSetups } from "../util/local-storage.js"
import { defaultAccount } from "./accounts.js"

const setups: Signal<SetupType[]> = signal<SetupType[]>([])

effect(function loadSetups() {
  if (defaultAccount.value) {
    setups.value = getStoredSetups(defaultAccount.value.address)
  }
})

export { setups }
