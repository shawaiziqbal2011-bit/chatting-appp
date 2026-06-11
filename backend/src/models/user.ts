import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  fullName?: string;
  userName?: string;
  password?: string;
  gender?: "male" | "female";
  profilePic?: string;
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
    },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    gender: { type: String, enum: ["male", "female"], require: true },
    profilePic: { type: String, require: true, default: "" },
  },
  { timestamps: true },
);

export default model<IUser>("User", UserSchema);
