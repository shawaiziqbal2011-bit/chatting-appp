import express, { Request, Response } from "express";
import { Port, DatabaseUrl } from "./src/config/index";
import userRoute from "./src/routes/auth";
import sendMessages from "./src/routes/messages";
import uploadImage from "./src/routes/upload";
import cookieParser from "cookie-parser";

import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});

app.use("/user", userRoute);
app.use("/user", sendMessages);
app.use("/upload", uploadImage);

app.listen(Port, async () => {
  try {
    await mongoose.connect(DatabaseUrl!);
    console.log(`app is listening on port `);
    console.log(Port);
  } catch (error) {
    console.log("this is error while connecting database", error);
  }
});
