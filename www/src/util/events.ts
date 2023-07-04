import { useNotifications } from "../components/Notifications.js"

const { addNotification, clearNotifications } = useNotifications()

function handleException(exception: any) {
  clearNotifications()
  console.error("Something went wrong:", exception)
  addNotification({
    id: "failure",
    message: `${exception.value.name}:${exception.value.message}`,
    type: "error",
  })
}

export { handleException }
