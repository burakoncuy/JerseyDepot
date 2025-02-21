import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateCartItem } from '../../redux/cart';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemoveItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleUpdateQuantity = (itemId, quantity) => {
    if (quantity < 1) return; // Avoid setting negative quantity or zero
    dispatch(updateCartItem(itemId, quantity));
  };

  // Ensure cartItems is an array before trying to map
  if (!Array.isArray(cartItems)) {
    console.error('cartItems is not an array:', cartItems);
    return <div>Error: Cart data is invalid.</div>;
  }

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.item.price * item.quantity); // Item price * quantity
  }, 0);

  // Proceed to checkout handler
  const handleCheckout = () => {
    // Handle the checkout process (e.g., redirect to a checkout page)
    console.log('Proceeding to checkout...');
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <p>{item.item.name} - ${item.item.price}</p>
                <p>Quantity: {item.quantity}</p>
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
        </>
      )}
    </div>
  );
};

export default Cart;
