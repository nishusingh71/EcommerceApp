import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
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
  return docRef.id;
};

export const updateProductToAPI = async (product, id) => {
  const productRef = doc(db, collectionName, id);
  await updateDoc(productRef, product);
};

export const deleteProductToAPI = async (id) => {
  await deleteDoc(doc(db, collectionName, id));
};
