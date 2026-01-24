const express = require("express");
const { createContent } = require("../controllers/contentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// create content (protected)
router.post("/", authMiddleware, createContent);

module.exports = router;
