/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, collection, getFirestore } from "firebase/firestore";
import app from "./firebase";

const firestore = getFirestore(app);

export const addProductToDB = async (data: any, call: any) => {
  await addDoc(collection(firestore, "products"), data)
    .then((res) =>
      call({ status: true, statusCode: 200, message: "success add data" })
    )
    .catch((err) =>
      call({ status: false, statusCode: 400, message: "failed add data" })
    );
};
