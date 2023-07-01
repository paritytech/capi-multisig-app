import { Westend } from "@capi/westend"
import { signal } from "@preact/signals"
import { ExtrinsicRune, Rune, RunicArgs } from "capi"
import { signature } from "capi/patterns/signature/polkadot"
import { Setup } from "common"
import { defaultAccount } from "../signals/accounts.js"
import { toMultiAddressIdRune, toMultisigRune } from "../util/capi-helpers.js"
import { createSender } from "./createSender.js"
import { Message } from "./notificationsCb.js"

const isSubmitting = signal(false)

export async function ratify(
  setup: Setup,
  call: ExtrinsicRune<Westend, never>,
  cb: (value: Message) => void,
) {
  const account = defaultAccount.value
  if (!account) throw new Error("No account connected!")

  isSubmitting.value = true

  const multisig = toMultisigRune(setup)
  const user = toMultiAddressIdRune(account.address)
  const sender = createSender(account.address)

  const ratifyCall = multisig
    .ratify(user, call)
    .signed(signature({ sender }))
    .sent()
    .dbgStatus("Ratify")
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

  await ratifyCall.run()
}
