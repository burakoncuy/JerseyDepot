import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem } from '../../redux/items';
import { fetchReviews } from '../../redux/reviews';  // Import fetchReviews action
import { addToFavorites, removeFromFavorites } from '../../redux/favorite';
import { addToCart } from '../../redux/cart';

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, notFound, error, favorites } = useSelector(state => state.items);
  const reviews = useSelector(state => state.reviews.reviews); // Get reviews from Redux store

console.log(reviews); // Log reviews to ensure user_name is included

  const [quantity, setQuantity] = useState(1);
  const [cartConfirmation, setCartConfirmation] = useState(""); // State for cart confirmation

  useEffect(() => {
    if (id) {
      dispatch(getItem(id));
      dispatch(fetchReviews()); // Fetch reviews when the item page loads
    }
  }, [dispatch, id]);

  const favoritesList = favorites || [];
  const isFavorite = favoritesList.some(fav => fav.id === item.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(item.id));
    } else {
      fetch(`/api/items/${item.id}/add-to-favorite`, {
        method: 'POST',
      })
        .then(() => dispatch(addToFavorites(item)))
        .catch((error) => console.error('Error adding to favorites:', error));
    }
  };

  const handleAddReview = () => {
    navigate(`/items/${item.id}/reviews`);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(item.id, quantity));
    setCartConfirmation("Item added to cart!"); // Show confirmation
    setTimeout(() => {
      setCartConfirmation(""); // Hide confirmation after 3 seconds
    }, 3000);
  };

  // Filter reviews for the current item
  const itemReviews = reviews.filter((review) => review.item_id === parseInt(id));

  if (notFound) {
    return <div>Item not found</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
      <p>Category: {item.category}</p>
      <p>Condition: {item.condition}</p>
      <p>Size: {item.size}</p>
      <p>Status: {item.item_status}</p>
      <img src={item.image_url} alt={item.name} />

      <button onClick={handleFavoriteToggle} style={{ background: 'none', border: 'none' }}>
        <i
          className={`fa fa-heart ${isFavorite ? 'text-danger' : ''}`}
          style={{ fontSize: '2rem', cursor: 'pointer' }}
        ></i>
      </button>

      <button onClick={handleAddReview}>Add Review</button>

      {item.condition === 'NEW' && (
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
          />
        </div>
      )}

      <button onClick={handleAddToCart}>Add to Cart</button>

      {/* Display confirmation message when item is added to cart */}
      {cartConfirmation && <div>{cartConfirmation}</div>}

      {/* Render reviews below the item details */}
      <div className="reviews-section">
  <h3>Reviews</h3>
  {itemReviews.length === 0 ? (
    <p>No reviews yet. Be the first to add one!</p>
  ) : (
    <ul>
      {itemReviews.map((review) => (
        <li key={review.id} className="review-item">
          <p><strong>{review.user_name}</strong> says:</p> {/* Display the username */}
          <p>{review.comment}</p>
          <p>Rating: {review.rating}</p>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default ItemDetail;
