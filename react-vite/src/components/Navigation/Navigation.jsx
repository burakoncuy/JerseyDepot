import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../redux/favorite";
import { fetchCart } from "../../redux/cart";

function Navigation() {
  const dispatch = useDispatch();
  
  // Extract only the specific primitive values you need, not whole objects/arrays
  const favoriteIds = useSelector(state => state.favorites.favorites?.length || 0);
  const cartItemCount = useSelector(state => state.cart.cartItems?.length || 0);
  const userId = useSelector(state => state.session.user?.id);
  const isLoggedIn = Boolean(userId);

  useEffect(() => { 
    if (isLoggedIn) {
      dispatch(getFavorites());
      dispatch(fetchCart());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <nav className="nav-container">
      <div className="nav-content">
        <NavLink to="/items" className="nav-logo">NowJersey</NavLink>
        <div className="nav-links">
          {isLoggedIn && <NavLink to='/orders' className="nav-item">My Orders</NavLink>}
          {isLoggedIn && <NavLink to='/items/current' className="nav-item">My Items</NavLink>}
          {isLoggedIn && <NavLink to='/reviews/current' className="nav-item">My Reviews</NavLink>}
          {isLoggedIn && (
            <NavLink to='/items/favorites' className={`nav-item ${favoriteIds > 0 ? 'nav-highlight' : ''}`}>
              ❤️  <span className="nav-badge-heart">{favoriteIds}</span>
            </NavLink>
          )}
          {isLoggedIn && (
            <NavLink to='/cart' className={`nav-item ${cartItemCount > 0 ? 'nav-highlight' : ''}`}>
              <span className="cart-icon">🛒</span>  <span className="nav-badge-cart">{cartItemCount}</span>
            </NavLink>
          )}
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;