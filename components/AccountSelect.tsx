import { Listbox, Transition } from "@headlessui/react"
import type { WalletAccount } from "@talisman-connect/wallets"
import classNames from "classnames"
import { IconCheck, IconChevronDown, Identicon } from "components"

export function AccountSelect({
  selectedAccount,
  accounts,
  setSelectedAccount,
}: {
  accounts: WalletAccount[]
  selectedAccount?: WalletAccount
  setSelectedAccount: (account: WalletAccount) => void
}) {
  return (
    <Listbox value={selectedAccount} onChange={setSelectedAccount}>
      {({ open }: { open: boolean }) => (
        <div className="mt-1 relative">
          <Listbox.Button className="relative w-full rounded-lg bg-jaguar border-gray-300 text-gray-900 border border-gray-300 pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500">
            {selectedAccount
              ? (
                <span className="flex items-center gap-2">
                  <Identicon value={selectedAccount.address} size={32} />
                  <span className="font-bold">
                    {selectedAccount.name}
                  </span>
                  <span>
                    {selectedAccount.address}
                  </span>
                </span>
              )
              : <p className="text-gray-900">Select Account</p>}

            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <IconChevronDown className="w-6 h-6" />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={"div"}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
              {accounts.map((account) => (
                <Listbox.Option
                  key={account}
                  className={({ active }: { active: boolean }) =>
                    classNames({ "bg-gray-100": active })}
                  value={account}
                >
                  {({
                    selected,
                    active,
                  }: {
                    selected: boolean
                    active: boolean
                  }) => (
                    <div
                      className={classNames(
                        "flex flex-row gap-4 items-center p-2 rounded-md hover:bg-gray-100 cursor-pointer",
                      )}
                    >
                      <div className="flex gap-2 items-center text-black text-left w-full ">
                        <Identicon value={account.address} size={32} />
                        <p className="leading-4">
                          <span className="font-bold">{account.name}</span>
                        </p>
                        <p className=" leading-4">
                          <span className="">{account.address}</span>
                        </p>
                        {selected && <IconCheck className="h-6 w-6 text-green-500" />}
                      </div>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
