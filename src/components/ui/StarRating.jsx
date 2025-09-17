import React from "react";
import { Star } from "lucide-react";

const StarRating = ({
  rating = 0,
  size = 16,
  showValue = false,
  className = "",
}) => {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star
            key={i}
            size={size}
            className="fill-yellow-400 text-yellow-400"
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star size={size} className="text-gray-300" />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: "50%" }}
            >
              <Star size={size} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>,
        );
      } else {
        stars.push(<Star key={i} size={size} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <div className="flex space-x-1">{renderStars()}</div>
      {showValue && (
        <span className="text-sm text-gray-500">({rating.toFixed(1)})</span>
      )}
    </div>
  );
};

export default StarRating;
