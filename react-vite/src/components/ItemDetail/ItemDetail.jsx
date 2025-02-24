import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getItem } from '../../redux/items';
import { fetchReviews } from '../../redux/reviews';
import { addFavoriteItem, removeFavoriteItem, getFavorites } from '../../redux/favorite';
import { addToCart, fetchCart } from '../../redux/cart';

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const { item, notFound, error } = useSelector(state => state.items);
  const reviews = useSelector(state => state.reviews.reviews);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.session?.user);
  const favorites = useSelector(state => state.favorites.favorites);

  useEffect(() => {
    const loadInitialData = async () => {
      if (id) {
        if (user) {
          await dispatch(fetchCart());
        }
        await dispatch(getItem(id));
        await dispatch(fetchReviews(id)); // Pass the itemId to fetchReviews
        await dispatch(getFavorites()); // Ensure favorites are loaded
      }
    };
    loadInitialData();
  }, [dispatch, id, user]);

  const isFavorite = favorites.some(fav => fav.id === item?.id);

  const handleFavoriteToggle = () => {
    if (!item) return;
    if (isFavorite) {
      dispatch(removeFavoriteItem(item.id)).then(() => {
        dispatch(getFavorites());  // Reload the favorites list after removal
      });
    } else {
      dispatch(addFavoriteItem(item.id)).then(() => {
        dispatch(getFavorites());  // Reload the favorites list after addition
      });
    }
  };

  const handleAddReview = () => {
    navigate(`/items/${item.id}/reviews`);
  };

  const handleAddToCart = async (itemId, itemStatus) => {
    if (itemStatus !== 'SOLD' && !cartItems.some(cartItem => cartItem.item_id === itemId)) {
      try {
        await dispatch(addToCart(itemId, 1));
        await dispatch(fetchCart());
      } catch (error) {
        console.error('Failed to add item to cart:', error);
        alert('Failed to add item to cart. Please try again.');
      }
    }
  };

  if (notFound) {
    return <div>Item not found</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!item) {
    return <div>Loading...</div>;
  }

  const inCart = cartItems.some(cartItem => cartItem.item_id === item.id);

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

      <button onClick={handleFavoriteToggle}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>

      <button onClick={handleAddReview}>Add Review</button>

      <button 
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
