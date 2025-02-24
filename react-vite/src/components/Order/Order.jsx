import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../../redux/orders';

const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const currentUser = useSelector((state) => state.session?.user || null);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (!currentUser) {
    return <p>Loading user data...</p>;
  }

  const handleStatusChange = async (orderId, newStatus) => {
    // Update the order status
    await dispatch(updateOrderStatus(orderId, newStatus));

    // Refetch the orders to reflect the updated status
    dispatch(fetchOrders());
  };

  const handleCancelOrder = async (orderId) => {
    // Handle the order cancellation
    await dispatch(updateOrderStatus(orderId, 'CANCELED'));

    // Refetch the orders after cancellation
    dispatch(fetchOrders());
  };

  // Separate orders into "Buying" (as Buyer) and "Selling" (as Seller)
  const buyingOrders = orders.filter(order => order.user_id === currentUser.id);
  
  const sellingOrders = orders.filter(order => 
    order.order_items && order.order_items.some(orderItem => 
      orderItem?.item?.user_id === currentUser.id // Ensure item and user_id exist
    )
  );

  return (
    <div>
      {/* Buyer Orders */}
      <h2>Your Orders</h2>
      {buyingOrders.length === 0 ? (
        <p>You have not placed any orders yet.</p>
      ) : (
        <ul>
          {buyingOrders.map(order => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total: ${order.total}</p>
              <p>Status: {order.order_status}</p>
              
              {/* Show Cancel Button if Order is Pending */}
              {order.order_status === 'PENDING' && (
                <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
              )}
              {/* Buyer CANNOT change status */}
            </li>
          ))}
        </ul>
      )}

      {/* Seller Orders */}
      <h2>Items You've Sold</h2>
      {sellingOrders.length === 0 ? (
        <p>No items sold yet.</p>
      ) : (
        <ul>
          {sellingOrders.map(order => (
            <li key={order.id}>
              <p>Order ID: {order.id}</p>
              <p>Total: ${order.total}</p>
              <p>Status: {order.order_status}</p>
              
              {/* Show Items Sold */}
              <ul>
                {order.order_items
                  .filter(orderItem => orderItem?.item?.user_id === currentUser.id) // Filter for seller's items
                  .map(orderItem => (
                    <li key={orderItem.id}>
                      <p>Sold Item: {orderItem.item.name}</p>
                      <p>Quantity: {orderItem.quantity}</p>
                      <p>Price: ${orderItem.price}</p>
                      <img src={orderItem.item.image_url} alt={orderItem.item.name} width="100" />
                    </li>
                ))}
              </ul>

              {/* Seller CAN change status */}
              <select
                value={order.order_status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                <option value="PENDING">Pending</option>
                <option value="SHIPPED">Shipped</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELED">Canceled</option>
              </select>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
