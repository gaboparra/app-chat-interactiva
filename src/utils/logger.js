import winston from "winston";
import path from "path";

const infoOnly = winston.format((info) => {
  return info.level === "info" ? info : false;
});

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs", "chat.log"),
      format: winston.format.combine(infoOnly()),
    }),
    new winston.transports.File({
      filename: path.join(process.cwd(), "logs", "error.log"),
      level: "error",
    }),
  ],
});

export default logger;
