import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateCartItem } from '../../redux/cart';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    // Fetch cart data and handle loading state
    const loadCart = async () => {
      await dispatch(fetchCart());
      setLoading(false);
    };

    loadCart();
  }, [dispatch]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity < 1) return; // Avoid setting negative quantity or zero
    dispatch(updateCartItem(itemId, quantity));
  };

  // Ensure cartItems is an array before trying to map
  if (loading) {
    return <div>Loading your cart...</div>;
  }

  if (!Array.isArray(cartItems)) {
    console.error('cartItems is not an array:', cartItems);
    return <div>Error: Cart data is invalid.</div>;
  }

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    if (!item.item || !item.item.price) {
      return total;
    }
    return total + (item.item.price * item.quantity); // Item price * quantity
  }, 0);

  // Handle the checkout process
  const handleCheckout = () => {
    console.log('Proceeding to checkout...');
    // Optionally, redirect to a checkout page here.
  };

  // If cart is empty
  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>{item.item.name} - ${item.item.price}</p>
            <p>Quantity: {item.quantity}</p>

            {/* Conditionally show + and - buttons for new items */}
            {item.item.condition === 'NEW' && (
              <>
                <button onClick={() => handleUpdateQuantity(item.item_id, item.quantity + 1)}>
                  +
                </button>
                <button onClick={() => handleUpdateQuantity(item.item_id, item.quantity - 1)}>
                  -
                </button>
              </>
            )}

            {/* Remove button is always visible */}
            <button onClick={() => handleRemoveItem(item.item_id)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* Total Price Section */}
      <div>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>

      {/* Proceed to Checkout Button */}
      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
