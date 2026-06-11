import jwt from "jsonwebtoken";
import { Response } from "express";
import { Jwt_Key } from "../config";

const generateTokenAndSetCookie = (
  userID: string,
  email: string,
  res: Response,
) => {
  const token = jwt.sign({ userID, email }, Jwt_Key!, { expiresIn: "7D" });
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
  });
};

export default generateTokenAndSetCookie;
