import React, { useEffect, useState } from 'react';
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

  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sizeFilter, setSizeFilter] = useState('');
  const [conditionFilter, setConditionFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  useEffect(() => {
    const loadInitialData = async () => {
      if (user) {
        await dispatch(fetchCart());
      }
      await dispatch(getItems());
    };
    loadInitialData();
  }, [dispatch, user]);

  const isItemInCart = (itemId) => {
    return cartItems.some((cartItem) => cartItem.item_id === itemId);
  };

  const handleAddToCart = async (itemId, itemStatus) => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not authenticated
      return;
    }

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

  useEffect(() => {
    if (user) {
      dispatch(refreshItems());
    }
  }, [cartItems, dispatch, user]);

  let filteredItems = items.filter((item) => {
    return (
      (categoryFilter ? item.category === categoryFilter : true) &&
      (statusFilter ? item.item_status === statusFilter : true) &&
      (sizeFilter ? item.size === sizeFilter : true) &&
      (conditionFilter ? item.condition === conditionFilter : true)
    );
  });

  if (sortOrder === 'low-to-high') {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-to-low') {
    filteredItems.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="item-list-container">
      <h2 className="item-list-heading">All Items</h2>
      
      <div className="filters">
        <select onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="SOCCER">Soccer</option>
          <option value="FOOTBALL">Football</option>
          <option value="BASKETBALL">Basketball</option>
          <option value="BASEBALL">Baseball</option>
        </select>

        <select onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="AVAILABLE">Available</option>
          <option value="SOLD">Sold</option>
        </select>

        <select onChange={(e) => setSizeFilter(e.target.value)}>
          <option value="">All Sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>

        <select onChange={(e) => setConditionFilter(e.target.value)}>
          <option value="">All Conditions</option>
          <option value="NEW">New</option>
          <option value="USED">Used</option>
        </select>

        <select onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort By Price</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>
      </div>

      <ul className="item-list-grid">
        {filteredItems.map((item) => {
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
                {user ? (
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
                ) : (
                  <button 
                    className="login-to-buy-button"
                    onClick={() => navigate('/')}
                  >
                    Login to Purchase
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ItemList;