import multer from "multer";
import path from "path";
import fs from "fs";
import { envVariables } from "./env";


const uploadDir = path.join(process.cwd(), "src", envVariables.UPLOAD_PATH);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
 
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
 const allowedTypes = [
   "image/png",
   "image/jpeg",
   "image/jpg",
   "image/gif",
   "image/webp",
   "image/svg+xml",
 ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PNG, JPEG, JPG, GIF, WEBP, and SVG images are allowed"));
  }
};


export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
