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

//const Content = require("../models/Content");
const chunkText = require("../utils/chunkText");
const getSimilarity = require("../utils/similarity");
const { generateAnswer } = require("../services/llmService");

const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    const contents = await Content.find({
      userId: req.user.userId,
      isDeleted: false,
    });

    if (!contents.length) {
      return res.status(404).json({
        success: false,
        message: "No content found",
      });
    }

    let allChunks = [];

    for (let item of contents) {
      const text = `${item.title} ${item.body}`;
      const chunks = chunkText(text, 50);
      allChunks.push(...chunks);
    }

    let bestChunk = "";
    let bestScore = -1;

    for (let chunk of allChunks) {
      const score = getSimilarity(question, chunk);

      if (score > bestScore) {
        bestScore = score;
        bestChunk = chunk;
      }
    }

    const answer = generateAnswer(bestChunk, question);

    res.status(200).json({
      success: true,
      message: "Answer generated",
      data: {
        question,
        contextUsed: bestChunk,
        answer,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = { summarizeContent, askQuestion };
