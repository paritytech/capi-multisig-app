import { hex, Rune, RunicArgs } from "capi"
import { signature } from "capi/patterns/signature/polkadot"
import { Setup } from "common"
import { defaultAccount } from "../signals/accounts.js"
import { toMultiAddressIdRune, toMultisigRune } from "../util/capi-helpers.js"
import { createSender } from "./createSender.js"
import { Message } from "./notificationsCb.js"

export async function cancel(
  setup: Setup,
  callHash: string,
  cb: (value: Message) => void,
) {
  const account = defaultAccount.value
  if (!account) throw new Error("No account connected!")

  const multisig = toMultisigRune(setup)
  const user = toMultiAddressIdRune(account.address)
  const sender = createSender(account.address)

  const cancelCall = multisig
    .cancel(user, hex.decode(callHash))
    .signed(signature({ sender }))
    .sent()
    .dbgStatus("Cancel")
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

  await cancelCall.run()
}
