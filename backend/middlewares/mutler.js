import multer from "multer";

// store files in memory (buffered in RAM)
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// middleware to handle single file upload
export const singleUpload = upload.single("file");
