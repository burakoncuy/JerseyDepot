import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../redux/favorite";
import { fetchCart } from "../../redux/cart";

function Navigation() {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.favorites);
  const cartItems = useSelector(state => state.cart.cartItems);
  const user = useSelector(state => state.session.user || {});

  useEffect(() => { 
    if (user.id) {
      dispatch(getFavorites());
      dispatch(fetchCart());
    }
  }, [dispatch, user]);

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <NavLink to="/items" className="nav-logo">NowJersey</NavLink>
        <div className="nav-links">
          {user.id && <NavLink to='/orders' className="nav-item">My Orders</NavLink>}
          {user.id && <NavLink to='/items/current' className="nav-item">My Items</NavLink>}
          {user.id && <NavLink to='/reviews/current' className="nav-item">My Reviews</NavLink>}
          {user.id && (
            <NavLink to='/items/favorites' className={`nav-item ${favorites.length > 0 ? 'nav-highlight' : ''}`}>
              ❤️  <span className="nav-badge-heart">{favorites.length}</span>
            </NavLink>
          )}
          {user.id && (
            <NavLink to='/cart' className={`nav-item ${cartItems.length > 0 ? 'nav-highlight' : ''}`}>
              <span className="cart-icon">🛒</span>  <span className="nav-badge-cart">{cartItems.length}</span>
            </NavLink>
          )}
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
