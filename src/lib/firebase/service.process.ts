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

export const getProcess = async (data: any, call: any) => {
  const q = query(
    collection(firestore, "orderInCashier"),
    where("fullname", "==", data)
  );
  const snapshot = await getDocs(q);
  const dataDB = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  if (dataDB.length > 0) {
    call({
      status: true,
      statusCode: 200,
      message: "success get data",
      data: dataDB,
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
