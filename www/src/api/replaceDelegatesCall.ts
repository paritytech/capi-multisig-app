import { MultiAddress, westend } from "@capi/westend";
import { signature } from "capi/patterns/signature/polkadot";
import { pjsSender } from "capi/patterns/compat/pjs_sender";
import { WalletAccount } from "@talisman-connect/wallets";
import { Rune, RunicArgs, ss58 } from "capi";
import { replaceDelegateCalls } from "capi/patterns/proxy";

type Loading = { type: "loading" };
type Success = { type: "success" };
type Info = { type: "info"; events: string[] };
export type ReplaceDelegateCallNotification = Loading | Success | Info;

export async function replaceDelegatesCall(
  stash: string,
  prevOwner: WalletAccount,
  newOwner: string,
  cb: (value: ReplaceDelegateCallNotification) => void
): Promise<void> {
  const shittySender = pjsSender(westend, prevOwner.signer as any)(prevOwner.address);

  const [, userAddressBytes] = ss58.decode(prevOwner.address);
  const [, stashBytes] = ss58.decode(stash);
  const [, newOwnerBytes] = ss58.decode(newOwner);
  // TODO can we somehow check if the delegation has already been done?
  const replaceDelegates = westend.Utility.batchAll({
    calls: Rune.array(
      replaceDelegateCalls(
        westend,
        MultiAddress.Id(stashBytes), // effected account
        MultiAddress.Id(userAddressBytes), // from
        MultiAddress.Id(newOwnerBytes) // from
      )
    ),
  })
    .signed(signature({ sender: shittySender }))
    .sent()
    .dbgStatus("Replacing Proxy Delegates:")
    .inBlockEvents()
    .unhandleFailed()
    .pipe(<X>(...[events]: RunicArgs<X, [any[]]>) => {
      cb({ type: "loading" });
      return Rune.resolve(events).map((events) => {
        cb({ type: "success" });
        const eventNames = events.map((e) => `${e.event.type}:${e.event.value.type}`);
        cb({ type: "info", events: eventNames });
      });
    });

  await replaceDelegates.run();
}
