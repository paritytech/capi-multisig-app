import { Page } from './templates/base'
import { CenteredCard } from '../components/CenteredCard'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { IconPlus } from '../components/icons/IconPlus'
import { Identicon } from '../components/identicon/Identicon'
import { defaultAccount } from '../signals/accounts'

export function Dashboard() {
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
            <Identicon size={32} value={defaultAccount.value.address} />
            <span>{defaultAccount.value.name}</span>
          </div>
        )}
      </CenteredCard>
    </Page>
  )
}
