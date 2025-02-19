import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; // Import useParams
import { getItem } from '../../redux/items';

const ItemDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Use useParams to get the `id` parameter
  const { item, notFound, error } = useSelector(state => state.items);

  useEffect(() => {
    if (id) {
      dispatch(getItem(id)); // Fetch the item using the `id` from the URL
    }
  }, [dispatch, id]);

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
    </div>
  );
};

export default ItemDetail;