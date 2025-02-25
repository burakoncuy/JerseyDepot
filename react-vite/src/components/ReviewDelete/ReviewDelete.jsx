// components/DeleteReviewButton.js
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../redux/reviews';

const DeleteReviewButton = ({ reviewId, onDeleteComplete }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      dispatch(deleteReview(reviewId));
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

export default DeleteReviewButton;
