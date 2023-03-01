import { Page } from './templates/base'
import { defaultAccount } from '../signals/accounts'
import { CenteredCard } from '../components/CenteredCard'

export function CreateMultisig() {
  return (
    <Page>
      <CenteredCard>
        <h1>Create multisig page</h1>
        <p>Selected account: {defaultAccount.value?.name}</p>
      </CenteredCard>
    </Page>
  )
}
