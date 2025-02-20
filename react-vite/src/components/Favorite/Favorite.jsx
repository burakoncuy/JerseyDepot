import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getFavorites,removeFavoriteItem} from "../../redux/favorite";

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
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Your Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <ul>
          {favorites.map((item) => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => handleRemoveFromFavorites(item.id)}>
                Remove from Favorites
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorite;