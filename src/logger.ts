import { createLogger, format, transports } from "winston";
import path from "path";

// logsフォルダをsrcから一つ上の階層で参照
const logDir = path.join(__dirname, "../logs");

const logger = createLogger({
  level: "debug", // debug以上
  format: format.combine(
    format.colorize(),
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
    format.json()
  ),
  transports: [
    new transports.File({ filename: path.join(logDir, "error.log"), level: "error" }),
    new transports.File({ filename: path.join(logDir, "debug.log"), level: "debug" }),
    new transports.Console({ format: format.simple() }),
  ],
});

export default logger;
