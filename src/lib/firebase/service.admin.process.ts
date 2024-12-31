/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
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

export const updateProcess = async (data: any, call: any) => {
  const q = doc(firestore, "orderInCashier", data.id);
  const snapshot = await getDoc(q);

  if (snapshot.exists()) {
    const dataDB = {
      id: snapshot.id,
      ...snapshot.data(),
    };

    if (dataDB) {
      await updateDoc(doc(firestore, "orderInCashier", dataDB.id), {
        orderStatus: data.orderStatus,
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
        message: "failed update data, data not found",
      });
    }
  } else {
    call({
      status: false,
      statusCode: 400,
      message: "failed update data, data not found",
    });
  }
};
