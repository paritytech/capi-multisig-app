import { Page } from './templates/base'
import { CenteredCard } from '../components/CenteredCard'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { IconPlus } from '../components/icons/IconPlus'

export function Dashboard() {
  return (
    <Page>
      <CenteredCard>
        <Link to="/create-multisig">
          <div className="flex flex-col gap-4 wrap">
            <Button variant="fill" iconLeft={<IconPlus />}>
              New multisig
            </Button>
          </div>
        </Link>
      </CenteredCard>
    </Page>
  )
}
