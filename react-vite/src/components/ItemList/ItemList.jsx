import { useEffect, useState } from 'react';
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
  const [sellerFilter, setSellerFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState({});
  const [users, setUsers] = useState({});
  
  // Get unique sellers from items
  const sellers = [...new Set(items.map(item => item.user_id))];
  
  useEffect(() => {
    const loadInitialData = async () => {
      if (user) {
        await dispatch(fetchCart());
      }
      await dispatch(getItems());
      
      // Fetch all users to get usernames
      try {
        const response = await fetch('/api/users/');
        if (response.ok) {
          const data = await response.json();
          // Create a map of user IDs to usernames
          const userMap = {};
          data.users.forEach(user => {
            userMap[user.id] = user.username;
          });
          setUsers(userMap);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
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

  const handleAddToCart = async (itemId, itemStatus, sellerId) => {
    if (!user) {
      navigate('/login');
      return;
    }
  
    // Check if cart has items from a different seller
    if (cartItems.length > 0) {
      // Safely get the seller ID by checking the structure
      let existingSellerId;
      
      // Check different possible structures of cartItems
      if (cartItems[0].item && cartItems[0].item.user_id !== undefined) {
        existingSellerId = cartItems[0].item.user_id;
      } else if (cartItems[0].user_id !== undefined) {
        existingSellerId = cartItems[0].user_id;
      } else {
        // If we can't determine the seller ID, we'll need to fetch the cart again
        try {
          await dispatch(fetchCart());
          // Rather than recursively calling, just proceed with the add
          // We'll check on the next attempt if needed
        } catch (error) {
          console.error("Failed to refresh cart data:", error);
        }
      }
      
      // Only check seller ID if we found one
      if (existingSellerId !== undefined && existingSellerId !== sellerId) {
        alert("You can only add items from one seller at a time. Please clear your cart first.");
        return;
      }
    }
  
    if (itemStatus !== 'SOLD' && !isItemInCart(itemId)) {
      try {
        await dispatch(addToCart(itemId, 1));
        await dispatch(fetchCart()); // Refresh cart after adding
        setConfirmationMessage({ [itemId]: 'Item added to cart successfully!' });
  
        setTimeout(() => {
          setConfirmationMessage((prev) => {
            const newState = { ...prev };
            delete newState[itemId];
            return newState;
          });
        }, 1000);
      } catch (error) {
        setConfirmationMessage({ [itemId]: error.message || "Failed to add item to cart" });
  
        setTimeout(() => {
          setConfirmationMessage((prev) => {
            const newState = { ...prev };
            delete newState[itemId];
            return newState;
          });
        }, 3000);
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
    setSellerFilter('');
    setSortOrder('');
    setSearchQuery('');
  };

  let filteredItems = items.filter((item) => (
    (categoryFilter ? item.category === categoryFilter : true) &&
    (statusFilter ? item.item_status === statusFilter : true) &&
    (sizeFilter ? item.size === sizeFilter : true) &&
    (conditionFilter ? item.condition === conditionFilter : true) &&
    (sellerFilter ? item.user_id.toString() === sellerFilter : true) &&
    (searchQuery ? item.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
  ));

  if (sortOrder === 'low-to-high') {
    filteredItems.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high-to-low') {
    filteredItems.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="item-list-container">
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
        </select>

        <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)}>
          <option value="">All Conditions</option>
          <option value="NEW">New</option>
          <option value="USED">Used</option>
        </select>

        {user && (
          <>
            <select value={sellerFilter} onChange={(e) => setSellerFilter(e.target.value)}>
              <option value="">All Stores</option>
              {sellers.map(sellerId => (
                <option key={sellerId} value={sellerId.toString()}>
                  {users[sellerId] || `Seller ${sellerId}`}
                </option>
              ))}
            </select>
          </>
        )}

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
                {user && (
                  <p className="item-seller">
                    Store: {users[item.user_id] || `Seller ${item.user_id}`}
                  </p>
                )}
                {user ? (
                  <>
                    <button 
                      className="add-to-cart-button" 
                      onClick={() => handleAddToCart(item.id, item.item_status, item.user_id)}
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
