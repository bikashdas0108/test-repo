import { useEffect, useRef, useState } from "react";
import "./countDown.css";

const CountDown = () => {
  const [time, setTime] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const hour = Math.floor(time / 3600);
  const min = Math.floor((time % 3600) / 60);
  const sec = time % 60;
  let timer = useRef();
  const handleStart = () => {
    setIsStarted(true);
    setIsPaused(false);
  };
  const handlePause = () => {
    setIsStarted(false);
    setIsPaused(true);
  };
  const handleReset = () => {
    setTime(0);
    setIsStarted(false);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isStarted) {
      timer.current = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [isStarted]);

  useEffect(() => {
    if (time === 0) {
      setIsStarted(false);
      setIsPaused(false);
      clearInterval(timer.current);
    }
  }, [time]);

  return (
    <div className="timer">
      <div className="display">
        <div className="time">
          <div>Hour</div>
          <input
            type="number"
            value={hour}
            onChange={(e) =>
              setTime((prev) => prev + (e.target.value * 3600 - hour * 3600))
            }
          />
        </div>
        <div>
          <div>Min</div>
          <input
            type="number"
            value={min}
            onChange={(e) =>
              setTime((prev) => prev + (e.target.value * 60 - min * 60))
            }
          />
        </div>
        <div>
          <div>Sec</div>
          <input
            type="number"
            value={sec}
            onChange={(e) => setTime((prev) => prev + (e.target.value - sec))}
          />
        </div>
      </div>
      <div className="cta-list">
        {isStarted ? (
          <button onClick={handlePause}>Pause</button>
        ) : isPaused ? (
          <button onClick={handleStart}>Resume</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default CountDown;
