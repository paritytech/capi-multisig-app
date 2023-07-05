import { useEffect } from "preact/hooks"
import { CenteredCard } from "../components/CenteredCard.js"
import { resetFormData } from "../components/wizards/transaction/formData.js"
import { TransactionNew } from "../components/wizards/transaction/New.js"
import { TransactionSign } from "../components/wizards/transaction/Sign.js"
import { Wizard } from "../components/wizards/Wizard.js"
import { Page } from "./templates/base.js"

export function NewTransaction() {
  useEffect(function onUnmount() {
    return resetFormData
  }, [])
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
