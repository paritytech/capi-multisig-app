import { effect, Signal, signal } from "@preact/signals"
import { getWalletBySource, WalletAccount } from "@talisman-connect/wallets"
import { retrieveStored } from "../util/local-storage.js"
import { retry } from "../util/retry.js"

interface InjectedWindow extends Window {
  injectedWeb3: unknown
}

const accounts: Signal<WalletAccount[]> = signal([])
const storedAccount = retrieveStored("defaultAccount")
const storedExtension = retrieveStored("defaultExtension")
const defaultAccount = signal(storedAccount)
const defaultExtension = signal(storedExtension)

effect(
  () =>
    defaultAccount.value
    && localStorage.setItem(
      "defaultAccount",
      JSON.stringify(defaultAccount.value),
    ),
)

effect(
  () =>
    defaultExtension.value
    && localStorage.setItem(
      "defaultExtension",
      JSON.stringify(defaultExtension.value),
    ),
)

async function maybeInjectedAccounts() {
  if (!(window as unknown as InjectedWindow).injectedWeb3) throw new Error()
  await getAccounts()
}

async function getAccounts() {
  const wallet = getWalletBySource("polkadot-js")
  if (wallet) {
    defaultExtension.value = wallet
    try {
      await wallet.enable("Capi Multisig App")
      // TODO unsubscribe unknown
      await wallet.subscribeAccounts((a) => {
        accounts.value = a ?? []
        if (!storedAccount && accounts.value.length > 0) {
          defaultAccount.value = accounts.value[0]
        }
      })
    } catch (err) {
      console.error(err)
    }
  } else {
    console.error("Polkadot.js extension is not installed")
  }
}

await retry(maybeInjectedAccounts, {
  retries: 6,
  retryIntervalMs: 300,
})

export { accounts, defaultAccount, defaultExtension }
