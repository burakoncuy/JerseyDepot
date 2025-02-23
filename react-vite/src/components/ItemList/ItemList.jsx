import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../redux/items';
import { addToCart, fetchCart } from '../../redux/cart';
import { getItems as refreshItems } from '../../redux/items';
import { useNavigate } from "react-router-dom";
import './ItemList.css';

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.allItems);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.session?.user);
  const navigate = useNavigate();

  // Fetch both items and cart data when component mounts
  useEffect(() => {
    const loadInitialData = async () => {
      await dispatch(fetchCart());
      await dispatch(getItems());
    };
    loadInitialData();
  }, [dispatch]);

  // Check if item is in cart using item_id
  const isItemInCart = (itemId) => {
    return cartItems.some((cartItem) => cartItem.item_id === itemId);
  };

  const handleAddToCart = async (itemId, itemStatus) => {
    if (itemStatus !== 'SOLD' && !isItemInCart(itemId)) {
      try {
        await dispatch(addToCart(itemId, 1));
        alert('Item added to cart successfully!');
      } catch (error) {
        console.error('Failed to add item to cart:', error);
        alert('Failed to add item to cart. Please try again.');
      }
    }
  };

  const handleItemClick = (itemId) => {
    navigate(`/items/${itemId}`);
  };

  // Refresh items when cart changes to update availability
  useEffect(() => {
    dispatch(refreshItems());
  }, [cartItems, dispatch]);

  return (
    <div className="item-list-container">
      <h2 className="item-list-heading">All Items</h2>
      <ul className="item-list-grid">
        {items.map((item) => {
          const inCart = isItemInCart(item.id);
          return (
            <li key={item.id} className="item-card">
              <img
                src={item.image_url}
                alt={item.name}
                className="item-image"
                onClick={() => user && handleItemClick(item.id)}
                style={{ cursor: user ? 'pointer' : 'default' }}
              />
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-price">${item.price}</p>
                <button 
                  className="add-to-cart-button" 
                  onClick={() => handleAddToCart(item.id, item.item_status)}
                  disabled={item.item_status === 'SOLD' || inCart}
                >
                  {item.item_status === 'SOLD' 
                    ? 'Sold Out' 
                    : inCart
                      ? 'Item in Cart' 
                      : 'Add to Cart'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;