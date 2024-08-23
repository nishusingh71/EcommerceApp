import {
  addCartError,
  deleteCartError,
  getCartError,
  getCartStart,
  getCartSuccess,
  setCurrentCartSuccess,
  updateCartError,
} from "../actions/cart.actions";
import {
  ADD_CART_START,
  DELETE_CART_START,
  GET_CART_START,
  SET_CURRENT_CART_START,
  UPDATE_CART_START,
} from "../constants/cart.constants";
import {
  addCartToAPI,
  deleteCartToAPI,
  fetchCartFromLocalStorage,
  getCartFromAPI,
  updateCartToAPI,
} from "../services/cart.services";
import { call, put, takeLatest } from "redux-saga/effects";

function* getCart() {
  try {
    let result = yield getCartFromAPI();
    yield put(getCartSuccess(result));
  } catch (error) {
    yield put(getCartError(error.message));
  }
}

function* addCart({ payload }) {
  try {
    yield addCartToAPI(payload);
    yield put(getCartStart());
  } catch (error) {
    yield put(addCartError(error.message));
  }
}

function* updateCart({ payload }) {
  try {
    yield updateCartToAPI(payload.category, payload.id);
    yield put(getCartStart());
  } catch (error) {
    yield put(updateCartError(error.message));
  }
}

function* deleteCart({ payload }) {
  try {
    yield deleteCartToAPI(payload);
    yield put(getCartStart());
  } catch (error) {
    yield put(deleteCartError(error.message));
  }
}

// Saga to handle fetching and setting the current cart
function* fetchAndSetCurrentCartSaga(action) {
  const userId = action.payload; // Get userId from action payload

  try {
    // Fetch cart data from localStorage or API
    const cart = yield call(fetchCartFromLocalStorage, userId);

    // Dispatch success action with fetched cart
    yield put(setCurrentCartSuccess(cart));
  } catch (error) {
    // Dispatch error action if there was a problem
    yield put(getCartError(error.message));
  }
}

export default function* cart() {
  yield takeLatest(GET_CART_START, getCart);
  yield takeLatest(ADD_CART_START, addCart);
  yield takeLatest(UPDATE_CART_START, updateCart);
  yield takeLatest(DELETE_CART_START, deleteCart);
  yield takeLatest(SET_CURRENT_CART_START, fetchAndSetCurrentCartSaga);
}
