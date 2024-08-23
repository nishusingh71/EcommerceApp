import { GET_CART_SUCCESS } from "../constants/cart.constants";

// Default cart structure
export const defaultValue = {
  subTotal: 0,
  tax: 0,
  grandTotal: 0,
  customer: {},
  items: [],
};

// Function to retrieve cart from localStorage based on user ID
const getCartFromLocalStorage = (userId) => {
  if (userId) {
    const storedCart = localStorage.getItem(`cart_${userId}`);
    return storedCart ? JSON.parse(storedCart) : defaultValue;
  }
  return defaultValue;
};

// Function to save cart to localStorage based on user ID
const saveCartToLocalStorage = (userId, cart) => {
  if (userId && cart) {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cart));
  }
};

// Initial state with dynamic loading of cart for current user
const initialState = {
  currentUser: null, // Assume you set the current user somewhere in your app
  currentCart:
    getCartFromLocalStorage(localStorage.getItem("currentUserId")) ||
    defaultValue,
};

// Cart reducer with logic for different users
export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_SUCCESS:
      const userId = action.payload.customer.id; // Ensure your action payload contains the user/customer ID
      saveCartToLocalStorage(userId, action.payload);

      return {
        ...state,
        currentCart: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
