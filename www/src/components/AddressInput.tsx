import { clsx } from 'clsx'
import type { JSX } from 'preact/jsx-runtime'
import { Identicon } from './identicon/Identicon.js'
import { isValidAddress } from '../util/isValidAddress.js'
import { VoidIdenticon } from './identicon/VoidIdenticon.js'
import { ForwardedRef, forwardRef } from 'preact/compat'

interface Props {
  id?: string
  name?: string
  placeholder: string
  value?: string
  onChange: (e: JSX.TargetedEvent<HTMLInputElement, Event>) => void
}

export const AddressInput = forwardRef(({
  id,
  name,
  placeholder,
  value,
  ...props
}: Omit<JSX.HTMLAttributes<HTMLInputElement>, 'value'> & Props, ref: ForwardedRef<HTMLInputElement>) => {
  const isValid = value && isValidAddress(value)

  return (
    <div className="relative rounded-lg shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center p-3">
        {isValid ? (
          <Identicon value={value} size={24} />
        ) : (
          <VoidIdenticon className="h-6 w-6" />
        )}
      </div>

      <input
        ref={ref}
        type="text"
        name={name}
        id={id}
        className={clsx(
          'pl-10 bg-input-bg block w-full rounded-lg border-input-border focus:ring-1 focus:ring-input-focus focus:border-input-focus',
        )}
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
})
