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
          <Button variant="fill">New multisig</Button>
        </Link>
      </CenteredCard>
    </Page>
  )
}
