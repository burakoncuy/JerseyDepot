import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserItems } from "../../redux/items";

const ItemCurrent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      {/* Button to navigate to the Create Item page */}
      <button onClick={() => navigate("/items/new")} className="create-item-button">
        Create New Item
      </button>
      <ul>
        {userItems.map((item) => (
          <li key={item.id}>
            <img src={item.image_url} alt={item.name} width="100" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Status: {item.item_status}</p>

            {/* Button to navigate to Update Item page */}
            <button onClick={() => navigate(`/items/${item.id}/update`)} className="update-item-button">
              Update
            </button>

             {/* Button to navigate to Update Item page */}
             <button onClick={() => navigate(`/items/${item.id}/delete`)} className="delete-item-button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemCurrent;
