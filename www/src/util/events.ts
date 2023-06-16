import { PalletProxyEvent, RuntimeEvent } from "@capi/westend"
import { Rune, RunicArgs } from "capi"
import { v4 as uuid } from "uuid"
import { useNotifications } from "../components/Notifications.js"

const { addNotification } = useNotifications()

function filterPureCreatedEvents<X>(...[events]: RunicArgs<X, [any[]]>) {
  return Rune.resolve(events).map((events) => {
    const eventNames = events.map((e) =>
      `${e.event.type}:${e.event.value.type}`
    )
    addNotification({ id: uuid(), message: eventNames, type: "info" })

    return events
      .map((e) => e.event).filter((event): event is RuntimeEvent.Proxy =>
        event.type === "Proxy"
      )
      .map((e) => e.value)
      .filter((event): event is PalletProxyEvent.PureCreated =>
        event.type === "PureCreated"
      )
  })
}

function filterEvents<X>(...[events]: RunicArgs<X, [any[]]>) {
  return Rune.resolve(events).map((events) => {
    addNotification({ id: uuid(), message: "InBlock", type: "success" })
    const eventNames = events.map((e) =>
      `${e.event.type}:${e.event.value.type}`
    )
    addNotification({ id: uuid(), message: eventNames, type: "info" })
  })
}

function handleException(exception: any) {
  console.error("Something went wrong:", exception)
  addNotification({
    id: uuid(),
    message: `${exception.value.name}:${exception.value.message}`,
    type: "error",
  })
}

export { filterEvents, filterPureCreatedEvents, handleException }
