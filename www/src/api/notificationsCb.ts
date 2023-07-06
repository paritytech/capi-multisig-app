import { useNotifications } from "../components/Notifications.js"

type Loading = { type: "loading" }
type Success = { type: "success" }
type Info = { type: "info"; events: string[] }
export type Message = Loading | Success | Info

const { addNotification, closeNotification } = useNotifications()

export function notificationsCb(msg: Message) {
  if (msg.type === "loading") {
    addNotification({
      id: "",
      message: "Processing...",
      type: "loading",
    })
    return
  }
  if (msg.type === "success") {
    closeNotification("")
    addNotification({ id: "inBlock", message: "InBlock", type: "success" })
    return
  }
  addNotification({ id: "", message: msg.events, type: "info" })
}
