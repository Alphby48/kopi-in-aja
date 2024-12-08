/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import multer, { StorageEngine, FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";
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

// Konfigurasi penyimpanan file
const storage: StorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Folder tempat file disimpan
  },
  filename: (req, file, cb) => {
    cb(null, setFile(file));
  },
});

// Filter untuk hanya menerima file gambar
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
