// components/DeleteReviewButton.js
import React from 'react';
import { connect } from 'react-redux';
import { deleteReview } from '../../redux/reviews';

const DeleteReviewButton = ({ reviewId, deleteReview, onDeleteComplete }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      deleteReview(reviewId);
      if (onDeleteComplete) {
        onDeleteComplete(); // Optional callback to refresh the list or close a modal
      }
    }
  };

  return (
    <button onClick={handleDelete} style={{ color: 'red' }}>
      Delete Review
    </button>
  );
};

export default connect(null, { deleteReview })(DeleteReviewButton);