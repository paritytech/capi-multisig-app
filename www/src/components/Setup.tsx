import { Setup as SetupType } from "common";

import { RuntimeCall } from "@capi/westend";
import { useMutation } from "@tanstack/react-query";
import { signature } from "capi/patterns/signature/polkadot";
import { Link } from "react-router-dom";
import { useAccountInfo } from "../hooks/useAccountInfo.js";
import { useProposals } from "../hooks/useProposals.js";
import { accounts, defaultAccount, defaultSender } from "../signals/accounts.js";
import { formatBalance } from "../util/balance.js";
import { toMultiAddressIdRune, toMultisigRune } from "../util/capi-helpers.js";
import { AccountId } from "./AccountId.js";
import { Button } from "./Button.js";
import { CenteredCard } from "./CenteredCard.js";
import { IconBell } from "./icons/IconBell.js";
import { IconPlus } from "./icons/IconPlus.js";
import { Identicon } from "./identicon/Identicon.js";
import { useMemo } from "preact/hooks";
import { hex } from "capi";

interface Props {
  setup: SetupType;
}

export function Setup({ setup }: Props) {
  const multisig = useMemo(() => toMultisigRune(setup), [setup]);
  const { data: balance } = useAccountInfo(setup.stash);
  const { data: proposals, refetch: refetchProposals } = useProposals(setup);

  const { mutate: ratify, isLoading: isRatifying } = useMutation({
    mutationFn: async (call: RuntimeCall) => {
      const sender = defaultSender.value;
      const account = defaultAccount.value;
      if (!setup || !sender || !account) throw new Error("Missing setup, sender or account");

      const user = toMultiAddressIdRune(account.address);
      const ratifyCall = multisig
        .ratify(user, call)
        .signed(signature({ sender }))
        .sent()
        .dbgStatus("Ratify")
        .finalized();

      return ratifyCall.run();
    },
    onSuccess: (result) => {
      console.log({ result });
      refetchProposals();
    },
    onError: (error) => console.error(error),
  });

  const { mutate: cancel, isLoading: isCanceling } = useMutation({
    mutationFn: async (callHash: string) => {
      const sender = defaultSender.value;
      const account = defaultAccount.value;
      if (!setup || !sender || !account) throw new Error("Missing setup, sender or account");

      const user = toMultiAddressIdRune(account.address);
      const cancelCall = multisig
        .cancel(user, hex.decode(callHash))
        .signed(signature({ sender }))
        .sent()
        .dbgStatus("Cancel")
        .finalized();

      return cancelCall.run();
    },
    onSuccess: (result) => {
      console.log({ result });
      refetchProposals();
    },
    onError: (error) => console.error(error),
  });

  return (
    <CenteredCard>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center space-x-2">
          <div>
            <Identicon size={48} value={setup.stash} />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row flex-wrap">
              <div className="font-bold pr-2">{setup.name}</div>
              <div className="truncate" title={setup.stash}>
                {setup.stash}
              </div>
            </div>

            <div className="flex flex-row flex-wrap text-sm space-x-2 text-gray-500 gap-2">
              <div>
                Multisig {setup.threshold}/{setup.members.length}
              </div>
              <div>{`Balance: ${balance ? formatBalance(balance) : "N/A"}  DOT`}</div>
              <Link to={`/multisig/${setup.multisig}`}>
                <div
                  className={`flex-row flex justify-center items-center space-x-1 ${
                    proposals && proposals.length === 0 && "text-gray-300"
                  }`}
                >
                  <div
                    className={`p-1 ${
                      proposals && proposals.length > 0 && "bg-green-500 text-white rounded-sm"
                    }`}
                  >
                    <IconBell
                      height={14}
                      fill={proposals && proposals.length > 0 ? "white" : undefined}
                    />
                  </div>
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
                name={
                  accounts.value.find((a) => a.address === member[0])?.name ||
                  "Member " + (index + 1)
                }
              />
            ))}
          </div>
        </div>

        {proposals &&
          proposals.map(({ callHash, call, approvals }) => (
            <>
              <hr className="divide-x-0 divide-gray-300 m-2" />

              <div class="flex flex-col">
                <div class="mb-2">
                  {`Pending transaction (Signed ${approvals.length}/ ${setup.threshold})`}
                </div>
                <div className="flex flex-col gap-2">
                  <div>{callHash}</div>
                  {approvals.includes(defaultAccount.value?.address!) ? (
                    <Button
                      className="self-end"
                      onClick={() => cancel(callHash)}
                      disabled={isCanceling}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      className="self-end"
                      onClick={() => ratify(call!)}
                      disabled={!call || isRatifying}
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
  );
}
