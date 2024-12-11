/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./firebase";

const firestore = getFirestore(app);

export const getProducts = async (call: any) => {
  const q = query(collection(firestore, "products"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  if (data.length > 0) {
    call({
      status: true,
      statusCode: 200,
      message: "success get data",
      data: data,
    });
  } else {
    call({
      status: true,
      statusCode: 400,
      message: "failed get data",
      data: null,
    });
  }
};

export const getProductById = async (id: string, call: any) => {
  const q = doc(firestore, "products", id);
  const querySnapshot = await getDoc(q);

  if (querySnapshot.exists()) {
    const data = {
      id: querySnapshot.id,
      ...querySnapshot.data(),
    };
    call({
      status: true,
      statusCode: 200,
      message: "success get data from database",
      data: data,
    });
  } else {
    call({
      status: false,
      statusCode: 400,
      message: "failed get data from database",
      data: null,
    });
  }
};
