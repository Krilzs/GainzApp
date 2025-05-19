import mongoose from "mongoose";
import { config } from "dotenv";
config();
const database = process.env.DB;
const connectDB = async () => {
  try {
    mongoose.connect(database);
    const db = mongoose.connection;
    db.on("open", () => {
      console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};
export default connectDB;
