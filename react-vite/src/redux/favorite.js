// Action Types
const GET_FAVORITES = "GET_FAVORITES";
const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

// Action Creators
export const getFavorites = () => async (dispatch) => {
  try {
    const response = await fetch("/api/items/favorites");
    if (!response.ok) throw new Error("Failed to fetch favorites");
    const data = await response.json();
    dispatch({ type: GET_FAVORITES, payload: { favorites: data, error: null } });
  } catch (error) {
    dispatch({ type: GET_FAVORITES, payload: { favorites: [], error: error.message } });
  }
};

export const addToFavorites = (item) => ({ type: ADD_TO_FAVORITES, payload: item });
export const removeFromFavorites = (itemId) => ({ type: REMOVE_FROM_FAVORITES, payload: itemId });

export const addFavoriteItem = (itemId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/items/${itemId}/add-to-favorite`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) throw new Error("Failed to add to favorites");
    const data = await response.json();
    dispatch(addToFavorites(data));
  } catch (error) {
    console.error(error.message);
  }
};

export const removeFavoriteItem = (itemId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/items/${itemId}/remove-from-favorite`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to remove from favorites");
    dispatch(removeFromFavorites(itemId));
  } catch (error) {
    console.error(error.message);
  }
};

// Initial State
const initialState = {
  favorites: [],
  error: null,
};

// Reducer
const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITES:
      return { ...state, favorites: action.payload.favorites, error: action.payload.error };
    case ADD_TO_FAVORITES:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FROM_FAVORITES:
      return { ...state, favorites: state.favorites.filter(item => item.id !== action.payload) };
    default:
      return state;
  }
};

export default favoriteReducer;
