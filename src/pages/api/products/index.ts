/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProducts } from "@/lib/firebase/service.products";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await getProducts((call: any) => {
      if (call.status) {
        res.status(200).json(call);
      } else {
        res.status(400).json(call);
      }
    });
  }
}
