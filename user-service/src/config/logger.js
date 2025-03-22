const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), // Izpis v konzolo
    new winston.transports.File({ filename: "logs/app.log" }) // Shrani v datoteko
  ],
});

module.exports = logger;
