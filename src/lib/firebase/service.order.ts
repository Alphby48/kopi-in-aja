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

interface orderType {
  id: string;
  email: string;
  order: any[];
}

export const addOrderToDB = async (data: any, call: any) => {
  const q = query(
    collection(firestore, "orders"),
    where("email", "==", data.email)
  );
  const snapshot = await getDocs(q);
  const dataOrder = snapshot.docs.map((d: any) => ({
    id: d.id,
    ...d.data(),
  })) as orderType[];

  if (dataOrder.length > 0) {
    const exitingOrder = dataOrder[0].order.find(
      (d: any) => d.idOrder === data.idOrder
    );
    if (exitingOrder) {
      exitingOrder.qty += parseFloat(data.qty);
    } else {
      const addData = {
        idOrder: data.idOrder,
        qty: data.qty,
      };
      dataOrder[0].order.push(addData);
    }
    const update = await updateDoc(doc(firestore, "orders", dataOrder[0].id), {
      order: dataOrder[0].order,
    })
      .then((res) =>
        call({
          status: true,
          statusCode: 200,
          message: "success add data to cart",
        })
      )
      .catch((err) =>
        call({
          status: false,
          statusCode: 400,
          message: "failed add data to cart",
        })
      );
  } else {
    const addData = {
      email: data.email,
      order: [
        {
          idOrder: data.idOrder,
          qty: data.qty,
        },
      ],
    };

    await addDoc(collection(firestore, "orders"), addData)
      .then((res) =>
        call({
          status: true,
          statusCode: 200,
          message: "success add data to cart",
        })
      )
      .catch((err) =>
        call({
          status: false,
          statusCode: 400,
          message: "failed add data to cart",
        })
      );
  }
};

export const getOrders = async (data: any, call: any) => {
  const q = query(collection(firestore, "orders"), where("email", "==", data));
  const querySnapshot = await getDocs(q);
  const dataOrder = querySnapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  if (dataOrder.length > 0) {
    call({
      status: true,
      statusCode: 200,
      message: "success get data",
      data: dataOrder,
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

export const deleteOrder = async (data: any, call: any) => {
  const q = query(
    collection(firestore, "orders"),
    where("email", "==", data.email)
  );
  const querySnapshot = await getDocs(q);
  const dataOrder = querySnapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  })) as orderType[];

  if (dataOrder.length > 0) {
    const exitingOrder = dataOrder[0].order.filter(
      (d: any) => d.idOrder !== data.idOrder
    );

    if (exitingOrder) {
      const update = await updateDoc(
        doc(firestore, "orders", dataOrder[0].id),
        {
          order: exitingOrder,
        }
      )
        .then((res) =>
          call({
            status: true,
            statusCode: 200,
            message: "success delete data",
          })
        )
        .catch((err) =>
          call({
            status: false,
            statusCode: 400,
            message: "failed delete data",
          })
        );
    } else {
      call({
        status: false,
        statusCode: 400,
        message: "failed delete data",
        data: null,
      });
    }
  }
};
