import { createContext, useEffect, useState } from "react";
// import FileExplorer from "./fileExplorer";
// import CountDown from "./countDown/countDown";
// import Timer from "./timer/timer";
// import ProgressBar from "./progressBar";
// import CircleGame from "./circleGame";
// import JiraBoard from "./jiraBoard";
// import StarRating from "./starRating";
// import UserList from "./userList";
// import EventCta from "./eventEmitter/index.jsx";
import Notification from "./notification/index.jsx";
import MultiStepForm from "./multiStepForm/index.jsx";

import NotificationContext from "./context.js";
import { useEventEmitter } from "./hooks/useEventEmitter";

import "./App.css";

// import VideoDashboard from "./VideoDashboard";
function App() {
  const { registerEvent } = useEventEmitter("customEvent");
  const [eventData, setEventData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    registerEvent((data) => {
      setEventData(data?.message);
      setShowNotification(true);
    });
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        onNotification: () => {
          setShowNotification(true);
        },
        onHideNotification: () => {
          setShowNotification(false);
        },
      }}
    >
      <div className="app">
        {/* <VideoDashboard /> */}
        {/* <Timer /> */}
        {/* <CountDown /> */}
        {/* <FileExplorer /> */}
        {/* <ProgressBar /> */}
        {/* <CircleGame /> */}
        {/* <JiraBoard /> */}
        {/* <StarRating /> */}
        {/* <UserList /> */}
        {/* <EventCta /> */}
        <MultiStepForm />
        {eventData && (
          <Notification
            message="Something went wrong "
            type="error"
            position="top-right"
          />
        )}
        {eventData && <p>{eventData}</p>}
      </div>
    </NotificationContext.Provider>
  );
}

export default App;
