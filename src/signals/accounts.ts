import { effect, signal } from '@preact/signals'
import { getWalletBySource, WalletAccount } from '@talisman-connect/wallets'
import { retrieveStored } from '../util/localStorage'

const accounts = signal<WalletAccount[]>([])
await getAccounts()
const storedAccount = retrieveStored('defaultAccount')
const storedExtension = retrieveStored('defaultExtension')
const defaultAccount = signal(storedAccount)
const defaultExtension = signal(storedExtension)

effect(
  () =>
    defaultAccount.value &&
    localStorage.setItem(
      'defaultAccount',
      JSON.stringify(defaultAccount.value),
    ),
)

async function getAccounts() {
  const wallet = getWalletBySource('polkadot-js')
  if (wallet) {
    try {
      await wallet.enable('Capi Multisig App')
      // TODO unsubscribe unknown
      const unsubscribe = await wallet.subscribeAccounts((a) => {
        accounts.value = a ?? []
        if (!storedAccount && accounts.value.length > 0) {
          defaultAccount.value = accounts.value[0]
        }
      })
    } catch (err) {
      console.error(err)
    }
  } else {
    console.error('Polkadot.js extension is not installed')
  }
}

export { accounts, defaultAccount, defaultExtension }
