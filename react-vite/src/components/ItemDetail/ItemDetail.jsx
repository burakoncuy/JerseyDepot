import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { getItem } from '../../redux/items';
import { addToFavorites } from '../../redux/favorite';

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the `id` parameter from the URL
  const navigate = useNavigate(); // Hook for navigation
  const { item, notFound, error } = useSelector(state => state.items);

  useEffect(() => {
    if (id) {
      dispatch(getItem(id)); // Fetch the item using the `id` from the URL
    }
  }, [dispatch, id]);

  const handleAddToFavorites = () => {
    fetch(`/api/items/${item.id}/add-to-favorite`, {
      method: 'POST',
    })
      .then(() => dispatch(addToFavorites(item)))
      .catch((error) => console.error('Error adding to favorites:', error));
  };

  const handleAddReview = () => {
    navigate(`/items/${item.id}/reviews`); // Redirect to the Add Review component
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
      <p>Price: {item.price}</p>
      <p>Category: {item.category}</p>
      <p>Condition: {item.condition}</p>
      <p>Size: {item.size}</p>
      <p>Status: {item.item_status}</p>
      <img src={item.image_url} alt={item.name} />

      {/* Add to Favorites Button */}
      <button onClick={handleAddToFavorites}>Add to Favorites</button>

      {/* Add Review Button */}
      <button onClick={handleAddReview}>Add Review</button>
    </div>
  );
};

export default ItemDetail;