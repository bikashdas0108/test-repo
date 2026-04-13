import { useState, useRef } from "react";
import "./starRating.css";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const handleMouseMove = (e, index) => {
    const { width } = e.target.getBoundingClientRect();
    const offsetX = e.nativeEvent.offsetX;
    setTempRating(index + (offsetX > width / 2 ? 1 : 0.5));
  };

  const handleMouseLeave = () => {
    setTempRating(0);
  };

  const handleRatingClick = (newRating) => {
    setRating(newRating);
  };

  const renderStar = ({ index, star }) => {
    const ratingValue = tempRating || rating;
    const isHalf = ratingValue > index && ratingValue < index + 1;
    const isFull = ratingValue >= index + 1;
    return (
      <span
        key={index}
        className={`star ${isHalf ? "half" : isFull ? "full" : ""}`}
        onClick={() => handleRatingClick(isHalf ? index + 0.5 : index + 1)}
        onMouseMove={(e) => handleMouseMove(e, index)}
      >
        {star}
      </span>
    );
  };

  return (
    <div>
      <div className="container" onMouseLeave={handleMouseLeave}>
        {" "}
        {Array(5)
          .fill("★")
          .map((star, index) =>
            renderStar({
              index,
              star,
            }),
          )}
      </div>
    </div>
  );
};

export default StarRating;
