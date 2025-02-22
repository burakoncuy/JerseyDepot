import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../../redux/orders';

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const currentUser = useSelector((state) => state.session?.user || null); // Get the user from session

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // If user is not authenticated, show loading message
  if (currentUser === null) {
    return <p>Loading user data...</p>;
  }

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus(orderId, newStatus));
  };

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total: ${order.total}</p>
              <p>Status: {order.order_status}</p>

              {/* Ensure currentUser is defined before checking permissions */}
              {currentUser && (order.order_items?.some(item => item.item?.user_id === currentUser.id) || order.user_id === currentUser.id) ? (
                <select
                  value={order.order_status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                >
                  <option value="PENDING">Pending</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELED">Canceled</option>
                </select>
              ) : (
                <p>You cannot change the status of this order.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
