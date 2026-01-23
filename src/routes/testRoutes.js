const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Access granted to protected route",
    user: req.user,
  });
});

module.exports = router;
