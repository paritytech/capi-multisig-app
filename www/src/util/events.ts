import { PalletProxyEvent, RuntimeEvent } from "@capi/westend"
import { Rune, RunicArgs } from "capi"
import { v4 as uuid } from "uuid"
import { useNotifications } from "../components/Notifications.js"

const { addNotification } = useNotifications()

export function filterPureCreatedEvents<X>(...[events]: RunicArgs<X, [any[]]>) {
  return Rune.resolve(events).map((events) =>
    events
      .map((e) => {
        const message = `${e.event.type}:${e.event.value.type}`
        addNotification({ id: uuid(), message, type: "success" })
        return e.event
      })
      .filter((event): event is RuntimeEvent.Proxy => event.type === "Proxy")
      .map((e) => e.value)
      .filter((event): event is PalletProxyEvent.PureCreated =>
        event.type === "PureCreated"
      )
  )
}

export function filterEvents<X>(...[events]: RunicArgs<X, [any[]]>) {
  addNotification({ id: uuid(), message: "Queued", type: "success" })
  return Rune.resolve(events).map((events) => {
    addNotification({ id: uuid(), message: "InBlock", type: "success" })
    events.map((e) => {
      const message = `${e.event.type}:${e.event.value.type}`
      addNotification({ id: uuid(), message, type: "success" })
      return e.event
    })
  })
}
