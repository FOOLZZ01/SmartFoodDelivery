const app = require("./app");  // 🚀 Uvozi aplikacijo brez vnovičnega definiranja
const logger = require("./config/logger");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./config/swagger.json");

const PORT = process.env.PORT || 5001;

// 🔹 Dodamo Swagger UI dokumentacijo
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = app.listen(PORT, () => {
  logger.info(`✅ User Service running on port ${PORT}`);
  console.log(`✅ User Service running on port ${PORT}`);
});

module.exports = server;  // 🚀 Eksportamo server za testiranje
