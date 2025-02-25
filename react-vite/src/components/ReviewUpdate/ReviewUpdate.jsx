import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateReview } from "../../redux/reviews"; // Import the updateReview action
import './ReviewUpdate.css'; // Import the CSS file for styles

const UpdateReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get review ID from URL parameters

  const [review, setReview] = useState({
    rating: 1,
    comment: "",
  });

  const [errors, setErrors] = useState({
    comment: "",
  });

  useEffect(() => {
    // Fetch review data by ID to prefill the form
    const fetchReviewData = async () => {
      const response = await fetch(`/api/reviews/${id}`);
      const data = await response.json();
      setReview(data[0]); // Assuming the response is an array and we want the first review
    };

    fetchReviewData();
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    // Comment Validation
    if (review.comment.length < 5) {
      newErrors.comment = "Comment must be at least 5 characters.";
    }

    setErrors(newErrors);

    // Return true if no errors, else false
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(updateReview(id, review)); // Dispatch update review action
      navigate("/reviews/current"); // Redirect to user reviews page
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
    <div className="update-review__container">
      <h2 className="update-review__heading">Update Your Review</h2>
      <form onSubmit={handleSubmit} className="update-review__form">
        <label className="update-review__label">Rating</label>
        <input
          type="number"
          name="rating"
          value={review.rating}
          min="1"
          max="5"
          onChange={handleChange}
          className="update-review__input"
        />

        <label className="update-review__label">Comment</label>
        <textarea
          name="comment"
          value={review.comment}
          onChange={handleChange}
          className="update-review__textarea"
        />
        {errors.comment && <p className="error">{errors.comment}</p>}

        <button type="submit" className="update-review__button">Update Review</button>
      </form>
    </div>
  );
};

export default UpdateReview;
