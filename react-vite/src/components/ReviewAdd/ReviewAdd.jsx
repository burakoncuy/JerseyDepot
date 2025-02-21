import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addReview } from "../../redux/reviews";

const AddReviewForm = ({ itemId }) => {
  console.log("Received itemId in AddReviewForm:", itemId); // Debugging

  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting review for item ID:", itemId); // Debugging

    if (!itemId) {
      setError("Invalid item. Please try again.");
      return;
    }

    try {
      const reviewData = { rating, comment };
      await dispatch(addReview(itemId, reviewData));
      setRating(0);
      setComment("");
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min="1"
        max="5"
        required
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button type="submit">Submit Review</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default AddReviewForm;
