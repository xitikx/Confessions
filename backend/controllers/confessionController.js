const { analyzeSentiment } = require("../utils/comprehend");
const Confession = require("../models/Confession");

exports.getConfessions = async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, confessions });
  } catch (error) {
    console.error("❌ Error fetching confessions:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

exports.createConfession = async (req, res) => {
  try {
    console.log("📩 Received POST request:", req.body);
    const { text, category } = req.body;

    if (!text) {
      console.log("❌ Missing 'text' field in request body");
      return res.status(400).json({ error: "Text is required" });
    }

    console.log("🛠️ Sending text to AWS Comprehend:", text);
    const sentiment = await analyzeSentiment(text);
    console.log("🔍 Extracted Sentiment:", sentiment);

    const newConfession = new Confession({
      text,
      category,
      sentiment,
      reactions: { heart: 0, hug: 0, pray: 0 }, // Initialize reactions
      comments: [], // Initialize comments
    });

    await newConfession.save();
    console.log("✅ Confession saved successfully:", newConfession);

    // Emit Socket.io event for new confession
    req.io.emit("newConfession", newConfession);

    res.status(201).json(newConfession);
  } catch (error) {
    console.error("❌ Server Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};