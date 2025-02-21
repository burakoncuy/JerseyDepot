import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserReviews, deleteReview } from "../../redux/reviews";

const UserReviews = () => {
  const dispatch = useDispatch();
  const userReviews = useSelector((state) => state.reviews.reviews); // Get reviews from Redux store

  // Fetch current user's reviews on component mount
  useEffect(() => {
    dispatch(fetchCurrentUserReviews());
  }, [dispatch]);

  // Handle delete review
  const handleDeleteReview = (reviewId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      dispatch(deleteReview(reviewId)); // Dispatch the delete review action
    }
  };

  // Handle update review (redirect to update page)
  const handleUpdateReview = (reviewId) => {
    window.location.href = `/reviews/${reviewId}/update`;
  };

  // Display message if no reviews are found
  if (!userReviews || userReviews.length === 0) {
    return <p>You have not posted any reviews yet.</p>;
  }

  return (
    <div>
      <h2>Your Reviews</h2>
      <ul>
        {userReviews.map((review) => (
          <li key={review.id}>
             <div>
              <img
                src={review.item_image} // Display the item image
                alt={review.item_name}
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
            <p>Item: {review.item_name}</p> {/* Display the item name */}
            <p>Rating: {review.rating}</p>
            <p>Comment: {review.comment}</p>
            <button onClick={() => handleDeleteReview(review.id)}>Delete</button>
            <button onClick={() => handleUpdateReview(review.id)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserReviews;