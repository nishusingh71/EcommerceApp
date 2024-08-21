import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebaseconfig";

let collectionName = "orders";

export const getOrderFromAPI = async () => {
  let orders = [];

  const querySnapshot = await getDocs(collection(db, collectionName));

  querySnapshot.forEach((doc) => {
    let order = doc.data();

    order.id = doc.id;

    orders.push(order);
  });

  return orders;
};

export const placeOrderToAPI = async (order) => {
  const docRef = await addDoc(collection(db, collectionName), order);
  console.log("Document written with ID: ", docRef.id);
  localStorage.removeItem("current_cart_id");
};
