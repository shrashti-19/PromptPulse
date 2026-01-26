const express = require("express");
const { createContent, getMyContent } = require("../controllers/contentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// create content (protected)
router.post("/", authMiddleware, createContent);

//get my content
router.get("/", authMiddleware, getMyContent);
//returns only logged in user's content


module.exports = router;
