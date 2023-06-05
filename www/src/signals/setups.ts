import { effect, Signal, signal } from "@preact/signals"
import { Setup } from "common"
import { getStoredSetups } from "../util/local-storage.js"
import { defaultAccount } from "./accounts.js"

const setups: Signal<Setup[]> = signal<Setup[]>([])

effect(function loadSetups() {
  if (defaultAccount.value) {
    setups.value = getStoredSetups(defaultAccount.value.address)
  }
})

export { setups }
