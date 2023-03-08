import { Listbox, Transition } from '@headlessui/react'
import { WalletAccount } from '@talisman-connect/wallets'
import { Fragment } from 'preact/jsx-runtime'
import classNames from 'clsx'
import { Identicon } from './identicon/Identicon'
import { shortAddress } from '../util/shortAddress'
import { IconChevronDown } from './icons/IconChevronDown'
import { IconChevronUp } from './icons/IconChevronUp'
import { IconCheck } from './icons/IconCheck'

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
        <div className="relative w-full">
          <Listbox.Button className="h-12 flex items-center w-full rounded-lg bg-jaguar border-gray-300 text-gray-900 border border-gray-300 px-3 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500">
            {selectedAccount ? (
              <span className="flex items-center gap-2">
                <Identicon value={selectedAccount.address} size={32} />
                <span className="font-bold">{selectedAccount.name}</span>
                <span>{shortAddress(selectedAccount.address)}</span>
              </span>
            ) : (
              <p className="text-gray-900">Select Account</p>
            )}

            <span className="ml-auto text-dimmed">
              {open ? (
                <IconChevronUp className="w-6 h-6" />
              ) : (
                <IconChevronDown className="w-6 h-6" />
              )}
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 shadow-lg max-h-56 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
              {accounts.length ? (
                accounts.map((account) => (
                  <Listbox.Option
                    key={account}
                    className={({ active }: { active: boolean }) =>
                      classNames({ 'bg-magnolia': active })
                    }
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
                          'flex flex-row gap-2 items-center px-3 py-2 rounded-md hover:bg-magnolia cursor-pointer',
                        )}
                      >
                        <Identicon value={account.address} size={32} />
                        <p className="leading-4">
                          <span className="font-bold">{account.name}</span>
                        </p>
                        <p className="leading-4">
                          <span>{shortAddress(account.address)}</span>
                        </p>
                        {selected && (
                          <div className="ml-auto">
                            <IconCheck className="h-6 w-6 text-dimmed" />
                          </div>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))
              ) : (
                <div className="h-20 flex items-center justify-center">
                  No accounts. Please connect a wallet
                </div>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
