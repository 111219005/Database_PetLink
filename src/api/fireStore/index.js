import { collection, doc, setDoc, getDocs, getDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import cats from "../../json/cat.json";
import dogs from "../../json/dog.json";

const products = [...cats, ...dogs];
const productsCollection = collection(db, "pets");
console.log("Dogs:", dogs);
console.log("Cats:", cats);
console.log("Cats");

export const feedProducts = async () => {
  const querySnapshot = await getDocs(productsCollection);
  querySnapshot.forEach(async (product) => {
    await deleteDoc(doc(db, "pets", product.id));
  });
  products.forEach(async (product) => {
    const docRef = doc(productsCollection);
    await setDoc(docRef, { ...product, id: docRef.id });
  });
};

export const getProducts = async () => {
  const querySnapshot = await getDocs(productsCollection);
  let result = [];
  querySnapshot.forEach((product) => {
    result.push(product.data());
  });
  return result;
};

export const getProductById = async ({ queryKey }) => {
  const [, , id] = queryKey; // ['products', 'id', id]
  const docRef = doc(db, "pets", id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getProductsByCategory = async ({ queryKey }) => {
  const [, , category] = queryKey; // ['products', 'category', category]
  const q = query(
    productsCollection,
    where("category", "==", category.toUpperCase())
  );
  const querySnapshot = await getDocs(q);
  let result = [];
  querySnapshot.forEach((product) => {
    result.push(product.data());
  });
  return result;
};