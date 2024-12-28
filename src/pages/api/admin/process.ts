/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllProcess } from "@/lib/firebase/service.admin.process";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    await getAllProcess((call: any) => {
      if (call.status) {
        res.status(200).json(call);
      } else {
        res.status(400).json(call);
      }
    });
  }
}
