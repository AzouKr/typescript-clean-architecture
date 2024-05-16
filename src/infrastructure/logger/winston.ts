import winston from "winston";

// Define colors of levels
const colorsLogger: winston.config.AbstractConfigSetColors = {
  error: "red",
  warn: "yellow",
  info: "cyan",
  debug: "green",
};
winston.addColors(colorsLogger);

// Define the logger configuration
const logger = winston.createLogger({
  // level: "info", // Set the minimum log level
  format: winston.format.combine(
    winston.format.colorize(),
    // winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: "error.log", level: "error" }), // Log errors to a file
  ],
});

export default logger;
