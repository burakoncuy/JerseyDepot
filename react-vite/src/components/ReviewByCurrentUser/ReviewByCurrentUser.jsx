import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserReviews, deleteReview } from "../../redux/reviews"; // Make sure the deleteReview is imported

const UserReviews = () => {
  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.reviews.reviews); // Assuming reviews are stored in `reviews` state

  useEffect(() => {
    dispatch(fetchCurrentUserReviews()); // Fetch the current user's reviews on component mount
  }, [dispatch]);

  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview(reviewId)); // Dispatch the delete review action
    }
  };

  if (!userReviews || userReviews.length === 0) {
    return <p>You have not posted any reviews yet.</p>;
  }

  return (
    <div>
      <h2>Your Reviews</h2>
      <ul>
        {userReviews.map((review) => (
          <li key={review.id}>
            <p>Item: {review.item_name}</p>
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
            <button onClick={() => window.location.href = `/reviews/${review.id}/update`}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserReviews;
