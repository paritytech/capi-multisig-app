import { CenteredCard } from "../components/CenteredCard.js"
import { MultisigFund } from "../components/wizards/multisig/Fund.js"
import { MultisigInit } from "../components/wizards/multisig/Init.js"
import { MultisigMembers } from "../components/wizards/multisig/Members.js"
import { MultisigSummary } from "../components/wizards/multisig/Summary.js"
import { Wizard } from "../components/wizards/Wizard.js"
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
