// actionTypes.js
 const FETCH_CART = 'FETCH_CART';
 const ADD_TO_CART = 'ADD_TO_CART';
 const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
 const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';

 // cartActions

// Fetch the current user's cart
export const fetchCart = () => async (dispatch) => {
  try {
    const response = await fetch('/api/cart', {
      credentials: 'include',
    });
    const data = await response.json();

    // Ensure cartItems is always an array
    const cartItems = Array.isArray(data) ? data : [];
    
    dispatch({ type: FETCH_CART, payload: cartItems });
  } catch (error) {
    console.error('Error fetching cart:', error);
  }
};

// Add an item to the cart
export const addToCart = (itemId, quantity) => async (dispatch) => {
  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ item_id: itemId, quantity }),
    });
    const cartItem = await response.json();
    dispatch({ type: ADD_TO_CART, payload: cartItem });
  } catch (error) {
    console.error('Error adding to cart:', error);
  }
};

// Remove an item from the cart
export const removeFromCart = (itemId) => async (dispatch) => {
  try {
    await fetch(`/api/cart/${itemId}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    dispatch({ type: REMOVE_FROM_CART, payload: itemId });
  } catch (error) {
    console.error('Error removing from cart:', error);
  }
};

// Update an item in the cart
export const updateCartItem = (itemId, quantity) => async (dispatch) => {
  try {
    const response = await fetch(`/api/cart/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ quantity }),
    });
    const updatedCartItem = await response.json();
    dispatch({ type: UPDATE_CART_ITEM, payload: updatedCartItem });
  } catch (error) {
    console.error('Error updating cart item:', error);
  }
};


const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART:
      return {
        ...state,
        cartItems: Array.isArray(action.payload) ? action.payload : [],
      };
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.item_id !== action.payload),
      };
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id ? { ...item, ...action.payload } : item
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;