import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";

let collectionName = "products";

export const getProductFromAPI = async () => {
  let products = [];

  const querySnapshot = await getDocs(collection(db, collectionName));

  querySnapshot.forEach((doc) => {
    let product = doc.data();
    product.id = doc.id;

    products.push(product);
  });

  return products;
};

export const addProductToAPI = async (product) => {
  const docRef = await addDoc(collection(db, collectionName), product);
  console.log("Document written with ID: ", docRef.id);
};

export const updateProductToAPI = async (product, id) => {
  const categoryRef = doc(db, collectionName, id);
  await updateDoc(categoryRef, product);
};

export const deleteProductToAPI = async (id) => {
  await deleteDoc(doc(db, collectionName, id));
};
