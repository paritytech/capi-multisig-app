import { MultiAddress, westend } from "@capi/westend"
import { Rune, RunicArgs, ss58 } from "capi"
import { signature } from "capi/patterns/signature/polkadot"
import { replaceDelegateCalls } from "capi/patterns/unstable/proxy"
import {
  PROXY_DEPOSIT_BASE,
  PROXY_DEPOSIT_FACTOR,
} from "../util/chain-constants.js"
import { createSender } from "./createSender.js"
import { Message } from "./notificationsCb.js"

export async function replaceDelegatesCall(
  stash: string,
  prevOwner: string,
  newOwner: string,
  cb: (value: Message) => void,
): Promise<void> {
  const sender = createSender(prevOwner)

  const [, prevOwnerAddressBytes] = ss58.decode(prevOwner)
  const [, stashBytes] = ss58.decode(stash)
  const [, newOwnerBytes] = ss58.decode(newOwner)
  // TODO can we somehow check if the delegation has already been done?
  const replaceDelegates = westend.Utility.batchAll({
    calls: Rune.array([
      westend.Balances.transfer({
        dest: MultiAddress.Id(stashBytes),
        value: PROXY_DEPOSIT_BASE + PROXY_DEPOSIT_FACTOR,
      }),
      ...replaceDelegateCalls(
        westend,
        MultiAddress.Id(stashBytes),
        MultiAddress.Id(prevOwnerAddressBytes),
        MultiAddress.Id(newOwnerBytes),
      ),
    ]),
  })
    .signed(signature({ sender }))
    .sent()
    .dbgStatus("Replacing Proxy Delegates:")
    .inBlockEvents()
    .unhandleFailed()
    .pipe(<X>(...[events]: RunicArgs<X, [any[]]>) => {
      cb({ type: "loading" })
      return Rune.resolve(events).map((events) => {
        cb({ type: "success" })
        const eventNames = events.map((e) =>
          `${e.event.type}:${e.event.value.type}`
        )
        cb({ type: "info", events: eventNames })
      })
    })

  await replaceDelegates.run()
}
