// ACTION TYPES
 const GET_ITEMS = "GET_ITEMS";
 const GET_ITEM = "GET_ITEM";
 const CREATE_ITEM = "CREATE_ITEM";
 const UPDATE_ITEM = "UPDATE_ITEM";
 const DELETE_ITEM = "DELETE_ITEM";
 const GET_USER_ITEMS = "GET_CURRENT_USER_ITEMS";
 const GET_ITEM_ERROR = 'GET_ITEM_ERROR';


// THUNKS

// Get all items
export const getItems = () => async (dispatch) => {
  try {
    const res = await fetch('/api/items');
    const data = await res.json();
    dispatch({ type: GET_ITEMS, payload: data });
  } catch (err) {
    console.error("Error fetching items:", err);
  }
};


// Get a specific item
export const getItem = (id) => async (dispatch) => {
  try {
    const res = await fetch(`/api/items/${id}`);
    
    if (!res.ok) {
      if (res.status === 404) {
        // If the item is not found, dispatch an action with a payload indicating that the item was not found
        dispatch({ type: GET_ITEM, payload: { notFound: true } });
      } else {
        // Handle other errors (e.g., 500, 403, etc.)
        throw new Error('Failed to fetch item');
      }
    } else {
      const data = await res.json();
      dispatch({ type: GET_ITEM, payload: data });
    }
  } catch (err) {
    console.error("Error fetching item:", err);
    // Optionally dispatch an error action
    dispatch({ type: GET_ITEM_ERROR, payload: err.message });
  }
};


// Get current user's items
export const getUserItems = () => async (dispatch) => {
  try {
    const res = await fetch('/api/items/current');
    const data = await res.json();
    dispatch({ type: GET_USER_ITEMS, payload: data.items });
  } catch (err) {
    console.error("Error fetching user items:", err);
  }
};



// Create an item
export const createItem = (itemData) => async (dispatch) => {
    try {
      const res = await fetch('/api/items/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
      const data = await res.json();
      dispatch({ type: CREATE_ITEM, payload: data });
    } catch (err) {
      console.error("Error creating item:", err);
    }
  };
  

// Update an item
  export const updateItem = (id, itemData) => async (dispatch) => {
    try {
      const res = await fetch(`/api/items/${id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });
      const data = await res.json();
      dispatch({ type: UPDATE_ITEM, payload: data });
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };
  


// Delete an item
export const deleteItem = (id) => async (dispatch) => {
    try {
      const res = await fetch(`/api/items/${id}/delete`, { method: 'DELETE' });
      const data = await res.json();
      dispatch({ type: DELETE_ITEM, payload: id });
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };



 // REDUCER

 // reducers/itemsReducer.js

const initialState = {
  allItems: [],
  currentItem: null,
  userItems: [],
  error: null,
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return { ...state, allItems: action.payload };
    
      case GET_ITEM:
        if (action.payload.notFound) {
          return {
            ...state,
            notFound: true,
            item: null
          };
        } else {
          return {
            ...state,
            item: action.payload,
            notFound: false
          };
        }
      case GET_ITEM_ERROR:
        return {
          ...state,
          error: action.payload
        };
    
    case GET_USER_ITEMS:
      return { ...state, userItems: action.payload };
    
    case CREATE_ITEM:
      return { ...state, allItems: [...state.allItems, action.payload] };
    
    case UPDATE_ITEM:
      return {
        ...state,
        allItems: state.allItems.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    
    case DELETE_ITEM:
      return {
        ...state,
        allItems: state.allItems.filter((item) => item.id !== action.payload),
        userItems: state.userItems.filter((item) => item.id !== action.payload),
      };
    
    default:
      return state;
  }
};

export default itemsReducer;
