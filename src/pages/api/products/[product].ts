/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getProductById } from "@/lib/firebase/service.products";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await getProductById(req.query.product as string, (call: any) => {
      console.log(req.query.product);
      if (call.status) {
        res.status(200).json(call);
      } else {
        res.status(400).json(call);
      }
    });
  } else {
    res
      .status(400)
      .json({ status: false, statusCode: 400, message: "failed get data" });
  }
}
