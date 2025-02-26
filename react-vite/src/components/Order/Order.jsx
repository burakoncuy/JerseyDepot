import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, updateOrderStatus } from '../../redux/orders';
import './Order.css'; // Importing the CSS file for styles
import { useNavigate } from 'react-router';


const OrderList = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const currentUser = useSelector((state) => state.session?.user || null);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (!currentUser) {
    return <p className="order-list__loading-message">Loading user data...</p>;
  }

  const handleStatusChange = async (orderId, newStatus) => {
    await dispatch(updateOrderStatus(orderId, newStatus));
    dispatch(fetchOrders());
  };

  const handleCancelOrder = async (orderId) => {
    await dispatch(updateOrderStatus(orderId, 'CANCELED'));
    dispatch(fetchOrders());
  };

  const buyingOrders = orders.filter(order => order.user_id === currentUser.id);
  const sellingOrders = orders.filter(order => 
    order.order_items && order.order_items.some(orderItem => 
      orderItem?.item?.user_id === currentUser.id
    )
  );

  return (
    <div className="order-list__container">
      <div className="order-list__row">
        {/* Buyer Orders */}
        <div className="order-list__column">
          <h2 className="order-list__heading">Your Orders</h2>
          {buyingOrders.length === 0 ? (
            <p className="order-list__empty-message">You have not placed any orders yet.</p>
          ) : (
            <ul className="order-list__orders">
              {buyingOrders.map(order => (
                <li key={order.id} className="order-list__order-card">
                  <p className="order-list__order-id">Order ID: {order.id}</p>
                  <p className="order-list__order-total">Total: ${order.total}</p>
                  <p className="order-list__order-status">Status: {order.order_status}</p>
                  
                  {order.order_status === 'PENDING' && (
                    <button 
                      onClick={() => handleCancelOrder(order.id)} 
                      className="order-list__cancel-button"
                    >
                      Cancel Order
                    </button>
                  )}
                  <button 
  onClick={() => navigate(`/orders/${order.id}`)} 
  className="order-list__details-button"
>
  View Details
</button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Seller Orders */}
        <div className="order-list__column">
          <h2 className="order-list__heading">Items You&apos;ve Sold</h2>
          {sellingOrders.length === 0 ? (
            <p className="order-list__empty-message">No items sold yet.</p>
          ) : (
            <ul className="order-list__orders">
              {sellingOrders.map(order => (
                <li key={order.id} className="order-list__order-card">
                  <p className="order-list__order-id">Order ID: {order.id}</p>
                  <p className="order-list__order-total">Total: ${order.total}</p>
                  <p className="order-list__order-status">Status: {order.order_status}</p>

                  <ul className="order-list__sold-items">
                    {order.order_items
                      .filter(orderItem => orderItem?.item?.user_id === currentUser.id)
                      .map(orderItem => (
                        <li key={orderItem.id} className="order-list__sold-item">
                          <p>Sold Item: {orderItem.item.name}</p>
                          <p>Quantity: {orderItem.quantity}</p>
                          <p>Price: ${orderItem.price}</p>
                          <img src={orderItem.item.image_url} alt={orderItem.item.name} className="order-list__sold-item-image" />
                        </li>
                    ))}
                  </ul>

                  <select
                    value={order.order_status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="order-list__status-select"
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
      </div>
    </div>
  );
};

export default OrderList;
