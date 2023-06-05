import { Setup as SetupType } from "common";

import { $weight, westend } from "@capi/westend";
import { useQuery } from "@tanstack/react-query";
import { hex } from "capi";
import { signature } from "capi/patterns/signature/polkadot";
import { Link } from "react-router-dom";
import { defaultAccount, defaultSender } from "../signals/accounts.js";
import { toMultisigRune, toPubKey } from "../util/capi-helpers.js";
import { AccountId } from "./AccountId.js";
import { Button } from "./Button.js";
import { CenteredCard } from "./CenteredCard.js";
import { IconBell } from "./icons/IconBell.js";
import { IconPlus } from "./icons/IconPlus.js";
import { Identicon } from "./identicon/Identicon.js";

interface Props {
  setup: SetupType;
}

export function Setup({ setup }: Props) {
  const {
    isLoading,
    data: proposals,
    isError,
  } = useQuery({
    queryKey: ["proposals", setup.id],
    queryFn: async () => {
      const multisig = toMultisigRune(setup);
      const proposals: Array<Array<Uint8Array>> = await multisig.proposals(5).run();

      return proposals.map(([, callHashBytes]) => "0x" + hex.encode(callHashBytes!));
    },
  });

  console.log({ isError, isLoading, proposals });
  const ratify = (callHash: string) => {
    console.log({ defaultAccount: defaultAccount.value?.address });
    westend.Multisig.approveAsMulti({
      callHash: hex.decode(callHash),
      threshold: setup.threshold,
      // 1. do not include sender
      // 2. signatories in correct order
      otherSignatories: setup.members
        .filter(([address]) => address !== defaultAccount.value?.address)
        .map(([address]) => toPubKey(address)),
      // how to get correct weight?
      maxWeight: $weight.decode(Uint8Array.from([64, 64])),
    })
      .signed(signature({ sender: defaultSender.value! }))
      .sent()
      .dbgStatus("Ratify")
      .finalized()
      .run();
    console.log({ defaultSender, callHash });
  };

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
              <div>Balance XY DOT</div>
              <Link to={`/multisig/${setup.multisig}`}>
                <div className="text-gray-300 flex-row flex justify-center items-center space-x-1">
                  <IconBell height={14} />{" "}
                  <span>
                    {proposals && proposals?.length > 0 ? `${proposals?.length} ` : "No "} Pending
                    Transactions
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

        {proposals && proposals.length > 0 && (
          <>
            <hr className="divide-x-0 divide-gray-300 m-2" />

            <div class="flex flex-col">
              <div class="mb-2">Pending Transactions:</div>
              <div className="flex flex-col gap-2">
                {proposals.map((callHash) => (
                  <div className="tabular-nums" onClick={() => ratify(callHash)}>
                    {callHash}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

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
  );
}
