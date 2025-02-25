import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReviews } from '../../redux/reviews'; // Adjust the import path as needed
import { getItems } from '../../redux/items'; // Adjust the import path as needed

const ReviewList = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews); // Adjust the state path as needed
  const items = useSelector((state) => state.items.allItems); // Adjust the state path as needed

  useEffect(() => {
    dispatch(fetchReviews());
    dispatch(getItems());
  }, [dispatch]);

  // Group reviews by item_id
  const reviewsByItem = reviews.reduce((acc, review) => {
    if (!acc[review.item_id]) {
      acc[review.item_id] = [];
    }
    acc[review.item_id].push(review);
    return acc;
  }, {});

  return (
    <div>
      <h2>Items and Their Reviews</h2>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>{item.name}</h3>
          <img src={item.image_url} alt={item.name} style={{ width: '100px', height: '100px' }} />
          {/* <p>Price: ${item.price}</p>
          <p>Category: {item.category}</p>
          <p>Condition: {item.condition}</p> */}
          <h4>Reviews:</h4>
          {reviewsByItem[item.id] ? (
            <ul>
              {reviewsByItem[item.id].map((review) => (
                <li key={review.id}>
                  <p>Rating: {review.rating}</p>
                  <p>Comment: {review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;