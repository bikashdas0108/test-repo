import { useRef, useState } from "react";

const COLORS = ["red", "blue", "green", "orange"];
const CircleGame = () => {
  const [circles, setCircles] = useState([]);
  const [count, setCount] = useState(0);
  // const boardRef = useRef(null);
  const handleBoardClick = (e) => {
    //   console.log(e, e.clientX, e.nativeEvent.offsetX);
    //   const { left, top } = boardRef.current.getBoundingClientRect();

    setCount(circles.length + 1);
    setCircles((prev) => {
      const newCircle = {
        color: Math.floor(Math.random() * COLORS.length),
        left: e.nativeEvent.offsetX - 10,
        top: e.nativeEvent.offsetY - 10,
      };
      console.log(newCircle);
      const updatedCircles = prev.slice(0, count);

      return [...updatedCircles, newCircle];
    });
  };

  const handleUndo = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleRedo = () => {
    setCount((prev) => (prev < circles.length ? prev + 1 : prev));
  };

  const handleReset = () => {
    setCircles([]);
    setCount(0);
  };

  return (
    <div
      style={{
        height: "500px",
        width: "500px",
        border: "1px solid red",
      }}
    >
      <div
        style={{
          height: "400px",
          backgroundColor: "yellow",
          border: "1px solid black",
          padding: "10px",
          margin: "10px",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
        onClick={handleBoardClick}
        // ref={boardRef}
      >
        {circles.slice(0, count).map((c, index) => (
          <div
            key={index}
            style={{
              height: "20px",
              width: "20px",
              borderRadius: "50%",
              backgroundColor: COLORS[c.color],
              position: "absolute",
              top: c.top,
              left: c.left,
            }}
          ></div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

export default CircleGame;
