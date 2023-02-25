import { AddressInput } from "components"
import { useCallback, useState } from "preact/hooks"
import { JSX } from "preact/jsx-runtime"

export default function Inputs() {
  const [address, setAddress] = useState("")

  const onChange = useCallback(({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    setAddress(currentTarget.value)
  }, [])

  return (
    <AddressInput
      placeholder="Address"
      label="Address"
      value={address}
      onChange={onChange}
    />
  )
}
