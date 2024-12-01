/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const AuthReg = (data: any, call: any) => {
  return axios
    .post("http://localhost:3000/api/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => call(res.data))
    .catch((err) => call(err.response.data));
};
