import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserItems } from "../../redux/items";
import './ItemCurrent.css';

const ItemCurrent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userItems = useSelector((state) => state.items.userItems);

  useEffect(() => {
    dispatch(getUserItems());
  }, [dispatch]);

  return (
    <div className="item-current__container">
      <h2 className="item-current__heading">Your Items</h2>

      {/* Create New Item button is always visible */}
      <button 
        onClick={() => navigate("/items/new")} 
        className="item-current__create-item-button"
      >
        Create New Item
      </button>

      {/* No items found */}
      {(!userItems || userItems.length === 0) && (
        <p className="item-current__no-items-message">No items found.</p>
      )}

      {/* Show items if available */}
      {userItems && userItems.length > 0 && (
        <ul className="item-current__list">
          {userItems.map((item) => (
            <li key={item.id} className="item-current__card">
              <div className="item-current__image-container">
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="item-current__image" 
                />
              </div>
              <div className="item-current__details">
                <h3 className="item-current__name">{item.name}</h3>
                <p className="item-current__description">{item.description}</p>
                <p className="item-current__price">Price: ${item.price}</p>
                <p className="item-current__status">Status: {item.item_status}</p>

                <div className="item-current__actions">
                  <button 
                    onClick={() => navigate(`/items/${item.id}/update`)} 
                    className="item-current__update-item-button"
                  >
                    Update
                  </button>

                  <button 
                    onClick={() => navigate(`/items/${item.id}/delete`)} 
                    className="item-current__delete-item-button"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ItemCurrent;
