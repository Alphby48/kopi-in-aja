/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getProcess } from "@/lib/firebase/service.process";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.fullname && req.method === "GET") {
    const dataQuery = req.query.fullname;
    await getProcess(dataQuery, (call: any) => {
      if (call.status) {
        res.status(200).json(call);
      } else {
        res.status(400).json(call);
      }
    });
  }
}
