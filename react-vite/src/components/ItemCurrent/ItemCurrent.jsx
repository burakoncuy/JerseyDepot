
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserItems } from "../../redux/items";

const ItemCurrent = () => {
  const dispatch = useDispatch();
  const userItems = useSelector((state) => state.items.userItems);

  useEffect(() => {
    dispatch(getUserItems());
  }, [dispatch]);

  if (!userItems || userItems.length === 0) {
    return <p>No items found.</p>;
  }

  return (
    <div>
      <h2>Your Items</h2>
      <ul>
        {userItems.map((item) => (
          <li key={item.id}>
            <img src={item.image_url} alt={item.name} width="100" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Status: {item.item_status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemCurrent;
