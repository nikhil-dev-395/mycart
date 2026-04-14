import mongoose from "mongoose";
import logger from "../utils/logger.utils.js";
import env from "../config/env.js";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(env.MONGO_URI);
    logger.info(`mongodb connected successfully ${con?.connection?.host}`);
  } catch (error) {
    logger.error("mongoose connection error" + error.message);
    process.exit(1);
  }
};

export default connectDB;
