import mongoose from "mongoose";
import env from "../utils/validateEnv.ts";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);
    console.log(`MongoDB connected`);
  } catch (error) {
    throw error;
  }
};
