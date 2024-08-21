import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseconfig";

let collectionName = "categories";

export const getCategoryFromAPI = async () => {
  let categories = [];

  const querySnapshot = await getDocs(collection(db, collectionName));

  querySnapshot.forEach((doc) => {
    let category = doc.data();
    category.id = doc.id;

    categories.push(category);
  });

  return categories;
};

export const addCategoryToAPI = async (category) => {
  const docRef = await addDoc(collection(db, collectionName), category);
  return docRef.id;
};

export const updateCategoryToAPI = async (category, id) => {
  const categoryRef = doc(db, collectionName, id);
  await updateDoc(categoryRef, category);
};

export const deleteCategoryToAPI = async (id) => {
  await deleteDoc(doc(db, collectionName, id));
};
