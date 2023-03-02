import classNames from 'clsx'
import { JSX } from 'preact'
import type { ComponentChildren } from 'preact'

export const Button = ({
  variant,
  disabled,
  className,
  iconLeft,
  iconRight,
  full,
  children,
  ...rest
}: JSX.IntrinsicAttributes &
  JSX.HTMLAttributes<HTMLButtonElement> & {
    variant: 'fill' | 'ghost'
    full?: boolean
    iconLeft?: ComponentChildren
    iconRight?: ComponentChildren
  }) => {
  return (
    <button
      className={classNames(
        'flex flex-row gap-3 items-center justify-center rounded-full',
        'font-semibold py-3 px-10',
        'outline-none focus:outline-none',
        { 'w-full': full },
        {
          'bg-transparent text-button hover:text-button/90':
            variant === 'ghost',
        },
        {
          'bg-button hover:bg-button/90 text-white': variant === 'fill',
        },
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {iconLeft && (
        <div className="flex items-center h-5 w-5 -mr-1">{iconLeft}</div>
      )}
      {children}
      {iconRight && (
        <div className="flex items-center h-5 w-5 -ml-1">{iconRight}</div>
      )}
    </button>
  )
}
