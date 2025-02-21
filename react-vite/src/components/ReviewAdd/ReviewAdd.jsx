import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addReview } from "../../redux/reviews"; // Import the addReview action

const AddReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get item ID from URL parameters

  const [review, setReview] = useState({
    rating: 1,
    comment: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the addReview action with the item ID and review data
      await dispatch(addReview(id, review));
      navigate(`/items/${id}`); // Redirect to the item details page after adding the review
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Add a Review</h2>
      <form onSubmit={handleSubmit}>
        <label>Rating</label>
        <input
          type="number"
          name="rating"
          value={review.rating}
          min="1"
          max="5"
          onChange={handleChange}
        />

        <label>Comment</label>
        <textarea
          name="comment"
          value={review.comment}
          onChange={handleChange}
        />

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;