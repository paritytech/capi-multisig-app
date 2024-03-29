import { RuntimeCall } from "@capi/westend"
import { useMutation } from "@tanstack/react-query"
import { Setup as SetupType } from "common"
import { Link } from "react-router-dom"
import { cancel as cancelCall } from "../api/cancel.js"
import { notificationsCb } from "../api/notificationsCb.js"
import { ratify as ratifyCall } from "../api/ratify.js"
import { useAccountInfo } from "../hooks/useAccountInfo.js"
import { useProposals } from "../hooks/useProposals.js"
import { accounts, defaultAccount } from "../signals/accounts.js"
import { formatBalance } from "../util/balance.js"
import { handleException } from "../util/events.js"
import { AccountId } from "./AccountId.js"
import { Button } from "./Button.js"
import { CenteredCard } from "./CenteredCard.js"
import { IconBell } from "./icons/IconBell.js"
import { IconPlus } from "./icons/IconPlus.js"
import { IconTrash } from "./icons/IconTrash.js"
import { Identicon } from "./identicon/Identicon.js"

interface Props {
  setup: SetupType
}

export function Setup({ setup }: Props) {
  const { data: balance } = useAccountInfo(setup.stash)
  const { data: proposals, refetch: refetchProposals } = useProposals(setup)

  const { mutate: ratify, isLoading: isRatifying } = useMutation({
    mutationFn: async (call: RuntimeCall) => {
      await ratifyCall(setup, call, notificationsCb)
    },
    onSuccess: (result) => {
      console.log({ result })
      refetchProposals()
    },
    onError: (error: unknown) => {
      handleException(error)
    },
  })

  const { mutate: cancel, isLoading: isCanceling } = useMutation({
    mutationFn: async (callHash: string) => {
      await cancelCall(setup, callHash, notificationsCb)
    },
    onSuccess: (result) => {
      console.log({ result })
      refetchProposals()
    },
    onError: (error: any) => {
      handleException(error)
    },
  })

  return (
    <CenteredCard>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center space-x-2">
          <div>
            <Identicon size={48} value={setup.stash} />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col flex-wrap">
              <div className="font-bold pr-2">{setup.name}</div>
              <div className="truncate text-sm" title={setup.stash}>
                {`Stash: ${setup.stash}`}
              </div>
              <div className="truncate text-sm" title={setup.multisig}>
                {`Address: ${setup.multisig}`}
              </div>
            </div>

            <div className="flex flex-row flex-wrap text-sm space-x-2 text-gray-500 gap-2">
              <div>
                Multisig {setup.threshold}/{setup.members.length}
              </div>
              <div>
                Balance: {formatBalance(balance ?? 0n)} WND
              </div>
              <Link to={`/multisig/${setup.multisig}`}>
                <div
                  className={`flex-row flex justify-center items-center space-x-1 ${
                    proposals && proposals.length === 0 && "text-gray-300"
                  }`}
                >
                  <div
                    className={`p-1 ${
                      proposals && proposals.length > 0
                      && "bg-green-500 text-white rounded-sm"
                    }`}
                  >
                    <IconBell
                      height={14}
                      fill={proposals && proposals.length > 0
                        ? "white"
                        : undefined}
                    />
                  </div>
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
                name={accounts.value.find((a) => a.address === member[0])?.name
                  || "Member " + (index + 1)}
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
                  <div className="flex flex-row gap-2 justify-end">
                    {!approvals.includes(defaultAccount.value?.address!)
                      ? (
                        <Button
                          onClick={() => ratify(call!)}
                          disabled={!call || isRatifying}
                        >
                          Sign
                        </Button>
                      )
                      : (
                        <Button
                          variant="danger"
                          iconLeft={<IconTrash className="w-6" />}
                          onClick={() => cancel(callHash)}
                          disabled={isCanceling}
                        >
                          Discard
                        </Button>
                      )}
                  </div>
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
