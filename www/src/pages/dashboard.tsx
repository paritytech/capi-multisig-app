import { Link } from "react-router-dom"
import { Button } from "../components/Button.js"
import { CenteredCard } from "../components/CenteredCard.js"
import { FeesTable } from "../components/FeesTable.js"
import { IconPlus } from "../components/icons/IconPlus.js"
import { trpc } from "../trpc.js"
import { Page } from "./templates/base.js"

export function Dashboard() {
  const hello = trpc.something.useQuery({ greeting: "Hello", name: "Client" })
  !hello.data ? console.log("Loading data...") : console.log(hello.data)

  return (
    <Page>
      <CenteredCard>
        {/* TODO: Preview example - remove before merge  */}
        <FeesTable>
          <FeesTable.Item name="Deposit base" fee={20.088} />
          <FeesTable.Item name="Threshold" fee={0.064} />
          <FeesTable.Item name="Vault pure proxy" fee={20} />
        </FeesTable>
        <Link to="/create-multisig" className="block mt-4">
          <div className="flex flex-col gap-4 wrap">
            <Button iconLeft={<IconPlus />}>New multisig</Button>
          </div>
        </Link>
      </CenteredCard>
    </Page>
  )
}
