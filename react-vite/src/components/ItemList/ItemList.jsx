import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../redux/items';
// import { addToCart ,fetchCart } from '../../redux/cart';
// import { useLocation, useNavigate } from "react-router-dom"
// import { addToFavorites, removeFromFavorites, getFavorites } from '../../redux/favorite';
// import { FaRegHeart, FaHeart } from "react-icons/fa";
import './ItemList.css'; // Import the CSS file

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.allItems);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  return (
    <div className="item-list-container">
      <h2 className="item-list-heading">All Items</h2>
      <ul className="item-list-grid">
        {items.map((item) => (
          <li key={item.id} className="item-card">
            <img
              src={item.image_url} // Ensure your item data includes an image_url field
              alt={item.name}
              className="item-image"
            />
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <p className="item-price">${item.price}</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;