"use client";
import ReactStars from "react-rating-stars-component";
export const Ratings: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <ReactStars
      count={5}
      edit={false}
      value={rating}
      size={24}
      activeColor="#ffd700"
    />
  );
};
