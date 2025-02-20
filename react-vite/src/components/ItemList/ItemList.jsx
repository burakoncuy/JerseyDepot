import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../redux/items'

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.allItems);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <div>
      <h2>All Items</h2>
      <ul>
        {items.map((item) => (
          
          <li key={item.id}>{item.name} - {item.price}</li>
        ))}
     
      </ul>
    </div>
  );
};

export default ItemList;
