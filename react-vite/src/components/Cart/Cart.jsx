import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart, removeFromCart, updateCartItem } from '../../redux/cart';
import { checkout } from '../../redux/orders';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    if (quantity < 1) return;
    dispatch(updateCartItem(itemId, quantity));
  };

  if (loading) {
    return <div>Loading your cart...</div>;
  }

  if (!Array.isArray(cartItems)) {
    console.error('cartItems is not an array:', cartItems);
    return <div>Error: Cart data is invalid.</div>;
  }

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.item?.price || 0) * item.quantity;
  }, 0);

  const handleCheckout = () => {
    dispatch(checkout());
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            <p>{item.item.name} - ${item.item.price}</p>
            {/* <p>Quantity: {item.quantity}</p>

            {item.item.condition === 'NEW' && (
              <>
                <button onClick={() => handleUpdateQuantity(item.item_id, item.quantity + 1)}>+</button>
                <button onClick={() => handleUpdateQuantity(item.item_id, item.quantity - 1)}>-</button>
              </>
            )} */}

            <button onClick={() => handleRemoveItem(item.item_id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </div>

      <button onClick={handleCheckout} disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
