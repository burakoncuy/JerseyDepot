import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getItems } from '../../redux/items';
import './ItemList.css'; // Import the CSS file

const ItemList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.items.allItems);
  const user = useSelector((state) => state.session?.user); // Ensure optional chaining for safety

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  // Function to navigate to item details page
  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  return (
    <div className="item-list-container">
      <h2 className="item-list-heading">All Items</h2>
      <ul className="item-list-grid">
        {items.map((item) => (
          <li key={item.id} className="item-card">
            {/* Make image clickable only if user is logged in */}
            <img
              src={item.image_url}
              alt={item.name}
              className="item-image"
              onClick={() => user && handleItemClick(item.id)} // Check if user is logged in
              style={{ cursor: user ? 'pointer' : 'default' }} // Change cursor to default if not logged in
            />
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-price">${item.price}</p>
              {/* {user && <button className="add-to-cart-button">Add to Cart</button>} */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
