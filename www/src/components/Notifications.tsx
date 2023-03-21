import { Signal, signal } from "@preact/signals"
import { clsx } from "clsx"
import { useCallback, useEffect } from "preact/hooks"
import { IconClose } from "./icons/IconClose.js"

// TODO: Preview - Remove before merge
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

export type Notification = {
  id: string
  type: "success" | "error"
  message: string
}

export type NotificationsState = {
  notifications: Signal<Notification[]>
}

export const notificationsState: NotificationsState = {
  // TODO: Preview - Remove before merge
  notifications: signal([...exampleNotifications]),
  // notifications: signal([]),
}

export function useNotifications() {
  const { notifications } = notificationsState

  const addNotification = (newNotification: Notification) => {
    notifications.value = [...notifications.value, newNotification]
  }

  const closeNotification = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id)
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  return {
    notifications,
    addNotification,
    closeNotification,
    clearNotifications,
  }
}

function useBeforeUnload(callback: () => void) {
  useEffect(() => {
    const handleBeforeUnload = () => {
      callback()
    }
    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [callback])
}

export function Notifications() {
  const {
    notifications,
    clearNotifications,
    closeNotification,
  } = useNotifications()

  useBeforeUnload(() => {
    clearNotifications()
  })

  return (
    <div class="pointer-events-none fixed inset-0 mx-4 my-1 z-50">
      <div class="flex w-full flex-col space-y-2 items-end">
        {notifications.value.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onClose={closeNotification}
          />
        ))}
      </div>
    </div>
  )
}

type PropsNotificationItem = {
  notification: Notification
  onClose: (id: string) => void
}

function NotificationItem({ notification, onClose }: PropsNotificationItem) {
  const handleClose = useCallback(() => onClose(notification.id), [
    notification.id,
    onClose,
  ])

  return (
    <div
      class={clsx(
        "pointer-events-auto w-full max-w-[400px] overflow-hidden rounded-sm shadow-notification",
        {
          "bg-notification-success": notification.type === "success",
        },
        {
          "bg-notification-error": notification.type === "error",
        },
      )}
    >
      <div class="flex p-4 justify-between">
        <span>{notification.message}</span>
        <button
          type="button"
          class="focus:outline-none hover:opacity-60"
          onClick={handleClose}
        >
          <IconClose />
        </button>
      </div>
    </div>
  )
}
