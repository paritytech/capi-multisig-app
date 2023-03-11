import { CenteredCard } from "../components/CenteredCard.js"
import {
  MultisigFund,
  MultisigInit,
  MultisigMembers,
  MultisigSummary,
  Wizard,
} from "../components/wizard/index.js"
import { Page } from "./templates/base.js"

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
