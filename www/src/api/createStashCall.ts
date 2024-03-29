import { PalletProxyEvent, RuntimeEvent, westend } from "@capi/westend"
import { Rune, RunicArgs, ss58 } from "capi"
import { signature } from "capi/patterns/signature/polkadot"
import { createSender } from "./createSender.js"
import { Message } from "./notificationsCb.js"

export async function createStashCall(
  address: string,
  cb: (value: Message) => void,
): Promise<string> {
  const sender = createSender(address)

  const createStashCall = westend.Proxy.createPure({
    proxyType: "Any",
    delay: 0,
    index: 0,
  })
    .signed(signature({ sender: sender }))
    .sent()
    .dbgStatus("Creating Pure Proxy:")
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

        return events
          .map((e) => e.event)
          .filter((event): event is RuntimeEvent.Proxy =>
            event.type === "Proxy"
          )
          .map((e) => e.value)
          .filter((event): event is PalletProxyEvent.PureCreated =>
            event.type === "PureCreated"
          )
      })
    })
    // TODO typing is broken in capi
    .map((events: { pure: unknown }[]) => events.map(({ pure }) => pure))
    .access(0)

  const stashBytes = (await createStashCall.run()) as Uint8Array
  const stashAddress = ss58.encode(
    await westend.addressPrefix().run(),
    stashBytes,
  )
  return stashAddress
}
