import express, { Request, Response } from "express";
import { login, logout, signup } from "../controllers/auth";
import { checkUserValidation, checkLoginValidation } from "../validations";
const router = express.Router();

router.post("/signup", checkUserValidation, signup);

router.post("/login", checkLoginValidation, login);

router.post("/logout", logout);

export default router;
