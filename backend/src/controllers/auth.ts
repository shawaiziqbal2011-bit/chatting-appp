import { RequestHandler } from "express";
import { SignupBody } from "../types";
import userModel from "../models/user";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateJwtToken";

export const login: RequestHandler = async (req, res, next) => {
  const { email, password }: SignupBody = req.body;
  try {
    const isUserExist = await userModel.findOne({ email });
    const isPassCorrect = await bcrypt.compare(
      password || "",
      isUserExist?.password || "",
    );
    if (!isUserExist) {
      return res.json({ message: "User doesnot exist", success: false });
    } else if (!isPassCorrect) {
      return res.json({ message: "Invalid credentials", success: false });
    }
    generateTokenAndSetCookie(
      isUserExist?._id.toString()!,
      //@ts-ignore
      isUserExist?.email,
      res,
    );
    return res.json({ message: "user login successfully!!", success: true });
  } catch (error: any) {
    console.log("this is error actual", error);

    return res.json({
      message: error?.message || "something went wrong",
      success: false,
    });
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.json({ message: "logout successfully", success: true });
  } catch (error: any) {
    return res.json({
      message: error?.message || "something went wrong",
      success: false,
    });
  }
};

export const signup: RequestHandler = async (req, res, next) => {
  const {
    email,
    gender,
    name,
    password,
    confirmPassword,
    profilePic,
  }: SignupBody = req.body;
  try {
    if (password != confirmPassword) {
      return res.json({ message: "Password does not match", success: false });
    }
    const user = await userModel.findOne({ email });
    if (user)
      return res.json({
        message: "user already exist with this email",
        success: false,
      });
    else {
      const hashPass = await bcrypt.hash(password?.toString()!, 10);
      const newUser = new userModel({
        email,
        gender,
        name,
        password: hashPass,
        profilePic,
      });
      newUser.save();
      return res.json({ message: "user signup successfully", success: true });
    }
  } catch (error: any) {
    return res.json({
      message: error?.message || "something went wrong",
      success: false,
    });
  }
};
