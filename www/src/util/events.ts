import { Rune, RunicArgs } from "capi"
import { useNotifications } from "../components/Notifications.js"

const { addNotification, closeNotification } = useNotifications()

function handleException(exception: any) {
  closeNotification("loading")
  console.error("Something went wrong:", exception)
  addNotification({
    id: "failure",
    message: `${exception.value.name}:${exception.value.message}`,
    type: "error",
  })
}

function filterEvents<X>(...[events]: RunicArgs<X, [any[]]>) {
  addNotification({
    id: "loading",
    message: "Processing...",
    type: "loading",
  })
  return Rune.resolve(events).map((events) => {
    closeNotification("loading")
    addNotification({ id: "events", message: "InBlock", type: "success" })
    const eventNames = events.map((e) =>
      `${e.event.type}:${e.event.value.type}`
    )
    addNotification({ id: "events", message: eventNames, type: "info" })
  })
}

export { filterEvents, handleException }
