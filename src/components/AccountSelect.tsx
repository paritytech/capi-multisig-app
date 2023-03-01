import { Listbox, Transition } from '@headlessui/react'
import { WalletAccount } from '@talisman-connect/wallets'
import { Fragment } from 'preact/jsx-runtime'
import { accounts, defaultAccount } from '../signals'
import { ChevronUpDownIcon } from './icons'

const placeholder = {
  name: 'No account found',
  address: '-',
}

export default function AccountSelect() {
  return (
    <div className="w-72 mr-4">
      <Listbox
        value={defaultAccount.value ?? (placeholder as WalletAccount)}
        onChange={(a) => {
          defaultAccount.value = a
        }}
        as={Fragment}
      >
        <div className="relative mt-1">
          <Listbox.Button className="listbox-button">
            <span className="block truncate">
              {defaultAccount.value?.name ?? placeholder.name}
            </span>
            <ChevronUpDownIcon />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="listbox-options">
              {accounts.value.map((acc) => (
                <Listbox.Option
                  key={acc.address}
                  className={({ active }: { active: boolean }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                    }`
                  }
                  value={acc}
                >
                  {({ selected }: { selected: boolean }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-bold' : 'font-normal'
                        }`}
                      >
                        {acc.name}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
