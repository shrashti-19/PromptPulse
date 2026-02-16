const express = require("express");
const { signup, login, refreshAccessToken, logout} = require("../controllers/authController");
const authLimiter = require("../middleware/rateLimiter");

const router = express.Router();

router.post("/signup",authLimiter, signup);
router.post("/login", authLimiter, login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);

module.exports = router;
