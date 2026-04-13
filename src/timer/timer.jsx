import { useEffect, useState } from "react";
import "./timer.css";

const Timer = () => {
  const [time, setTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time % 3600) / 60);
  const sec = time % 60;
  const handleStart = () => {
    setIsStarted(true);
  };
  const handlePause = () => {
    setIsStarted(false);
  };
  const handleReset = () => {
    setTime(0);
    setIsStarted(false);
  };

  useEffect(() => {
    let timer;
    if (isStarted) {
      timer = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isStarted]);

  return (
    <div className="timer">
      <div className="display">
        <div className="time">
          <div>Hour</div>
          <div>{hour}</div>
        </div>
        <div>
          <div>Min</div>
          <div>{min}</div>
        </div>
        <div>
          <div>Sec</div>
          <div>{sec}</div>
        </div>
      </div>
      <div className="cta-list">
        {isStarted ? (
          <button onClick={handlePause}>Pause</button>
        ) : time === 0 ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleStart}>Resume</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default Timer;
