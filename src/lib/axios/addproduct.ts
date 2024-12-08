/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const AddProductsev = (data: any, call: any) => {
  return axios
    .post("http://localhost:3000/api/admin/add-product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => call(res.data))
    .catch((err) => call(err.response.data));
};
