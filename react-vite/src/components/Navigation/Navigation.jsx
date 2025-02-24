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
    <nav className="nav-bar">
      <div className="main-div">
        <NavLink to="/items">NowJersey</NavLink>
        <div className="second-sub-main">
          {user.id && <NavLink to='/orders'>My Orders</NavLink>}
          {user.id && <NavLink to='/items/current'>My Items</NavLink>}
          {user.id && <NavLink to='/reviews/current'>My Reviews</NavLink>}
          {user.id && (
            <NavLink to='/items/favorites' className={favorites.length > 0 ? 'highlight' : ''}>
              My Favorites <span className="count-badge">{favorites.length}</span>
            </NavLink>
          )}
          {user.id && (
            <NavLink to='/cart' className={cartItems.length > 0 ? 'highlight' : ''}>
              Cart <span className="count-badge">{cartItems.length}</span>
            </NavLink>
          )}
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
