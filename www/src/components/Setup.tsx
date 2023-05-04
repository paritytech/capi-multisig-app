import { WalletAccount } from "@talisman-connect/wallets"
import { Setup as SetupType } from "common"
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
  return (
    <CenteredCard>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2">
          <div>
            <Identicon size={48} value={setup.multisig} />
          </div>

          <div className="flex flex-col">
            <div className="space-x-2">
              <span className="font-bold">{setup.name}</span>
              <span className="truncate" title={setup.multisig}>
                {setup.multisig}
              </span>
            </div>

            <div className="space-x-2 text-sm flex flex-row">
              <div>
                Multisig {setup.threshold}/{setup.members.length}
              </div>
              <div>Balance XY DOT</div>
              <div className="text-gray-300 flex-row flex justify-center items-center space-x-1">
                <IconBell height={14} /> <span>No Pending Transactions</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col">
          <div class="mb-2">Members:</div>
          <div className="flex flex-col gap-2">
            {setup.members.map((member, index) => (
              <AccountId
                shortenAddress={false}
                account={{
                  address: member[0],
                  name: "Member " + (index + 1),
                } as WalletAccount}
              />
            ))}
          </div>
        </div>

        <hr className="divide-x-0 divide-gray-300 m-2" />

        <div className="flex flex-row justify-between">
          <Button
            variant="ghost"
            type="submit"
          >
            Contract
          </Button>

          <Button
            variant="ghost"
            type="submit"
            iconLeft={<IconPlus />}
          >
            New Transaction
          </Button>
        </div>
      </div>
    </CenteredCard>
  )
}
