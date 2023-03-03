import { Page } from './templates/base'
// import { defaultAccount } from '../signals/accounts'
import { CenteredCard } from '../components/CenteredCard'
import WizardApp from '../components/WizardApp'

export function CreateMultisig() {
  return (
    <Page>
      <CenteredCard>
        <WizardApp />
        {/* <h1>Create multisig page</h1>
        <p>Selected account: {defaultAccount.value?.name}</p> */}
      </CenteredCard>
    </Page>
  )
}
