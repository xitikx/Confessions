const express = require("express");
const router = express.Router();
const { getConfessions, createConfession } = require("../controllers/confessionController");

// POST - Add a confession
router.post("/", createConfession);

// GET - Fetch all confessions
router.get("/", getConfessions);

// POST - Add a reaction to a confession
router.post("/:id/react", async (req, res) => {
  try {
    const { reactionType } = req.body; // Expect "heart", "hug", or "pray"

    if (!["heart", "hug", "pray"].includes(reactionType)) {
      return res.status(400).json({ success: false, message: "Invalid reaction type" });
    }

    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ success: false, message: "Confession not found" });
    }

    // Ensure reactions object exists
    if (!confession.reactions) {
      confession.reactions = { heart: 0, hug: 0, pray: 0 };
    }

    confession.reactions[reactionType] += 1; // Increment reaction count
    await confession.save();

    res.json({ success: true, message: "Reaction added", reactions: confession.reactions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
});

module.exports = router;