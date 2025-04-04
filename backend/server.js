const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
// const confessionRoutes = require("./routes/confessionRoutes");

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(express.json()); // Parse JSON

// Import Routes
const confessionRoutes = require("./routes/confessionRoutes");

// Use Routes
app.use("/api/confessions", confessionRoutes);
// app.use("/api/confessions", confessionRoutes);

app.get("/", (req, res) => {
  res.send("Secret Confession Wall Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
