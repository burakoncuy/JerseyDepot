// components/UpdateReviewForm.js
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { updateReview } from '../../redux/reviews';

const UpdateReviewForm = ({ review, updateReview, onUpdateComplete }) => {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReview(review.id, { rating, comment });
    if (onUpdateComplete) {
      onUpdateComplete(); // Optional callback to close the form or refresh the list
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
      <button type="submit">Update Review</button>
    </form>
  );
};

export default connect(null, { updateReview })(UpdateReviewForm);