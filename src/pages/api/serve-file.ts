import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;

  const filePath = path.join(process.cwd(), "uploads", filename as string);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  const file = fs.readFileSync(filePath);
  const mimeType = "image/jpeg";
  res.setHeader("Content-Type", mimeType);
  res.send(file);
}
