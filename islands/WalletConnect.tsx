import { Menu, Transition } from "@headlessui/react"
import { signal } from "@preact/signals"
import { getWallets } from "@talisman-connect/wallets"
import type { Wallet } from "@talisman-connect/wallets"
import classNames from "classnames"

const DAPP_NAME = "capi-multisig"

const accounts = signal([])
const selectedAccount = signal(undefined)

const shortenAddress = (address: string) =>
  `${address.slice(0, 9)}...${address.slice(address.length - 8, address.length)}`

const WalletConnect = () => {
  const supportedWallets: Wallet[] = getWallets()

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className={"w-auto border border-nebula hover:bg-platinum text-tuna w-full justify-center items-center rounded-md px-4 py-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"}
        >
          {selectedAccount.value
            ? (
              <p className="flex-inline items-center">
                <span className="mr-4">{selectedAccount.value.name}</span>
                <span className="font-mono text-sm">
                  {shortenAddress(selectedAccount.value.address)}
                </span>
              </p>
            )
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
          <Menu.Items className="absolute left-0 origin-top-right focus:outline-none rounded-lg mt-px shadow w-96 bg-white border border-nebula py-10 px-8 flex flex-col gap-4">
            <p className="text-xl text-center">Connect a wallet</p>
            {accounts.value.length > 0
              ? (
                <>
                  {accounts.value.map((account) => (
                    <div>
                      <button
                        className="focus:outline-none"
                        onClick={(event) => {
                          event.preventDefault()
                          selectedAccount.value = account
                        }}
                      >
                        <span className="mr-4">{account.name}</span>
                        <span className="font-mono text-sm">{shortenAddress(account.address)}</span>
                      </button>
                    </div>
                  ))}
                </>
              )
              : supportedWallets.map((wallet: Wallet) => {
                return (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={classNames({ "bg-jaguar": active }, "px-4 py-2")}
                        key={wallet.extensionName}
                        onClick={async (event) => {
                          event.preventDefault()
                          try {
                            await wallet.enable(DAPP_NAME)
                            // TODO unsubscribe
                            const unsubscribe = await wallet.subscribeAccounts((accounts_) => {
                              accounts.value = accounts_
                              console.log("accounts.values:", accounts.value)
                            })
                          } catch (err) {
                            // TODO Handle error. Refer to `libs/wallets/src/lib/errors`
                          }
                        }}
                      >
                        {wallet.title}
                      </button>
                    )}
                  </Menu.Item>
                )
              })}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default WalletConnect
