import { CenteredCard } from "../components/CenteredCard.js"
import { Wizard } from "../components/wizard/index.js"
import { NewTransaction as NewTransaction_ } from "../components/wizard/transaction/NewTransaction.js"
import { SignTransaction } from "../components/wizard/transaction/SignTransaction.js"
import { Page } from "./templates/base.js"

export function NewTransaction() {
  return (
    <Page>
      <CenteredCard>
        <Wizard>
          <NewTransaction_ />
          <SignTransaction />
        </Wizard>
      </CenteredCard>
    </Page>
  )
}
