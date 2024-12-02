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

export async function register(appdata: any, call: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", appdata.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  if (data.length > 0 && data) {
    call({
      status: false,
      statusCode: 400,
      message: "email already exist",
    });
  } else {
    const addData = {
      email: appdata.email,
      password: appdata.password,
      fullname: appdata.fullname,
      role: appdata.role,
    };

    await addDoc(collection(firestore, "users"), addData)
      .then((result) =>
        call({ status: true, statusCode: 200, message: "success add data" })
      )
      .catch((err) =>
        call({ status: false, statusCode: 500, message: "error add data" })
      );
  }
}

export async function registerAdmin(appdata: any, call: any) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", appdata.email)
  );
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  if (data.length > 0 && data) {
    if (appdata.token === (process.env.TOKEN_ADMIN as string)) {
      await updateDoc(doc(firestore, "users", data[0].id), {
        role: "admin",
      })
        .then((res) =>
          call({
            status: true,
            statusCode: 200,
            message: "success update data",
          })
        )
        .catch((err) =>
          call({
            status: false,
            statusCode: 400,
            message: "failed update data",
          })
        );
    } else {
      call({
        status: false,
        statusCode: 400,
        message: "invalid token",
      });
    }
  } else {
    call({ status: false, statusCode: 400, message: "failed update data" });
  }
}
