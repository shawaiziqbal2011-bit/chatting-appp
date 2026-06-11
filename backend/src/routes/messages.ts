import express, { Request, Response } from "express";
import { sendMessage, getMessages } from "../controllers/message";
import authChecker from "../middlewares/authChecker";

const router = express.Router();

router.post("/sendMessage/:id", authChecker, sendMessage);
router.get("/messages/:id", authChecker, getMessages);

export default router;
