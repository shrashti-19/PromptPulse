const express = require("express");
const { summarizeContent } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Summarize content
router.post("/summarize/:contentId", authMiddleware, summarizeContent);

module.exports = router;
