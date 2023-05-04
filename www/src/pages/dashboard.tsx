import { Link } from "react-router-dom"
import { MockSetup } from "../../MockData.js"
import { AccountId } from "../components/AccountId.js"
import { Button } from "../components/Button.js"
import { CenteredCard } from "../components/CenteredCard.js"
import { IconPlus } from "../components/icons/IconPlus.js"
import { Setup } from "../components/Setup.js"
import { defaultAccount } from "../signals/accounts.js"
import { Page } from "./templates/base.js"

export function Dashboard() {
  return (
    <Page>
      <div className="flex flex-col gap-4">
        <CenteredCard>
          <div className="flex flex-col gap-6 divide-y divide-divider">
            <h2 className="text-black text-xl">Create a multisig</h2>
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
              <div className="mt-14 flex flex-wrap items-center">
                <p className="leading-8 mr-2">Create a Multisig with address</p>
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

        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
          {[MockSetup, MockSetup].map((setup) => <Setup setup={setup} />)}
        </div>
      </div>
    </Page>
  )
}
