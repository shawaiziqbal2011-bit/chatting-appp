import * as yup from "yup";
import { RequestHandler } from "express";

export const signupSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Minimum 3 characters"),

  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),

  gender: yup.string().oneOf(["male", "female"]).required("Gender is required"),
  profilePic: yup.string().required("Profile pic"),
});

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});

export const checkUserValidation: RequestHandler = async (req, res, next) => {
  try {
    await signupSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err: any) {
    return res.status(400).json({
      errors: err?.errors,
    });
  }
};

export const checkLoginValidation: RequestHandler = async (req, res, next) => {
  try {
    await loginSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (err: any) {
    return res.status(400).json({
      errors: err?.errors,
    });
  }
};
