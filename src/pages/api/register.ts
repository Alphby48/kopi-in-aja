/* eslint-disable @typescript-eslint/no-explicit-any */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { register } from "@/lib/firebase/service.register";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    await register(req.body, (result: Data) => {
      if (result.status) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    });
  }
}
