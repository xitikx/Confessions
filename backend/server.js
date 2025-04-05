const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http"); // Added for Socket.io
const { Server } = require("socket.io"); // Added for Socket.io

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
const server = http.createServer(app); // Create HTTP server for Socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend origin
    methods: ["GET", "POST"],
  },
}); // Initialize Socket.io

app.use(cors());
app.use(express.json()); // Parse JSON

// Import Routes
const confessionRoutes = require("./routes/confessionRoutes");

// Pass io to routes
app.use("/api/confessions", (req, res, next) => {
  req.io = io; // Attach io to req object
  next();
}, confessionRoutes);

app.get("/", (req, res) => {
  res.send("Secret Confession Wall Backend is running...");
});

// Socket.io connection
io.on("connection", (socket) => {
  console.log("🚀 User connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("👋 User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));