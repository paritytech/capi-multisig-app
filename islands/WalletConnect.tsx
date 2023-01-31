import { Menu, Transition } from "@headlessui/react"
import { getWallets } from "@talisman-connect/wallets"
import type { Wallet } from "@talisman-connect/wallets"
import classNames from "classnames"

const DAPP_NAME = "capi-multisig"

const WalletConnect = () => {
  const supportedWallets: Wallet[] = getWallets()
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className={"border border-nebula hover:bg-platinum text-tuna inline-flex w-full justify-center rounded-md px-4 py-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"}
        >
          Connect Wallet
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
          <Menu.Items className="absolute left-0 origin-top-right focus:outline-none rounded-lg mt-px shadow w-96 bg-white border border-nebula py-10 px-4">
            {supportedWallets.map((wallet: Wallet) => {
              return (
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={classNames({ "bg-jaguar": active }, "px-4 py-2")}
                      key={wallet.extensionName}
                      onClick={async () => {
                        try {
                          await wallet.enable(DAPP_NAME)
                          const unsubscribe = await wallet.subscribeAccounts((accounts) => {
                            console.log("accounts: ", accounts)
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
