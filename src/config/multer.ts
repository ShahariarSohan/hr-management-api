import multer from "multer";
import path from "path";
import fs from "fs";

// Upload directory
const uploadDir = path.join(process.cwd(), "src", "uploads");

// Ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    // Save file with unique timestamp + original name
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// File filter example (images only)
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

// Max file size 5MB
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});
