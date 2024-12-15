import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;

  // Path lengkap ke file
  const filePath = path.join(process.cwd(), "uploads", filename as string);

  // Cek apakah file ada
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found" });
  }

  // Baca file dan kirim sebagai respons
  const file = fs.readFileSync(filePath);
  const mimeType = "image/jpeg"; // Ubah sesuai jenis file
  res.setHeader("Content-Type", mimeType);
  res.send(file);
}
