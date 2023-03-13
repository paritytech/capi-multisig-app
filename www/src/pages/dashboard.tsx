import { Link } from "react-router-dom"
import { Button } from "../components/Button.js"
import { CenteredCard } from "../components/CenteredCard.js"
import { IconPlus } from "../components/icons/IconPlus.js"
import { Page } from "./templates/base.js"

export function Dashboard() {
  return (
    <Page>
      <CenteredCard>
        <Link to="/create-multisig">
          <div className="flex flex-col gap-4 wrap">
            <Button iconLeft={<IconPlus />}>New multisig</Button>
          </div>
        </Link>
      </CenteredCard>
    </Page>
  )
}