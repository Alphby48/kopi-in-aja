/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  addOrderToDB,
  deleteOrder,
  getOrders,
} from "@/lib/firebase/service.order";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET" && req.query.email) {
    const data = req.query.email;
    await getOrders(data, (call: any) => {
      if (call.status) {
        return res.status(200).json(call);
      } else {
        return res.status(400).json(call);
      }
    });
  } else if (req.method === "POST" && req.query.email) {
    const data = {
      email: req.query.email,
      idOrder: req.body.idOrder,
    };
    await deleteOrder(data, (call: any) => {
      if (call.status) {
        return res.status(200).json(call);
      } else {
        return res.status(400).json(call);
      }
    });
  } else if (req.method === "POST") {
    await addOrderToDB(req.body, (call: any) => {
      if (call.status) {
        return res.status(200).json(call);
      } else {
        return res.status(400).json(call);
      }
    });
  } else {
    res.status(400).json({ status: false, statusCode: 400, message: "failed" });
  }
}
