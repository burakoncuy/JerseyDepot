import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addReview } from "../../redux/reviews"; // Import the addReview action
import './ReviewAdd.css'; // Import the CSS file for styles

const AddReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get item ID from URL parameters

  const [review, setReview] = useState({
    rating: 1,
    comment: "",
  });

  const [errors, setErrors] = useState({
    comment: "",
  });

  const validateForm = () => {
    const newErrors = {};

   // Comment Validation
   if (review.comment.length < 5) {
    newErrors.comment = "Comment must be at least 5 characters.";
  } else if (!isNaN(review.comment.trim())) {
    newErrors.comment = "Comment cannot be just a number.";
  }

    setErrors(newErrors);

    // Return true if no errors, else false
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Dispatch the addReview action with the item ID and review data
        await dispatch(addReview(id, review));
        navigate(`/items/${id}`); // Redirect to the item details page after adding the review
      } catch (error) {
        console.error("Error adding review:", error);
      }
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
    <div className="add-review__container">
      <h2 className="add-review__heading">Add a Review</h2>
      <form onSubmit={handleSubmit} className="add-review__form">
        <label className="add-review__label">Rating</label>
        <input
          type="number"
          name="rating"
          value={review.rating}
          min="1"
          max="5"
          onChange={handleChange}
          className="add-review__input"
        />

        <label className="add-review__label">Comment</label>
        <textarea
          name="comment"
          value={review.comment}
          onChange={handleChange}
          className="add-review__textarea"
        />
        {errors.comment && <p className="error">{errors.comment}</p>}

        <button type="submit" className="add-review__button">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
