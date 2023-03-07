import { Page } from './templates/base'
import { CenteredCard } from '../components/CenteredCard'
import { Link } from 'react-router-dom'
import { useCallback, useState } from 'preact/hooks'
import { JSX } from 'preact/jsx-runtime'
import { Button } from '../components/Button'
import { IconPlus } from '../components/icons/IconPlus'
import { Identicon } from '../components/identicon/Identicon'
import { defaultAccount } from '../signals/accounts'
import { AddressInput } from '../components/AddressInput'

export function Dashboard() {
  const [address, setAddress] = useState('')

  const onChange = useCallback(
    ({ currentTarget }: JSX.TargetedEvent<HTMLInputElement, Event>) => {
      setAddress(currentTarget.value)
    },
    [],
  )

  return (
    <Page>
      <CenteredCard>
        <Link to="/create-multisig">
          <div className="flex flex-col gap-4 wrap">
            <Button iconLeft={<IconPlus />}>New multisig</Button>
          </div>
        </Link>
        {/* Only to test and verify that Identicon works */}
        {defaultAccount.value && (
          <div className="flex gap-2 items-center">
            <Identicon size={34} value={defaultAccount.value.address} />
            <span>{defaultAccount.value.name}</span>
          </div>
        )}
        {/* Only to test and verify that AddressInput works */}
        <AddressInput
          label="Address"
          placeholder="Enter recipient address"
          value={address}
          onChange={onChange}
        />
      </CenteredCard>
    </Page>
  )
}
