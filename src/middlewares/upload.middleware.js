import multer from "multer";
import path from "path";

// Carpeta de destino
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "-" + file.originalname.replace(/\s/g, "_");
    cb(null, filename);
  },
});

export const upload = multer({ storage });
