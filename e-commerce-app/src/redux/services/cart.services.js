import { db } from "../../firebaseconfig";
import { defaultValue } from "../reducers/cart.reducers";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

let collectionName = "carts";

export const getCartFromAPI = async () => {
  let cart = defaultValue;
  let currentCardId = localStorage.getItem("current_cart_id");
  const querySnapshot = await getDocs(collection(db, collectionName));

  querySnapshot.forEach((doc) => {
    let crt = doc.data();
    if (currentCardId === doc.id) {
      crt.id = doc.id;

      cart = crt;
    }
  });

  return cart;
};

export const addCartToAPI = async (cart) => {
  let currentCartId = localStorage.getItem("current_cart_id");

  if (currentCartId) {
    const cartRef = doc(db, collectionName, currentCartId);
    await updateDoc(cartRef, cart);
  } else {
    const docRef = await addDoc(collection(db, collectionName), cart);
    localStorage.setItem("current_cart_id", docRef.id);
    console.log("Document written with ID: ", docRef.id);
  }
};

export const updateCartToAPI = async (cart, id) => {
  const cartRef = doc(db, collectionName, id);
  await updateDoc(cartRef, cart);
};

export const deleteCartToAPI = async (id) => {
  await deleteDoc(doc(db, collectionName, id));
};
