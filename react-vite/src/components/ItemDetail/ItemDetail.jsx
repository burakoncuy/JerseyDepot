import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams
import { getItem } from '../../redux/items';
import { addToFavorites } from '../../redux/favorite';

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Use useParams to get the `id` parameter
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
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default ItemDetail;