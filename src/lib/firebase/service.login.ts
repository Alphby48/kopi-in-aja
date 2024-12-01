/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import app from "./firebase";

const firestore = getFirestore(app);

export async function login(userData: { email: string }) {
  const q = query(
    collection(firestore, "users"),
    where("email", "==", userData.email)
  );
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  if (data.length > 0) {
    return data[0];
  } else {
    return null;
  }
}
