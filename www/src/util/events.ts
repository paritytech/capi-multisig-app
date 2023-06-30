import { Rune, RunicArgs } from "capi"
import { v4 as uuid } from "uuid"
import { useNotifications } from "../components/Notifications.js"

const { addNotification, closeNotification } = useNotifications()

const initialId = uuid()

function handleException(exception: any) {
  closeNotification(initialId)
  console.error("Something went wrong:", exception)
  addNotification({
    id: uuid(),
    message: `${exception.value.name}:${exception.value.message}`,
    type: "error",
  })
}

function filterEvents<X>(...[events]: RunicArgs<X, [any[]]>) {
  addNotification({
    id: initialId,
    message: "Processing...",
    type: "loading",
  })
  return Rune.resolve(events).map((events) => {
    closeNotification(initialId)
    addNotification({ id: uuid(), message: "InBlock", type: "success" })
    const eventNames = events.map((e) =>
      `${e.event.type}:${e.event.value.type}`
    )
    addNotification({ id: uuid(), message: eventNames, type: "info" })
  })
}

export { filterEvents, handleException }
