import { Router, Request, Response } from "express";
import upload from "../middlewares/upload_image"; // Path to your memory storage file

const router = Router();

// 'image' must match the key name sent from your frontend FormData
router.post(
  "/upload-image",
  upload.single("image"),
  (req: Request, res: Response): any => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded." });
      }

      // With memoryStorage, req.file gives you these useful properties:
      const fileBuffer = req.file.buffer; // The actual file data in binary
      const originalName = req.file.originalname; // Original name of the asset
      const mimeType = req.file.mimetype; // e.g., 'image/jpeg' or 'image/png'
      const fileSize = req.file.size; // Size in bytes

      // TODO: Send 'fileBuffer' to S3, Cloudinary, or database here

      return res.status(200).json({
        success: true,
        message: "Image loaded into server memory successfully!",
        meta: {
          name: originalName,
          type: mimeType,
          sizeBytes: fileSize,
        },
      });
    } catch (error: any) {
      return res.status(500).json({ success: false, error: error.message });
    }
  },
);

export default router;
