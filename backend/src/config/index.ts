import dotenv from "dotenv";

dotenv.config();

export const Port = process.env.PORT;

export const DatabaseUrl = process.env.DB_URL;
export const Jwt_Key = process.env.JWT_KEY;
