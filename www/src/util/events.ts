import { v4 as uuid } from "uuid";
import { useNotifications } from "../components/Notifications.js";

const { addNotification, closeNotification } = useNotifications();

const initialId = uuid();

function handleException(exception: any) {
  closeNotification(initialId);
  console.error("Something went wrong:", exception);
  addNotification({
    id: uuid(),
    message: `${exception.value.name}:${exception.value.message}`,
    type: "error",
  });
}

export { handleException };
