const express = require("express");
const { summarizeContent } = require("../controllers/aiController");
const authMiddleware = require("../middleware/authMiddleware");
const { askQuestion } = require("../controllers/aiController");

const router = express.Router();


// Summarize content
router.post("/summarize/:contentId", authMiddleware, summarizeContent);
router.post("/ask", authMiddleware, askQuestion);

module.exports = router;
