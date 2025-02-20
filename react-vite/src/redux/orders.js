// actionTypes.js
const FETCH_ORDERS = 'FETCH_ORDERS';
const FETCH_ORDER_DETAILS = 'FETCH_ORDER_DETAILS';
const CREATE_ORDER = 'CREATE_ORDER';
const UPDATE_ORDER_STATUS = 'UPDATE_ORDER_STATUS';

// orderActions.js
  
  // Fetch all orders for the current user
  export const fetchOrders = () => async (dispatch) => {
    try {
      const response = await fetch('/api/orders', {
        credentials: 'include', // Include cookies for authentication
      });
      const orders = await response.json();
      dispatch({ type: FETCH_ORDERS, payload: orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  // Fetch details for a specific order
  export const fetchOrderDetails = (orderId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        credentials: 'include',
      });
      const orderDetails = await response.json();
      dispatch({ type: FETCH_ORDER_DETAILS, payload: orderDetails });
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };
  
  // Create a new order
  export const createOrder = () => async (dispatch) => {
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        credentials: 'include',
      });
      const newOrder = await response.json();
      dispatch({ type: CREATE_ORDER, payload: newOrder });
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  
  // Update order status
  export const updateOrderStatus = (orderId, newStatus) => async (dispatch) => {
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ order_status: newStatus }),
      });
      const updatedOrder = await response.json();
      dispatch({ type: UPDATE_ORDER_STATUS, payload: updatedOrder });
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };


  
  const initialState = {
    orders: [], // List of all orders
    orderDetails: null, // Details of a specific order
  };
  
  const orderReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ORDERS:
        return {
          ...state,
          orders: action.payload,
        };
      case FETCH_ORDER_DETAILS:
        return {
          ...state,
          orderDetails: action.payload,
        };
      case CREATE_ORDER:
        return {
          ...state,
          orders: [...state.orders, action.payload],
        };
      case UPDATE_ORDER_STATUS:
        return {
          ...state,
          orders: state.orders.map((order) =>
            order.id === action.payload.id ? action.payload : order
          ),
        };
      default:
        return state;
    }
  };
  
  export default orderReducer;