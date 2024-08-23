import {
  ADD_CART_ERROR,
  ADD_CART_START,
  ADD_CART_SUCCESS,
  DELETE_CART_ERROR,
  DELETE_CART_START,
  DELETE_CART_SUCCESS,
  GET_CART_ERROR,
  GET_CART_START,
  GET_CART_SUCCESS,
  SET_CURRENT_CART_START,
  SET_CURRENT_CART_SUCCESS,
  UPDATE_CART_ERROR,
  UPDATE_CART_START,
  UPDATE_CART_SUCCESS,
} from "../constants/cart.constants";

// get cart
export const getCartStart = () => ({
  type: GET_CART_START,
});

export const getCartSuccess = (cart) => ({
  type: GET_CART_SUCCESS,
  payload: cart,
});

export const getCartError = (error) => ({
  type: GET_CART_ERROR,
  payload: error,
});

// add cart
export const addCartStart = (cart) => ({
  type: ADD_CART_START,
  payload: cart,
});

export const addCartSuccess = (cart) => ({
  type: ADD_CART_SUCCESS,
  payload: cart,
});

export const addCartError = (error) => ({
  type: ADD_CART_ERROR,
  payload: error,
});

// update cart
export const updateCartStart = (cart, id) => ({
  type: UPDATE_CART_START,
  payload: {
    cart,
    id,
  },
});

export const updateCartSuccess = (cart, id) => ({
  type: UPDATE_CART_SUCCESS,
  payload: {
    cart,
    id,
  },
});

export const updateCartError = (error) => ({
  type: UPDATE_CART_ERROR,
  payload: error,
});

// delete cart
export const deleteCartStart = (id) => ({
  type: DELETE_CART_START,
  payload: id,
});

export const deleteCartSuccess = (id) => ({
  type: DELETE_CART_SUCCESS,
  payload: id,
});

export const deleteCartError = (error) => ({
  type: DELETE_CART_ERROR,
  payload: error,
});

// set cart
export const setCurrentCartStart = (userId) => ({
  type: SET_CURRENT_CART_START,
  payload: userId,
});

export const setCurrentCartSuccess = (cart) => ({
  type: SET_CURRENT_CART_SUCCESS,
  payload: cart,
});
