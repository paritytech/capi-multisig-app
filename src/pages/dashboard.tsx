import { Page } from './templates/base'
import { CenteredCard } from '../components/CenteredCard'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
import { IconPlus } from '../components/icons/IconPlus'
import { Identicon } from '../components/identicon/Identicon'

export function Dashboard() {
  return (
    <Page>
      <CenteredCard>
        <Link to="/create-multisig">
          <div className="flex flex-col gap-4 wrap">
            <Button iconLeft={<IconPlus />}>New multisig</Button>
          </div>
        </Link>
        <Identicon
          size={32}
          value="5EHufKvrjg3QGn4VFgFpSq7fybnLauire1ULHEcosAg8E47X"
        />
        <Identicon
          size={32}
          value="5EoB2vbYV3MtdcnaaEFqisGY8eERi3ttZ8ytQkYcVhBqV87u"
        />
        <Identicon
          size={32}
          value="5EP1x5VUMwQiaWHkNa5d6qE2FqRW8Apyw6P67NPUzzHMdDz4"
        />
      </CenteredCard>
    </Page>
  )
}
