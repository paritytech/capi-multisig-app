import classNames from "classnames"
import { Identicon } from "components"
import { isValidAddress } from "misc"
import { useCallback, useEffect, useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"

interface Props {
  id?: string
  name?: string
  placeholder: string
  label: string
  value: string
  onChange: ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => void
  errors?: string[]
}

export function AddressInput({
  id,
  name,
  placeholder,
  label,
  value,
  onChange,
  errors,
}: Props) {
  const [isValid, setIsValid] = useState(false)

  const validateAddress = useCallback((value: string) => {
    setIsValid(isValidAddress(value))
  }, [])

  useEffect(() => {
    validateAddress(value)
  }, [validateAddress, value])

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="block text-gray-800">
        {label}
      </label>

      <div className="relative rounded-lg shadow-sm">
        {isValid && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Identicon value={value} size={20} />
          </div>
        )}
        <input
          type="text"
          name={name}
          id={id}
          value={value}
          className={classNames(
            "block w-full rounded-lg border-gray-300 focus:ring-1 focus:ring-pink-500 focus:border-pink-500",
            isValid ? "pl-10" : "pl-3",
          )}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>

      {errors && errors?.length > 0 && (
        <div className="flex-col gap-2">
          {errors.map((error) => (
            <p key={error} className="text-red-600">
              {error}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
