import { Menu, Transition } from "@headlessui/react"
import { computed, signal } from "@preact/signals"
import { getWallets } from "@talisman-connect/wallets"
import type { Wallet, WalletAccount } from "@talisman-connect/wallets"
import classNames from "classnames"
import { DAPP_NAME, SELECTED_ACCOUNT, SELECTED_WALLET } from "misc"
import type { Web3GlobalThis } from "misc"
import { useCallback, useEffect } from "preact/hooks"
import { putAccount } from "../misc/db/putAccount.ts"

export const selectedWallet = signal<Wallet | undefined>(undefined)
export const accounts = signal<WalletAccount[]>([])
export const selectedAccount = signal<WalletAccount | undefined>(undefined)

const multisigs = computed(async () => {
  if (selectedAccount.value?.address) {
    const res = await fetch("/api/query_multi", {
      // TODO separate function
      // TODO do we need all these headers?
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      credentials: "same-origin",
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        pk: selectedAccount.value?.address,
      }),
    }).then((response) => response.json())
    // .then((data) => {
    //   console.log('Multisigs:', data.Items);
    // })
    console.log("fetch multisigs: ", res)
    return res
  }
  return "unknown"
})

const setSelectedWallet = async (wallet: Wallet) => {
  try {
    await wallet.enable(DAPP_NAME)
    await wallet.subscribeAccounts((accounts_) => {
      if (accounts_) {
        accounts.value = accounts_
        localStorage.setItem(SELECTED_WALLET, wallet.extensionName)
        selectedWallet.value = wallet

        const isAccountSelected = !!localStorage.getItem(SELECTED_ACCOUNT)
        if (isAccountSelected) return
        const firstAccount = accounts_[0]
        if (firstAccount) {
          selectedAccount.value = firstAccount
          localStorage.setItem(SELECTED_ACCOUNT, firstAccount.address)
          putAccount({
            pk: firstAccount.address,
            sk: `REAL#${firstAccount.address}`,
            name: firstAccount.name,
          })
        }
      }
    })
  } catch (err) {
    throw err
  }
}

const setIntervalToSelectWallet = (wallet: Wallet) => {
  let counter = 0
  // Sets an interval to listen to `window` until the
  // `injectedWeb3` property is present
  const interval = setInterval(() => {
    counter++
    if (counter === 10) {
      clearInterval(interval)
    } else {
      const isExtensionLoaded = (window as Web3GlobalThis)?.injectedWeb3
      setSelectedWallet(wallet)
      if (isExtensionLoaded) {
        clearInterval(interval)
      }
    }
  }, 100)
}

function SelectWallet({ wallets }: { wallets: Wallet[] }) {
  const selectWallet = useCallback((wallet: Wallet) => (event: Event) => {
    event.preventDefault()
    setSelectedWallet(wallet)
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
                disabled={!wallet.installed}
                className={classNames(
                  "group flex items-center space-x-3 py-4 w-full focus:outline-none",
                  { "cursor-not-allowed": !wallet.installed },
                )}
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

const EmptyStateNoAccounts = () => (
  <div className="flex flex-col items-center ">
    <h3 className="mt-2 text-sm font-medium text-gray-900">No accounts</h3>
    <p className="mt-1 text-sm text-gray-500">Get started by creating a new account.</p>
  </div>
)

function SelectAccount() {
  const wallet = selectedWallet.value
  if (!wallet) {
    return <span>No wallet</span>
  }

  const disconnect = useCallback(() => {
    selectedWallet.value = undefined
    selectedAccount.value = undefined
    localStorage.removeItem(SELECTED_WALLET)
    localStorage.removeItem(SELECTED_ACCOUNT)
  }, [])

  const selectAccount = useCallback((account: WalletAccount) => () => {
    selectedAccount.value = account
    localStorage.setItem(SELECTED_ACCOUNT, account.address)
    putAccount({ pk: account.address, sk: `REAL#${account.address}`, name: account.name })
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
        {accounts.value.length
          ? accounts.value.map((account) => (
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
          ))
          : <EmptyStateNoAccounts />}
      </div>
    </div>
  )
}
export default function WalletConnect() {
  const supportedWallets: Wallet[] = getWallets()

  useEffect(() => {
    const selectedWalletName = localStorage.getItem(SELECTED_WALLET)
    const selectedWallet_ = supportedWallets.find(
      (currentWallet) => currentWallet.extensionName === selectedWalletName,
    )

    if (selectedWallet_) {
      if (accounts.value.length > 0) {
        const selectedAccountAddress = localStorage.getItem(SELECTED_ACCOUNT)
        const selectedAccount_ = accounts.value.find((currentAccount) =>
          currentAccount.address === selectedAccountAddress
        )
        if (selectedAccount_) {
          selectedAccount.value = selectedAccount_
        }
      } else {
        setIntervalToSelectWallet(selectedWallet_)
      }
    }
  }, [selectedWallet.value])

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
          <Menu.Items className="absolute w-[440px] mt-px right-0 origin-top-right focus:outline-none rounded-lg shadow bg-white border border-nebula py-10 px-8 flex flex-col gap-4">
            {selectedWallet.value
              ? <SelectAccount />
              : <SelectWallet wallets={supportedWallets} />}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
