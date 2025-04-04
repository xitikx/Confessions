const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            ssl: true, // Use SSL for secure connection
            tls: true, // Explicitly enable TLS
            // Remove tlsAllowInvalidCertificates unless absolutely needed
            // tlsAllowInvalidCertificates: true, // Only use for self-signed certs
            retryWrites: true, // Retry writes on failure
            w: "majority", // Write concern
        });

        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1); // Exit the process if DB connection fails
    }
};

module.exports = connectDB;