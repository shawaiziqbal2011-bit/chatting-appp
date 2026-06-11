import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { Jwt_Key } from "../config";
import userModel from "../models/user";

const authChecker: RequestHandler = async (req, res, next) => {
  try {
    const token =
      req.cookies.jwt || req?.headers?.authorization?.split(" ")[1] || "";

    if (!token) return res.json({ message: "unauthorized", success: false });

    const decodedToken = jwt.verify(token, Jwt_Key!) as {
      userID: string;
      email: string;
    };

    if (!decodedToken) {
      return res.json({ message: "unauthorized", success: false });
    }
    //@ts-ignore
    const isUserExist = await userModel.findById(decodedToken?.userID);
    if (!isUserExist)
      return res.json({ message: "unauthorized", success: false });
    else {
      //@ts-ignore
      req.user = isUserExist;
      next();
    }
  } catch (error: any) {
    res.json({
      message: error.message || "internale server error",
      success: false,
    });
  }
};

export default authChecker;
