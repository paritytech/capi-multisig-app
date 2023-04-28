import { CenteredCard } from "../components/CenteredCard.js"
import { TransactionNew } from "../components/wizard/TransactionNew.js"
import { TransactionSign } from "../components/wizard/TransactionSign.js"
import { Wizard } from "../components/wizard/Wizard.js"
import { Page } from "./templates/base.js"

export function NewTransaction() {
  return (
    <Page>
      <CenteredCard>
        <Wizard>
          <TransactionNew />
          <TransactionSign />
        </Wizard>
      </CenteredCard>
    </Page>
  )
}
