const Content = require("../models/Content");
const {generateMockSummary } = require("../services/aiService");


const summarizeContent = async (req, res, next) => {
  try {
    const { contentId } = req.params;

    // 1️⃣ Fetch content with ownership check
    const content = await Content.findOne({
      _id: contentId,
      userId: req.user.userId,
      isDeleted: false,
    });

    if (!content) {
      const error = new Error("Content not found");
      error.statusCode = 404;
      return next(error);
    }

    // 2️⃣ Mock AI summary (temporary)
    const summary = generateMockSummary(content);

    // 3️⃣ Return structured response
    res.status(200).json({
      success: true,
      summary,
    });

  } catch (error) {
    next(error);
  }
};

const askQuestion = async (req, res) => {
  const { question } = req.body;

  res.status(200).json({
    success: true,
    message: "AI ask endpoint working",
    data: { question },
  });
};



module.exports = { summarizeContent, askQuestion };
