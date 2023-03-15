import { signal } from "@preact/signals"
import { useEffect } from "preact/hooks"

type Notification = {
  id: string
  type: "success" | "error"
  message: string
}

const exampleNotifications: Notification[] = [
  {
    id: "1",
    type: "success",
    message: "Executed transaction Ox34ea34ea...1f0f1f0f",
  },
  {
    id: "2",
    type: "error",
    message: "Failed transaction Ox34ea34ea...1f0f1f0f",
  },
]

export const notificationsState = {
  notifications: signal([...exampleNotifications]),
}

export function useNotifications() {
  const { notifications } = notificationsState

  const addNotification = () => {
    const newNotification = { ...exampleNotifications[0] }
    newNotification.id = Date.now().toString().slice(-2)
    notifications.value = [...notifications.value, newNotification]
  }

  // const addNotification = ({ type, message }: Notification) => {
  //   const newNotification = { id: Date.now().toString(), type, message }
  //   notifications.value = [...notifications.value, newNotification]
  // }

  const clearNotifications = () => {
    notifications.value = []
  }

  const closeNotification = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  return {
    notifications,
    addNotification,
    clearNotifications,
    closeNotification,
  }
}

export function Notifications() {
  const {
    notifications,
    addNotification,
    clearNotifications,
    closeNotification,
  } = useNotifications()

  useEffect(() => {
    const handleBeforeUnload = () => {
      clearNotifications()
    }
    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [])

  return (
    <>
      <button onClick={addNotification}>ADD</button>
      <div class="pointer-events-none fixed inset-0 flex mx-4 my-1 items-start z-50">
        <div class="flex w-full flex-col space-y-4 items-end">
          {notifications.value.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onClose={closeNotification}
            />
          ))}
        </div>
      </div>
    </>
  )
}

type Props = {
  notification: Notification
  onClose: (id: string) => void
}

function NotificationItem({ notification, onClose }: Props) {
  return (
    <div
      class={`pointer-events-auto w-full max-w-sm overflow-hidden rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 ${
        notification.type === "success"
          ? "bg-notification-success"
          : "bg-notification-error"
      }`}
    >
      <div class="p-4">
        <div class="flex">
          <p>
            {notification.id} - {notification.message}
          </p>
          <div class="ml-4 flex flex-shrink-0">
            <button
              type="button"
              class="focus:outline-none"
              onClick={() => onClose(notification.id)}
            >
              X
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
