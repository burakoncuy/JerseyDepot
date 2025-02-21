import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { getItem } from '../../redux/items';
import { addToFavorites, removeFromFavorites } from '../../redux/favorite';
import { addToCart } from '../../redux/cart'; // Import addToCart action

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the `id` parameter from the URL
  const navigate = useNavigate(); // Hook for navigation
  const { item, notFound, error, favorites } = useSelector(state => state.items);
  const [quantity, setQuantity] = useState(1); // Local state for quantity

  useEffect(() => {
    if (id) {
      dispatch(getItem(id)); // Fetch the item using the `id` from the URL
    }
  }, [dispatch, id]);

  // Ensure favorites is always an array (fallback to empty array if undefined)
  const favoritesList = favorites || [];

  // Check if the item is in the favorites
  const isFavorite = favoritesList.some(fav => fav.id === item.id);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(item.id)); // Remove from favorites
    } else {
      fetch(`/api/items/${item.id}/add-to-favorite`, {
        method: 'POST',
      })
        .then(() => dispatch(addToFavorites(item))) // Add to favorites
        .catch((error) => console.error('Error adding to favorites:', error));
    }
  };

  const handleAddReview = () => {
    navigate(`/items/${item.id}/reviews`); // Redirect to the Add Review component
  };

  const handleAddToCart = () => {
    // Add the item to the cart with the current quantity
    dispatch(addToCart(item.id, quantity));
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

      {/* Heart Icon for Add to Favorites */}
      <button onClick={handleFavoriteToggle} style={{ background: 'none', border: 'none' }}>
        <i
          className={`fa fa-heart ${isFavorite ? 'text-danger' : ''}`} // Apply text-danger for red color
          style={{ fontSize: '2rem', cursor: 'pointer' }}
        ></i>
      </button>

      {/* Add Review Button */}
      <button onClick={handleAddReview}>Add Review</button>

      {/* Show quantity input only if the item is new */}
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

      {/* Add to Cart Button */}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ItemDetail;