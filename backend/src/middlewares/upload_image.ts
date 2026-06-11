// module imports
import { Request, Response } from "express";
import multer from "multer";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
  destination(req: Request, file, cb) {
    const directory = "public/images/";
    cb(null, directory);
  },
  filename(req: Request, file, cb) {
    cb(null, randomUUID() + file.originalname);
  },
});

export default multer({
  storage,
});
