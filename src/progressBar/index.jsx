import { useEffect, useRef, useState } from "react";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef();

  useEffect(() => {
    progressTimer.current = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 10 : 0));
    }, 1000);

    return () => clearInterval(progressTimer.current);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      clearInterval(progressTimer.current);
    }
  }, [progress]);

  return (
    <div
      style={{ width: "500px", backgroundColor: "#eee", overflow: "hidden" }}
    >
      <div
        style={{
          backgroundColor: "green",
          transform: `translateX(${progress - 100}%)`,
          width: "100%",
          height: "24px",
        }}
      ></div>
      {progress}%
    </div>
  );
};

export default ProgressBar;
