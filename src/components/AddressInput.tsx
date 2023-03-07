import classNames from 'clsx'
import { JSX } from 'preact/jsx-runtime'
import { Identicon } from './identicon/Identicon'
import { isValidAddress } from '../util/isValidAddress'
import { IconVoidIdenticon } from './icons/IconVoidIdenticon'

interface Props {
  id?: string
  name?: string
  placeholder: string
  label: string
  value: string
  onChange: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void
}

export function AddressInput({
  id,
  name,
  placeholder,
  label,
  value,
  onChange,
}: Props) {
  const isValid = isValidAddress(value);

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="block text-gray-800">
        {label}
      </label>

      <div className="relative rounded-lg shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {isValid ? (
            <Identicon value={value} size={24} />
          ) : (
            <IconVoidIdenticon className="h-6 w-6"/>
          )}
        </div>

        <input
          type="text"
          name={name}
          id={id}
          value={value}
          className={classNames(
            'pl-10 block w-full rounded-lg border-gray-300 focus:ring-1 focus:ring-pink-500 focus:border-pink-500',
          )}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
