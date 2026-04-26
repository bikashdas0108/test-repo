import { useEffect, useState } from "react";
// import FileExplorer from "./fileExplorer";
// import CountDown from "./countDown/countDown";
// import Timer from "./timer/timer";
// import ProgressBar from "./progressBar";
// import CircleGame from "./circleGame";
// import JiraBoard from "./jiraBoard";
// import StarRating from "./starRating";
// import UserList from "./userList";
import EventCta from "./eventEmitter/index.jsx";

import { useEventEmitter } from "./hooks/useEventEmitter";

import "./App.css";

// import VideoDashboard from "./VideoDashboard";
function App() {
  const { registerEvent } = useEventEmitter("customEvent");
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    registerEvent((data) => {
      setEventData(data?.message);
    });
  }, []);

  return (
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
      <EventCta />
      {eventData && <p>{eventData}</p>}
    </div>
  );
}

export default App;
