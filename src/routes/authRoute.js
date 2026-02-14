const express = require("express");
const { signup, login, refreshAccessToken } = require("../controllers/authController");
const authLimiter = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/signup",authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/refresh", refreshAccessToken);


module.exports = router;
