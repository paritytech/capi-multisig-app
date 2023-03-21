import { clsx } from 'clsx'
import type { JSX } from 'preact/jsx-runtime'
import { Identicon } from './identicon/Identicon.js'
import { isValidAddress } from '../util/isValidAddress.js'
import { VoidIdenticon } from './identicon/VoidIdenticon.js'
import { ForwardedRef, forwardRef } from 'preact/compat'

interface Props extends JSX.HTMLAttributes<HTMLInputElement> {
  value?: string
}

export const AddressInput = forwardRef(({
  value,
  ...props
}:
  Props,
  ref: ForwardedRef<HTMLInputElement>
) => {
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
        value={value}
        type="text"
        className={clsx(
          'pl-10 h-12 block w-full rounded-lg border-input-border',
          'focus:outline-none focus-visible:ring focus-visible:ring-cyan-700 focus-visible:ring-opacity-75 focus-visible:ring-offset focus-visible:ring-offset-cyan-700',
        )}
        {...props}
      />
    </div>
  )
})
