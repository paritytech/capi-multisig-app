import { Page } from './templates/base'
import { CenteredCard } from '../components/CenteredCard'
import {
  Wizard,
  MultisigInit,
  MultisigMembers,
  MultisigFund,
  MultisigSummary,
} from '../components/wizard'

export function CreateMultisig() {
  return (
    <Page>
      <CenteredCard>
        <Wizard>
          <MultisigInit />
          <MultisigMembers />
          <MultisigFund />
          <MultisigSummary />
        </Wizard>
      </CenteredCard>
    </Page>
  )
}
