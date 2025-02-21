import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateReview } from "../../redux/reviews"; // Make sure to import the updateReview action

const UpdateReview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get review ID from URL parameters

  const [review, setReview] = useState({
    rating: 1,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateReview(id, review)); // Dispatch update review action
    navigate("/reviews/current"); // Redirect to user reviews page
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
      <h2>Update Your Review</h2>
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

        <button type="submit">Update Review</button>
      </form>
    </div>
  );
};

export default UpdateReview;
