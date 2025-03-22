const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    console.log(`🔗 Poskus povezave na MongoDB: ${mongoURI}`);
    await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB povezan!`);
  } catch (error) {
    console.error("❌ Napaka pri povezavi na MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
