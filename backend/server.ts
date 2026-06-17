import express, { Request, Response } from "express";
import path from "path";
import { Port, DatabaseUrl } from "./src/config/index";
import userRoute from "./src/routes/auth";
import sendMessages from "./src/routes/messages";
import uploadImage from "./src/routes/upload";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { app, server } from "./src/socket";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  }),
);

// API routes
app.use("/user", userRoute);
app.use("/user", sendMessages);
app.use("/upload", uploadImage);

// Frontend
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Root test
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});

// Server
server.listen(Port, async () => {
  try {
    await mongoose.connect(DatabaseUrl!);
    console.log("Server running on port", Port);
  } catch (error) {
    console.log("DB error", error);
  }
});
