import React, { useContext, useEffect } from "react";
import NotificationContext from "../context";

const NOTIFICATION_TYPES = {
  info: { backgroundColor: "#2196F3", color: "#fff" },
  success: { backgroundColor: "#4CAF50", color: "#fff" },
  error: { backgroundColor: "#f44336", color: "#fff" },
};

const POSITION_STYLE = {
  "top-right": { top: "20px", right: "20px" },
  "top-left": { top: "20px", left: "20px" },
  "bottom-right": { bottom: "20px", right: "20px" },
  "bottom-left": { bottom: "20px", left: "20px" },
};

const Notification = ({ message, type, position }) => {
  const { showNotification, onHideNotification } =
    useContext(NotificationContext);
  const styles = {
    ...NOTIFICATION_TYPES[type],
    ...POSITION_STYLE[position],
    position: "absolute",
    padding: `10px 20px`,
    borderRadius: "4px",
    zIndex: 9999,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    minWidth: "200px",
    gap: "20px",
  };

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        onHideNotification();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  if (!showNotification) return null;

  return (
    <div style={styles}>
      <div>{message}</div>
      <div style={{ cursor: "pointer" }} onClick={onHideNotification}>
        X
      </div>
    </div>
  );
};

export default Notification;
