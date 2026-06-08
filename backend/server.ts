import express, { Request, Response } from "express";
import { Port } from "./src/config/index";
import userRoute from "./src/routes/auth";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running 🚀");
});

app.use("/user", userRoute);

app.listen(5000, () => {
  console.log(`app is listening on port `);
  console.log(Port);
});
