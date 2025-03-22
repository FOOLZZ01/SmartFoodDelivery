const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./config/logger");
require("dotenv").config();

const app = express();

// 🔹 Omogoči CORS samo za frontend
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// 🔹 Poveži se na MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => logger.info("✅ MongoDB povezan"))
  .catch(err => logger.error("❌ Napaka pri povezavi z MongoDB:", err));

// 🔹 Poveži authRoutes
app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;  // 🚀 Eksportamo samo `app`, brez `listen()`
