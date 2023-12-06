import mongoose from 'mongoose'
require('dotenv').config({ path: '.env' })
import config from "config";
import logger from "../log/index.logger";

export async function connect() {
    try {
        await mongoose.connect(<string>"mongodb://localhost:27017/backend_test")
        logger.info("DB connected");
    } catch (error) {
        logger.warn("Could not connect to db");
        process.exit(1)
    }
}
