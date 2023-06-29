import { PalletProxyEvent, RuntimeEvent, westend } from "@capi/westend";
import { signature } from "capi/patterns/signature/polkadot";
import { pjsSender } from "capi/patterns/compat/pjs_sender";
import { WalletAccount } from "@talisman-connect/wallets";
import { Rune, RunicArgs, ss58 } from "capi";

type Loading = { type: "loading" };
type Success = { type: "success" };
type Info = { type: "info"; events: string[] };
export type StashCallNotification = Loading | Success | Info;

export async function createStashCall(
  sender: WalletAccount,
  cb: (value: StashCallNotification) => void
): Promise<string> {
  const shittySender = pjsSender(westend, sender.signer as any)(sender.address);

  const createStashCall = westend.Proxy.createPure({
    proxyType: "Any",
    delay: 0,
    index: 0,
  })
    .signed(signature({ sender: shittySender }))
    .sent()
    .dbgStatus("Creating Pure Proxy:")
    .inBlockEvents()
    .unhandleFailed()
    .pipe(<X>(...[events]: RunicArgs<X, [any[]]>) => {
      cb({ type: "loading" });
      return Rune.resolve(events).map((events) => {
        cb({ type: "success" });
        const eventNames = events.map((e) => `${e.event.type}:${e.event.value.type}`);
        cb({ type: "info", events: eventNames });

        return events
          .map((e) => e.event)
          .filter((event): event is RuntimeEvent.Proxy => event.type === "Proxy")
          .map((e) => e.value)
          .filter((event): event is PalletProxyEvent.PureCreated => event.type === "PureCreated");
      });
    })
    // TODO typing is broken in capi
    .map((events: { pure: unknown }[]) => events.map(({ pure }) => pure))
    .access(0);

  const stashBytes = (await createStashCall.run()) as Uint8Array;
  const stashAddress = ss58.encode(await westend.addressPrefix().run(), stashBytes);
  return stashAddress;
}
