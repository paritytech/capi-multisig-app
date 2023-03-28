import { effect } from "@preact/signals"
import { Link } from "react-router-dom"
import { Button } from "../components/Button.js"
import { CenteredCard } from "../components/CenteredCard.js"
import { IconPlus } from "../components/icons/IconPlus.js"
import { Identicon } from "../components/identicon/Identicon.js"
import { defaultAccount } from "../signals/accounts.js"
import { trpc } from "../trpc.js"
import { getBalance } from "../util/capi.js"
import { shortAddress } from "../util/short.js"
import { Page } from "./templates/base.js"

effect(async () => {
  if (!defaultAccount.value) return
  const balance = await getBalance(
    defaultAccount.value.address,
  )
  console.log(balance)
})

export function Dashboard() {
  const hello = trpc.something.useQuery({ greeting: "Hello", name: "Client" })
  !hello.data ? console.log("Loading data...") : console.log(hello.data)

  return (
    <Page>
      <CenteredCard>
        <div className="flex flex-col gap-6 divide-y divide-divider">
          <h2 className="text-black text-xl ">Create a multisig</h2>
          <div className="">
            <div className="mt-32 flex justify-center">
              <Link to="/create-multisig">
                <Button iconLeft={<IconPlus />} size="xl">New multisig</Button>
              </Link>
            </div>
            <div className="mt-14 flex flex-wrap gap-2 items-center">
              <p className="leading-8">Create a Multisig with address</p>
              {defaultAccount.value?.address
                && (
                  <Identicon
                    size={24}
                    value={defaultAccount.value?.address}
                  />
                )}
              {defaultAccount.value?.name
                && (
                  <span className="font-bold">
                    {defaultAccount.value?.name}
                  </span>
                )}
              {defaultAccount.value?.address
                && <span>{shortAddress(defaultAccount.value?.address)}</span>}
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
