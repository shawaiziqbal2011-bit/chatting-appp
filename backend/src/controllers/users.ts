import { RequestHandler } from "express";
import user from "../models/user";

export const getUsers: RequestHandler = async (req, res) => {
  //@ts-ignore
  const userId = req?.user?._id || "";
  const allUsers = await user
    .find({ _id: { $ne: userId } })
    .select("-password");
  try {
    return res.json({
      message: "user fetched successfully",
      success: true,
      data: allUsers ? allUsers : [],
    });
  } catch (error: any) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
