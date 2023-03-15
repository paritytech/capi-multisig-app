import { Listbox, Transition } from '@headlessui/react'
import { WalletAccount } from '@talisman-connect/wallets'
import { Fragment } from 'preact/jsx-runtime'
import { clsx } from 'clsx'
import { Identicon } from './identicon/Identicon.js'
import { shortAddress, shortAccountName } from '../util/short.js'
import { IconChevronDown } from './icons/IconChevronDown.js'
import { IconChevronUp } from './icons/IconChevronUp.js'
import { IconCheck } from './icons/IconCheck.js'
import { VoidIdenticon } from './identicon/VoidIdenticon.js'

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
          <Listbox.Button
            className={clsx(
              'h-12 w-60 flex items-center gap-2 p-3 cursor-default',
              'rounded-lg bg-jaguar text-select-text border border-select-border ',
              'focus:outline-none focus-visible:ring focus-visible:ring-cyan-700 focus-visible:ring-opacity-75 focus-visible:ring-offset focus-visible:ring-offset-cyan-700',
            )}
          >
            {selectedAccount && selectedAccount.name ? (
              <>
                <Identicon value={selectedAccount.address} size={24} />
                <span className="font-semibold overflow-hidden text-ellipsis">
                  {shortAccountName(selectedAccount.name)}
                </span>
              </>
            ) : (
              <>
                <VoidIdenticon className="h-6 w-6" />
                <span className="text-gray-900">Select Account</span>
              </>
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
            <Listbox.Options
              className={clsx(
                'absolute right-0 w-[400px] z-10 mt-2 py-4',
                'text-select-text bg-white border border-select-border',
                'shadow-lg rounded-md overflow-auto focus:outline-none',
              )}
            >
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
                      clsx({ 'bg-select-active': active || selected })
                    }
                    value={account}
                  >
                    {({ selected }: { selected: boolean }) => (
                      <div
                        className={clsx(
                          'flex flex-row gap-2 items-center p-3',
                          'rounded-md hover:bg-select-active cursor-pointer overflow-hidden text-ellipsis',
                        )}
                      >
                        <Identicon value={account.address} size={24} />
                        <p className="leading-4 overflow-hidden text-ellipsis">
                          <span className="font-semibold">
                            {shortAccountName(account.name)}
                          </span>
                        </p>
                        <p
                          className={clsx(
                            'ml-auto leading-4 overflow-hidden text-ellipsis',
                            { 'mr-8': !selected },
                          )}
                        >
                          <span>
                            {shortAddress(
                              account.address,
                              account.name?.length,
                            )}
                          </span>
                        </p>
                        {selected && (
                          <IconCheck className="h-6 w-6 text-dimmed" />
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
