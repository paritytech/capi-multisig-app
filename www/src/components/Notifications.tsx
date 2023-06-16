import { Signal, signal } from "@preact/signals"
import { clsx } from "clsx"
import { useCallback, useEffect } from "preact/hooks"
import { IconClose } from "./icons/IconClose.js"

export type Notification = {
  id: string
  type: "success" | "error"
  message: string
}

export type NotificationsState = {
  notifications: Signal<Notification[]>
}

export const notificationsState: NotificationsState = {
  notifications: signal([]),
}

export function useNotifications() {
  const { notifications } = notificationsState

  const addNotification = (newNotification: Notification, delayMs = 10000) => {
    notifications.value = [...notifications.value, newNotification]
    setTimeout(() => {
      closeNotification(newNotification.id)
    }, delayMs)
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
    <div className="pointer-events-none fixed inset-0 mx-4 my-1 z-50">
      <div className="flex w-full flex-col space-y-2 items-end">
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
      className={clsx(
        "pointer-events-auto w-full max-w-[400px] overflow-hidden rounded-sm shadow-notification",
        {
          "bg-notification-success": notification.type === "success",
        },
        {
          "bg-notification-error": notification.type === "error",
        },
      )}
    >
      <div className="flex p-4 justify-between">
        <span>{notification.message}</span>
        <button
          type="button"
          className="focus:outline-none hover:opacity-60"
          onClick={handleClose}
        >
          <IconClose />
        </button>
      </div>
    </div>
  )
}
