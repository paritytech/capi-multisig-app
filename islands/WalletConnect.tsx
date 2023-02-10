import { Menu, Transition } from "@headlessui/react"
import { signal } from "@preact/signals"
import { getWallets } from "@talisman-connect/wallets"
import type { Wallet, WalletAccount } from "@talisman-connect/wallets"
import { DAPP_NAME } from "misc"
import { useCallback } from "preact/hooks"

const selectedWallet = signal<Wallet | undefined>(undefined)
const accounts = signal<WalletAccount[]>([])
const selectedAccount = signal<WalletAccount | undefined>(undefined)

function SelectWallet({ wallets }: { wallets: Wallet[] }) {
  const selectWallet = useCallback((wallet: Wallet) => (event: Event) => {
    event.preventDefault()
    const getAccounts = async () => {
      try {
        await wallet.enable(DAPP_NAME)
        // TODO implement unsubscribe
        await wallet.subscribeAccounts((accounts_) => {
          if (accounts_) {
            accounts.value = accounts_
            selectedWallet.value = wallet
          }
        })
      } catch (err) {
        throw err
      }
    }
    getAccounts()
  }, [close])

  return (
    <div className="max-w-xl">
      <h2 className="text-lg font-medium text-gray-900">Connect Wallet</h2>
      <p className="mt-1 text-sm text-gray-500">You can use any Polkadot compatible wallet.</p>
      <ul role="list" className="mt-6 divide-y divide-gray-200 border-t border-b border-gray-200">
        {wallets.map((wallet, walletIdx) => (
          <li key={walletIdx}>
            <Menu.Item>
              <button
                onClick={selectWallet(wallet)}
                className="group flex  items-center space-x-3 py-4 w-full focus:outline-none"
              >
                <img src={wallet.logo.src} alt={wallet.logo.alt} className="h-10 w-10" />
                <div className="flex w-full flex-row justify-between">
                  <span className="text-sm font-medium text-tuna">{wallet.extensionName}</span>
                  {!wallet.installed && (
                    <a href={wallet.installUrl} className="text-sm text-gray-500">
                      Install
                    </a>
                  )}
                </div>
                {selectedWallet.value === wallet
                  && (
                    <div>
                      <span className="block h-4 w-4 rounded-full bg-green-400" />
                    </div>
                  )}
              </button>
            </Menu.Item>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex">
        <a href="#" className="text-sm text-tuna font-medium">
          What is a Wallet?
        </a>
      </div>
    </div>
  )
}

function SelectAccount() {
  const wallet = selectedWallet.value
  if (!wallet) {
    return <span>No wallet</span>
  }

  const disconnect = useCallback(() => {
    selectedWallet.value = undefined
    selectedAccount.value = undefined
  }, [])

  const selectAccount = useCallback((account: WalletAccount) => () => {
    selectedAccount.value = account
  }, [])

  return (
    <div className="space-y-4">
      <div className="group flex items-center w-full focus:outline-none px-4">
        <img src={wallet.logo.src} alt={wallet.logo.alt} className="h-10 w-10" />
        <span className="text-lg font-medium text-tuna ml-4">{wallet.extensionName}</span>

        <div className="flex flex-row ml-auto items-center gap-1">
          <button className="text-sm" onClick={disconnect}>Disconnect</button>
          <span className="block h-3 w-3 rounded-full bg-green-400" />
        </div>
      </div>
      <div className="space-y-2">
        {accounts.value.map((account) => (
          <Menu.Item>
            <button
              className="focus:outline-none flex flex-col w-full hover:bg-gray-100 px-4 py-2 rounded-md"
              onClick={selectAccount(account)}
            >
              <div className="flex w-full justify-between items-center gap-1">
                <span className="mr-4">{account.name}</span>
                {selectedAccount.value === account && (
                  <span className="block h-3 w-3 rounded-full bg-green-400" />
                )}
              </div>
              <span className="font-mono text-xs">{account.address}</span>
            </button>
          </Menu.Item>
        ))}
      </div>
    </div>
  )
}
export default function WalletConnect() {
  const supportedWallets: Wallet[] = getWallets()

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className={"w-40 border border-nebula hover:bg-platinum text-tuna w-full justify-center items-center rounded-md px-4 py-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"}
        >
          {selectedAccount.value
            ? <span className="">{selectedAccount.value.name}</span>
            : "Connect Wallet"}
        </Menu.Button>
        <Transition
          as="div"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute w-[440px] mt-px left-0 origin-top-right focus:outline-none rounded-lg shadow w-96 bg-white border border-nebula py-10 px-8 flex flex-col gap-4">
            {selectedWallet.value
              ? <SelectAccount />
              : <SelectWallet wallets={supportedWallets} />}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
