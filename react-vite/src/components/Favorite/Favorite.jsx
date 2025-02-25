import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorites, removeFavoriteItem } from "../../redux/favorite";
import './Favorite.css'; // Import the CSS file for styles

const Favorite = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);
  const error = useSelector((state) => state.favorites.error);

  // Fetch favorites when the component mounts
  useEffect(() => {
    dispatch(getFavorites());
  }, [dispatch]);

  // Handle removing an item from favorites
  const handleRemoveFromFavorites = (itemId) => {
    dispatch(removeFavoriteItem(itemId));
  };

  if (error) {
    return <div className="favorite__error-message">Error: {error}</div>;
  }

  return (
    <div className="favorite__container">
      <h1 className="favorite__heading">Your Favorites</h1>
      {favorites.length === 0 ? (
        <p className="favorite__empty-message">No favorites added yet.</p>
      ) : (
        <ul className="favorite__list">
          {favorites.map((item) => (
            <li key={item.id} className="favorite__item-card">
              <div className="favorite__item-image-container">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="favorite__item-image"
                />
              </div>
              <div className="favorite__item-details">
                <h2 className="favorite__item-name">{item.name}</h2>
                <p className="favorite__item-description">{item.description}</p>
                <p className="favorite__item-price">Price: ${item.price}</p>
                <button
                  onClick={() => handleRemoveFromFavorites(item.id)}
                  className="favorite__remove-button"
                >
                  Remove from Favorites
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorite;
