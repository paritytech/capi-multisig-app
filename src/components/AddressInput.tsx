import classNames from 'clsx'
import { JSX } from 'preact/jsx-runtime'
import { Identicon } from './identicon/Identicon'
import { isValidAddress } from '../util/isValidAddress'
import { VoidIdenticon } from './identicon/VoidIdenticon'

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
  const isValid = isValidAddress(value)

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="block text-input-text">
        {label}
      </label>

      <div className="relative rounded-lg shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center p-3">
          {isValid ? (
            <Identicon value={value} size={24} />
          ) : (
            <VoidIdenticon className="h-6 w-6" />
          )}
        </div>

        <input
          type="text"
          name={name}
          id={id}
          value={value}
          className={classNames(
            'pl-10 bg-input-bg block w-full rounded-lg border-input-border focus:ring-1 focus:ring-input-focus focus:border-input-focus',
          )}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
