import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectToDatabase = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in the environment variables");
  }

  try {
    await connect(mongoUri);
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
