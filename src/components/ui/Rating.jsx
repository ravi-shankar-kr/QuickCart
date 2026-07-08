import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ rating = 0, reviews = 0, size = 18 }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<FaStar key={i} size={size} className="text-yellow-400" />);
    } else if (rating >= i - 0.5) {
      stars.push(
        <FaStarHalfAlt
          key={i}
          size={size}
          className="text-yellow-400"
        />
      );
    } else {
      stars.push(
        <FaRegStar
          key={i}
          size={size}
          className="text-yellow-400"
        />
      );
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">{stars}</div>

      <span className="text-sm text-neutral-500">
        ({reviews} Reviews)
      </span>
    </div>
  );
};

export default Rating;