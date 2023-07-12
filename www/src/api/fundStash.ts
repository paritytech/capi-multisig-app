import { westend } from "@capi/westend"
import { Rune, RunicArgs } from "capi"
import { signature } from "capi/patterns/signature/polkadot"
import { defaultAccount } from "../signals/accounts.js"
import { toBalance } from "../util/balance.js"
import { toMultiAddressIdRune } from "../util/capi-helpers.js"
import { createSender } from "./createSender.js"
import { Message } from "./notificationsCb.js"

export async function fundStash(
  amount: number,
  dest: string,
  cb: (value: Message) => void,
) {
  const sender = createSender(defaultAccount.value!.address)

  const fundStashCall = westend.Balances
    .transfer({
      value: toBalance(amount),
      dest: toMultiAddressIdRune(dest),
    })
    .signed(signature({ sender }))
    .sent()
    .dbgStatus("Transfer:")
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

  await fundStashCall.run()
}
