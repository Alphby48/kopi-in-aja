/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import app from "./firebase";

const firestore = getFirestore(app);

export async function loginWithGoogle(appData: any, call: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", appData.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((d: any) => ({
    id: d.id,
    ...d.data(),
  }));

  const realData = data.find((d) => d.id === data[0].id);

  if (data.length > 0 && data[0].role === "admin") {
    appData.role = "admin";
    await updateDoc(doc(firestore, "users", data[0].id), {
      email: appData.email,
      fullname: appData.fullname,
      image: appData.image,
      type: appData.type,
    })
      .then((res) =>
        call({
          status: true,
          statusCode: 200,
          message: "success update data",
          data: appData,
        })
      )
      .catch((err) =>
        call({ status: false, statusCode: 400, message: "failed update data" })
      );
  } else if (data.length > 0 && data) {
    await updateDoc(doc(firestore, "users", data[0].id), appData)
      .then((res) =>
        call({
          status: true,
          statusCode: 200,
          message: "success update data",
          data: appData,
        })
      )
      .catch((err) =>
        call({ status: false, statusCode: 400, message: "failed update data" })
      );
  } else {
    const addData = {
      email: appData.email,
      fullname: appData.fullname,
      image: appData.image,
      type: appData.type,
      role: appData.role,
    };

    await addDoc(collection(firestore, "users"), addData)
      .then((result) =>
        call({
          status: true,
          statusCode: 200,
          message: "success add data",
          data: appData,
        })
      )
      .catch((err) =>
        call({ status: false, statusCode: 400, message: "failed add data" })
      );
  }
}
