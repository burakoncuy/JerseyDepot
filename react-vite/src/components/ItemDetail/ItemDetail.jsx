import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem } from '../../redux/items';
import { fetchReviews } from '../../redux/reviews';
import { addToFavorites, removeFromFavorites } from '../../redux/favorite';
import { addToCart, fetchCart } from '../../redux/cart';

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { item, notFound, error, favorites } = useSelector(state => state.items);
  const reviews = useSelector(state => state.reviews.reviews);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.session?.user);

  useEffect(() => {
    const loadInitialData = async () => {
      if (id) {
        if (user) {
          await dispatch(fetchCart());
        }
        await dispatch(getItem(id));
        await dispatch(fetchReviews(id)); // Pass the itemId to fetchReviews
      }
    };
    loadInitialData();
  }, [dispatch, id, user]);

  const favoritesList = favorites || [];
  const isFavorite = favoritesList.some(fav => fav.id === item?.id);

  // Check if item is in cart
  const isItemInCart = (itemId) => {
    return cartItems.some((cartItem) => cartItem.item_id === itemId);
  };

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

  const handleAddToCart = async (itemId, itemStatus) => {
    if (itemStatus !== 'SOLD' && !isItemInCart(itemId)) {
      try {
        await dispatch(addToCart(itemId, 1));
        await dispatch(fetchCart()); // Refresh cart after adding item
      } catch (error) {
        console.error('Failed to add item to cart:', error);
        alert('Failed to add item to cart. Please try again.');
      }
    }
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

  const inCart = isItemInCart(item.id);

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

      <button 
        className="add-to-cart-button" 
        onClick={() => handleAddToCart(item.id, item.item_status)}
        disabled={item.item_status === 'SOLD' || inCart}
      >
        {item.item_status === 'SOLD' 
          ? 'Sold Out' 
          : inCart
            ? 'Item in Cart'
            : 'Add to Cart'}
      </button>

      <div className="reviews-section">
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet. {user ? 'Be the first to add one!' : 'Login to add a review!'}</p>
        ) : (
          <ul>
            {reviews.map((review) => (
              <li key={review.id} className="review-item">
                <div className="review-header">
                  <p className="review-author">
                    <strong>{review.user_name}</strong>
                  </p>
                  <p className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="review-rating">
                  Rating: {review.rating} / 5
                </div>
                <p className="review-comment">{review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;