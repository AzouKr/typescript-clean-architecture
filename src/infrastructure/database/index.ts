import mongoose from "mongoose";
import logger from "../logger/winston";
import * as dotenv from "dotenv";
dotenv.config();

export async function connect() {
  try {
    await mongoose.connect(<string>process.env.dbUri);
    logger.info("DB connected");
  } catch (error) {
    logger.warn("Could not connect to db");
    process.exit(1);
  }
}
