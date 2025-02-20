import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../../redux/reviews'; // Adjust the import path as needed

const AddReviewForm = ({ itemId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reviewData = { rating, comment };
      await dispatch(addReview(itemId, reviewData));
      alert('Review added successfully!');
      // Clear the form or refresh the reviews list
      setRating(1);
      setComment('');
    } catch (error) {
      alert(error.message); // Display error message from the backend
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          required
        />
      </div>
      <div>
        <label>Comment:</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default AddReviewForm;