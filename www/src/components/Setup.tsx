import { Setup as SetupType } from "common"

import { RuntimeCall } from "@capi/westend"
import { signature } from "capi/patterns/signature/polkadot"
import { Link } from "react-router-dom"
import { useAccountInfo } from "../hooks/useAccountInfo.js"
import { useProposals } from "../hooks/useProposals.js"
import { defaultAccount, defaultSender } from "../signals/accounts.js"
import { formatBalance } from "../util/balance.js"
import { toMultiAddressIdRune, toMultisigRune } from "../util/capi-helpers.js"
import { AccountId } from "./AccountId.js"
import { Button } from "./Button.js"
import { CenteredCard } from "./CenteredCard.js"
import { IconBell } from "./icons/IconBell.js"
import { IconPlus } from "./icons/IconPlus.js"
import { Identicon } from "./identicon/Identicon.js"

interface Props {
  setup: SetupType
}

export function Setup({ setup }: Props) {
  const { data: balance } = useAccountInfo(setup.stash)
  const { data: proposals, isLoading, isError } = useProposals(setup)
  console.log({ proposals, isLoading, isError })

  const ratify = (call: RuntimeCall) => {
    const sender = defaultSender.peek()
    const account = defaultAccount.peek()
    if (!setup || !sender || !account) return

    const multisig = toMultisigRune(setup)
    const user = toMultiAddressIdRune(account.address)

    const ratifyCall = multisig
      .ratify(user, call)
      .signed(signature({ sender }))
      .sent()
      .dbgStatus("Ratify")
      .finalized()

    ratifyCall
      .run()
      .then((result) => {
        console.log("Done", result)
      })
      .catch((exception) => {
        console.error("Error", exception)
      })
  }

  return (
    <CenteredCard>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center space-x-2">
          <div>
            <Identicon size={48} value={setup.multisig} />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap">
              <div className="font-bold pr-2">{setup.name}</div>
              <div className="truncate" title={setup.multisig}>
                {setup.multisig}
              </div>
            </div>

            <div className="flex flex-row flex-wrap text-sm space-x-2">
              <div>
                Multisig {setup.threshold}/{setup.members.length}
              </div>
              <div>
                {`Balance: ${balance ? formatBalance(balance) : "N/A"}  DOT`}
              </div>
              <Link to={`/multisig/${setup.multisig}`}>
                <div className="text-gray-300 flex-row flex justify-center items-center space-x-1">
                  <IconBell height={14} />{" "}
                  <span>
                    {proposals && proposals?.length > 0
                      ? `${proposals?.length} `
                      : "No "} Pending Transactions
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="mb-2">Members:</div>
          <div className="flex flex-col gap-2">
            {setup.members.map((member, index) => (
              <AccountId
                shortenAddress={false}
                address={member[0]}
                name={"Member " + (index + 1)}
              />
            ))}
          </div>
        </div>

        {proposals
          && proposals.map(({ callHash, call, approvals }) => (
            <>
              <hr className="divide-x-0 divide-gray-300 m-2" />

              <div class="flex flex-col">
                <div class="mb-2">
                  {`Pending transaction (Signed ${approvals.length}/ ${setup.threshold})`}
                </div>
                <div className="flex flex-col gap-2">
                  <div>{callHash}</div>

                  {call && (
                    <Button
                      className="self-end"
                      onClick={() => ratify(call)}
                    >
                      (View &) Sign
                    </Button>
                  )}
                </div>
              </div>
            </>
          ))}

        <hr className="divide-x-0 divide-gray-300 m-2" />

        <div className="flex flex-row justify-between">
          <Button variant="ghost" type="submit">
            Contract
          </Button>

          <Link to={`/new-transaction?multisig=${setup.multisig}`}>
            <Button variant="ghost" type="submit" iconLeft={<IconPlus />}>
              New Transaction
            </Button>
          </Link>
        </div>
      </div>
    </CenteredCard>
  )
}
