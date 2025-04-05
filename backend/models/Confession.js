const mongoose = require("mongoose");

const ConfessionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  category: { type: String, default: "general" },
  createdAt: { type: Date, default: Date.now },
  reactions: {
    heart: { type: Number, default: 0 },
    hug: { type: Number, default: 0 },
    pray: { type: Number, default: 0 },
  },
  sentiment: { 
    type: String, 
    enum: ["POSITIVE", "NEGATIVE", "NEUTRAL", "MIXED"], 
    default: "NEUTRAL",
    uppercase: true,
  },
  comments: [{
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }],
});

module.exports = mongoose.model("Confession", ConfessionSchema);