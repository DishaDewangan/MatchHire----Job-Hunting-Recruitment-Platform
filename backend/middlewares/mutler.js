import multer from "multer";

// store files in memory (buffered in RAM)
const storage = multer.memoryStorage();

// middleware to handle single file upload
export const singleUpload = multer({ storage }).single("file");
