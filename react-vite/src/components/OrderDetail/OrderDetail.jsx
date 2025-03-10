import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderDetails } from '../../redux/orders';
import { useParams, useNavigate } from 'react-router-dom';
import './OrderDetail.css';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderDetails = useSelector((state) => state.orders.orderDetails);
  const [users, setUsers] = useState({});

  useEffect(() => {
    dispatch(fetchOrderDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/');
        if (response.ok) {
          const data = await response.json();
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
    fetchUsers();
  }, []);

  if (!orderDetails) return <p className="adidas-order-details__loading">Loading order details...</p>;

  return (
    <div className="adidas-order-details__container">
      <h2 className="adidas-order-details__id">Order ID: {orderDetails.id}</h2>
      <p className="adidas-order-details__total">Total: ${orderDetails.total}</p>
      <p className="adidas-order-details__status">Status: {orderDetails.order_status}</p>

      <h3 className="adidas-order-details__items-title">Items in Order:</h3>
      <ul className="adidas-order-details__items-list">
        {orderDetails.order_items?.map((orderItem) => (
          <li key={orderItem.id} className="adidas-order-details__item">
            <p className="adidas-order-details__item-name">Name: {orderItem?.item?.name || "Unknown Item"}</p>
            <p className="adidas-order-details__item-quantity">Quantity: {orderItem?.quantity || 0}</p>
            <p className="adidas-order-details__item-price">Price: ${orderItem?.price || 0}</p>
            <p className="adidas-order-details__item-seller">Seller: {users[orderItem?.item?.user_id] || `Seller ${orderItem?.item?.user_id || 'Unknown'}`}</p>
            {orderItem?.item?.image_url && (
              <img 
                src={orderItem.item.image_url} 
                alt={orderItem.item.name} 
                className="adidas-order-details__item-image"
              />
            )}
          </li>
        ))}
      </ul>

      <button onClick={() => navigate(-1)} className="adidas-order-details__back-button">
        Back to Orders
      </button>
    </div>
  );
};

export default OrderDetails;
