const Content = require("../models/Content");

const createContent = async (req, res) => {
  try {
    const { title, body, type } = req.body;

    // 1. Basic validation
    if (!title || !body || !type) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Create content linked to logged-in user
    const content = await Content.create({
      title,
      body,
      type,
      userId: req.user.userId,
    });

    // 3. Send response
    res.status(201).json({
      message: "Content created successfully",
      contentId: content._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create content" });
  }
};

module.exports = { createContent };
