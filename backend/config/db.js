const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            ssl: true,   // ✅ Use SSL for secure connection
            tlsAllowInvalidCertificates: true, // ✅ Ignore certificate errors
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1); // Exit the process if DB connection fails
    }
};

module.exports = connectDB;
