import { Listbox, Transition } from '@headlessui/react'
import { WalletAccount } from '@talisman-connect/wallets'
import { Fragment } from 'preact/jsx-runtime'
import classNames from 'clsx'
import { Identicon } from './identicon/Identicon'
import { shortAddress } from '../util/shortAddress'
import { IconChevronDown } from './icons/IconChevronDown'
import { IconChevronUp } from './icons/IconChevronUp'
import { IconCheck } from './icons/IconCheck'
import { VoidIdenticon } from './identicon/VoidIdenticon'

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
          <Listbox.Button className="h-12 flex items-center w-full rounded-lg bg-jaguar text-select-text border border-select-border p-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700">
            {selectedAccount ? (
              <span className="flex items-center gap-2">
                <Identicon value={selectedAccount.address} size={24} />
                <span className="font-semibold">{selectedAccount.name}</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <VoidIdenticon className="h-6 w-6" />
                <p className="text-gray-900">Select Account</p>
              </span>
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
            <Listbox.Options className="absolute right-0 min-w-[400px] z-10 mt-2 w-full text-select-text bg-white border border-select-border shadow-lg max-h-56 rounded-md py-4 overflow-auto focus:outline-none sm:text-sm">
              {accounts.length ? (
                accounts.map((account) => (
                  <Listbox.Option
                    key={account.name}
                    className={({
                      active,
                      selected,
                    }: {
                      active: boolean
                      selected: boolean
                    }) =>
                      classNames({ 'bg-select-active': active || selected })
                    }
                    value={account}
                  >
                    {({ selected }: { selected: boolean }) => (
                      <div
                        className={classNames(
                          'flex flex-row gap-2 items-center p-3 rounded-md hover:bg-select-active cursor-pointer',
                        )}
                      >
                        <Identicon value={account.address} size={24} />
                        <p className="leading-4">
                          <span className="font-semibold">{account.name}</span>
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
                  No accounts.
                </div>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
