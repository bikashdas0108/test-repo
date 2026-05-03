import { createContext } from "react";

export const NotificationContext = createContext({
  showNotification: false,
  onNotification: () => {},
  onHideNotification: () => {},
});

export default NotificationContext;
