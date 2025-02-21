import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from "../../redux/favorite";


function Navigation() {

const dispatch = useDispatch()
const fav = useSelector(state => Object.values(state.favorites))
// const products = useSelector(state => Object.values(state.shoppingCart))
const user = useSelector(state => state.session.user || {})
// console.log('productiso in navigation var haho', products)


useEffect(() => { 
  dispatch(getFavorites())
},[dispatch])





return (
  <nav className="nav-bar">
  <div className="main-div">
    <NavLink to="/items">NowJersey
    </NavLink>
       <div className="second-sub-main">
        {user.id && <NavLink to='/orders'>My Orders</NavLink>}
        {user.id && <NavLink to='/items/current'>My Items</NavLink>}
        {user.id && <NavLink to='/reviews/current'>My reviews</NavLink>}
        {user.id && <NavLink to='/items/favorites'>My favorites</NavLink>}
        <ProfileButton />
    </div>
  </div>
  </nav>
);
}

export default Navigation;
