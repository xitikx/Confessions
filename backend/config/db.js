const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      ssl: true, // Use SSL for secure connection
      tls: true, // Explicitly enable TLS
      retryWrites: true, // Retry writes on failure
      w: "majority", // Write concern
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    console.error("MONGO_URI used:", process.env.MONGO_URI); // Log URI for debugging
    process.exit(1); // Exit the process if DB connection fails
  }
};

module.exports = connectDB;