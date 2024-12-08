/* eslint-disable @typescript-eslint/no-explicit-any */

import { createRouter } from "next-connect";
import multer from "multer";
import type { NextApiRequest, NextApiResponse } from "next";
import { addProductToDB } from "@/lib/firebase/service.add-product";

function setFile(file: any) {
  const date = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Format yang dihasilkan: MM/DD/YYYY, HH:MM:SS
  const [month, day, year] = date.split(", ")[0].split("/");
  const [hours, minutes, seconds] = date.split(", ")[1].split(":");

  // Membuat nama file baru dengan format WIB
  const timestamp = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
  const newFilename = `${timestamp}-${file.originalname}`;

  return newFilename;
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/produkImg");
  },
  filename: function (req, file, cb) {
    cb(null, setFile(file));
  },
});

const upload = multer({ storage: storage });

interface ExtendedRequest extends NextApiRequest {
  file?: Express.Multer.File;
}
function uploadMiddleware(
  req: ExtendedRequest,
  res: NextApiResponse,
  next: (err?: any) => void
) {
  upload.single("image")(req as any, res as any, next);
}
const router = createRouter<ExtendedRequest, NextApiResponse>();

router.use(uploadMiddleware);

router.post(async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    console.log(req.file && req.body);
  }

  const data = {
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock,
    image: req.file?.filename,
  };

  await addProductToDB(data, (call: any) => {
    if (call.status) {
      return res
        .status(200)
        .json({ status: true, statusCode: 200, message: "success add data" });
    } else {
      return res
        .status(400)
        .json({ status: false, statusCode: 400, message: "failed add data" });
    }
  });
});

export default router.handler();

// Konfigurasi untuk menonaktifkan bodyParser Next.js
export const config = {
  api: {
    bodyParser: false, // Nonaktifkan body parser untuk Multer
  },
};
