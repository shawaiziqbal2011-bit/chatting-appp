import express from "express";
import { getUsers } from "../controllers/users";
import authChecker from "../middlewares/authChecker";

const router = express.Router();

router.get("/getUsers", authChecker, getUsers);

export default router;
