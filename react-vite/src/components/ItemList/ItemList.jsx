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
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState({});
  
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

  // Check if the current user is the owner of an item
  const isOwner = (item) => {
    return user && item.user_id === user.id;
  };

  const handleAddToCart = async (itemId, itemStatus) => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (itemStatus !== 'SOLD' && !isItemInCart(itemId)) {
      try {
        await dispatch(addToCart(itemId, 1));
        setConfirmationMessage({
          [itemId]: 'Item added to cart successfully!'
        });
        setTimeout(() => {
          setConfirmationMessage((prev) => {
            const newState = { ...prev };
            delete newState[itemId]; // Remove the message after 1 seconds
            return newState;
          });
        }, 1000); // Hide message after 1 seconds
      } catch (error) {
        console.error('Failed to add item to cart:', error);
        setConfirmationMessage({
          [itemId]: 'Failed to add item to cart. Please try again.' 
        });
        setTimeout(() => {
          setConfirmationMessage((prev) => {
            const newState = { ...prev };
            delete newState[itemId]; // Remove the message after 3 seconds
            return newState;
          });
        }, 3000); // Hide message after 3 seconds
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

  const handleClearFilters = () => {
    setCategoryFilter('');
    setStatusFilter('');
    setSizeFilter('');
    setConditionFilter('');
    setSortOrder('');
    setSearchQuery('');
  };

  let filteredItems = items.filter((item) => (
    (categoryFilter ? item.category === categoryFilter : true) &&
    (statusFilter ? item.item_status === statusFilter : true) &&
    (sizeFilter ? item.size === sizeFilter : true) &&
    (conditionFilter ? item.condition === conditionFilter : true) &&
    (searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  ));

  if (sortOrder === 'low-to-high') {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-to-low') {
    filteredItems.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="item-list-container">
      {/* <h2 className="item-list-heading">Jerseys</h2> */}
      
      <div className="filters">
        <input 
          type="text" 
          placeholder="Search items..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="SOCCER">Soccer</option>
          <option value="FOOTBALL">Football</option>
          <option value="BASKETBALL">Basketball</option>
          <option value="BASEBALL">Baseball</option>
        </select>

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All Status</option>
          <option value="AVAILABLE">Available</option>
          <option value="SOLD">Sold</option>
        </select>

        <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
          <option value="">All Sizes</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>

        <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)}>
          <option value="">All Conditions</option>
          <option value="NEW">New</option>
          <option value="USED">Used</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="">Sort By Price</option>
          <option value="low-to-high">Low to High</option>
          <option value="high-to-low">High to Low</option>
        </select>

        <button className="clear-filters-button" onClick={handleClearFilters}>Clear All Filters</button>
      </div>

      <ul className="item-list-grid">
        {filteredItems.map((item) => {
          const inCart = isItemInCart(item.id);
          const userOwnsItem = isOwner(item);
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
                  <>
                    <button 
                      className="add-to-cart-button" 
                      onClick={() => handleAddToCart(item.id, item.item_status)}
                      disabled={item.item_status === 'SOLD' || inCart || userOwnsItem}
                      title={userOwnsItem ? "You cannot add your own item to cart" : ""}
                    >
                      {item.item_status === 'SOLD' 
                        ? 'Sold Out' 
                        : userOwnsItem 
                          ? 'Your Item' 
                          : inCart 
                            ? 'Item in Cart' 
                            : 'Add to Cart'}
                    </button>
                    {confirmationMessage[item.id] && (
                      <p className="confirmation-message">{confirmationMessage[item.id]}</p>
                    )}
                  </>
                ) : (
                  <button className="login-to-buy-button" onClick={() => navigate('/')}>Login to Purchase</button>
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
