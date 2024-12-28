/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./firebase";

const firestore = getFirestore(app);

export const getAllProcess = async (call: any) => {
  const q = query(collection(firestore, "orderInCashier"));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((d: any) => ({
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
      status: false,
      statusCode: 400,
      message: "failed get data",
      data: null,
    });
  }
};
