/* eslint-disable @typescript-eslint/no-explicit-any */
import { addOrderToCashier } from "./../../../lib/firebase/service.orderInCashier";
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await addOrderToCashier(req.body, (call: any) => {
      if (call.status) {
        res.status(200).json(call);
      } else {
        res.status(400).json(call);
      }
    });
  }
}
