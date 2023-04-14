import { Link } from "react-router-dom"
import { AccountId } from "../components/AccountId.js"
import { Button } from "../components/Button.js"
import { CenteredCard } from "../components/CenteredCard.js"
import { IconPlus } from "../components/icons/IconPlus.js"
import { defaultAccount } from "../signals/accounts.js"
import { Page } from "./templates/base.js"


export function Dashboard() {
  return (
    <Page>
      <CenteredCard>
        <div className="flex flex-col gap-6 divide-y divide-divider">
          <h2 className="text-h4 text-foreground-contrast font-sans font-bold">Create a multisig</h2>
          <div className="">
            <div className="mt-32 flex justify-center">
              <Link to="/create-multisig">
                <Button
                  iconLeft={<IconPlus className="w-6 h-6" />}
                  size="xl"
                >
                  New multisig
                </Button>
              </Link>
            </div>
            <div className="mt-14 flex flex-wrap gap-2 items-center">
              <p className="leading-8">Create a Multisig with address</p>
              <AccountId account={defaultAccount.value} />
            </div>
            <p className="leading-8">
              Multi-signature wallets require authorization of transactions
              through multiple keys.&nbsp;
              <a
                href="https://wiki.polkadot.network/docs/learn-account-multisig"
                target="_blank"
                className="text-link hover:text-link/80 underline"
              >
                Learn more about multisigs.
              </a>
            </p>
          </div>
        </div>
      </CenteredCard>
    </Page>
  )
}
