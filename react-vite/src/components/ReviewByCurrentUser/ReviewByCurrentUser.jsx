import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUserReviews, deleteReview } from "../../redux/reviews";
import './ReviewByCurrentUser.css'; // Import the CSS file

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
    return <p className="user-reviews__no-reviews-message">You have not posted any reviews yet.</p>;
  }

  return (
    <div className="user-reviews__container">
      <h2 className="user-reviews__heading">Your Reviews</h2>
      <ul className="user-reviews__list">
        {userReviews.map((review) => (
          <li key={review.id} className="user-reviews__card">
            <div className="user-reviews__image-container">
              <img
                src={review.item_image} // Display the item image
                alt={review.item_name}
                className="user-reviews__item-image"
              />
            </div>
            <div className="user-reviews__details">
              <p className="user-reviews__item-name">Item: {review.item_name}</p> {/* Display the item name */}
              <p className="user-reviews__rating">Rating: {review.rating}</p>
              <p className="user-reviews__comment">Comment: {review.comment}</p>
              <div className="user-reviews__actions">
                <button onClick={() => handleDeleteReview(review.id)} className="user-reviews__delete-button">
                  Delete
                </button>
                <button onClick={() => handleUpdateReview(review.id)} className="user-reviews__update-button">
                  Update
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserReviews;
