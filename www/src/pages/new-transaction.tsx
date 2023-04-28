import { CenteredCard } from "../components/CenteredCard.js"
import { TransactionNew } from "../components/wizards/transaction/New.js"
import { TransactionSign } from "../components/wizards/transaction/Sign.js"
import { Wizard } from "../components/wizards/Wizard.js"
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
