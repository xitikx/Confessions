const express = require("express");
const mongoose = require("mongoose"); // Added this import
const router = express.Router();
const Confession = require("../models/Confession");
const { getConfessions, createConfession } = require("../controllers/confessionController");

router.post("/", createConfession);
router.get("/", getConfessions);

router.post("/:id/react", async (req, res) => {
  try {
    const { reactionType } = req.body;
    if (!["heart", "hug", "pray"].includes(reactionType)) {
      return res.status(400).json({ success: false, message: "Invalid reaction type" });
    }
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ success: false, message: "Confession not found" });
    }
    if (!confession.reactions) {
      confession.reactions = { heart: 0, hug: 0, pray: 0 };
    }
    confession.reactions[reactionType] += 1;
    await confession.save();
    req.io.emit("newReaction", {
      confessionId: req.params.id,
      reactionType,
      reactions: confession.reactions,
    });
    res.json({ success: true, message: "Reaction added", reactions: confession.reactions });
  } catch (error) {
    console.error("❌ Reaction Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

router.post("/:id/comments", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ success: false, message: "Comment text is required" });
    }
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ success: false, message: "Confession not found" });
    }
    const newComment = { _id: new mongoose.Types.ObjectId(), text, createdAt: new Date() }; // Now works
    confession.comments.push(newComment);
    await confession.save();
    req.io.emit("newComment", {
      confessionId: req.params.id,
      comment: newComment,
    });
    res.status(201).json({ success: true, message: "Comment added", comment: newComment });
  } catch (error) {
    console.error("❌ Comment Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;