const Content = require("../models/Content");
const { generateMockSummary } = require("../services/aiService");
const chunkText = require("../utils/chunkText");
const getSimilarity = require("../utils/similarity");
const { generateAnswer } = require("../services/llmService");

/**
 * @desc    Summarize a specific content
 * @route   POST /api/ai/summarize/:contentId
 * @access  Private
 */
const summarizeContent = async (req, res, next) => {
  try {
    const { contentId } = req.params;

    // 1️⃣ Fetch content with ownership enforcement
    const content = await Content.findOne({
      _id: contentId,
      userId: req.user.userId,
      isDeleted: false,
    });

    // If content not found or not owned by user
    if (!content) {
      const error = new Error("Content not found");
      error.statusCode = 404;
      return next(error);
    }

    // 2️⃣ Generate summary (mock for now)
    const summary = generateMockSummary(content);

    // 3️⃣ Send structured response
    res.status(200).json({
      success: true,
      message: "Summary generated successfully",
      data: {
        summary,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Ask question based on user's stored content (Mock RAG)
 * @route   POST /api/ai/ask
 * @access  Private
 */
const askQuestion = async (req, res) => {
  try {
    const { question } = req.body;

    // 1️⃣ Input validation
    if (!question || question.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    if (question.length > 300) {
      return res.status(400).json({
        success: false,
        message: "Question too long (max 300 characters)",
      });
    }

    // 2️⃣ Fetch all user content (ownership enforced)
    const contents = await Content.find({
      userId: req.user.userId,
      isDeleted: false,
    });

    if (!contents.length) {
      return res.status(404).json({
        success: false,
        message: "No user content available to answer question",
      });
    }

    // 3️⃣ Convert content into chunks
    let allChunks = [];

    for (let item of contents) {
      const text = `${item.title} ${item.body}`;
      const chunks = chunkText(text, 50); // split into ~50-word chunks
      allChunks.push(...chunks);
    }

    // Optional: limit chunks for performance safety
    const limitedChunks = allChunks.slice(0, 50);

    // 4️⃣ Find most relevant chunk using similarity
    let bestChunk = "";
    let bestScore = -1;

    for (let chunk of limitedChunks) {
      const score = getSimilarity(question, chunk);

      if (score > bestScore) {
        bestScore = score;
        bestChunk = chunk;
      }
    }

    // 5️⃣ Handle no relevant match
    if (!bestChunk) {
      return res.status(404).json({
        success: false,
        message: "No relevant content found for this question",
      });
    }

    // 6️⃣ Generate answer using mock LLM service
    const answer = generateAnswer(bestChunk, question);

    // 7️⃣ Return clean response
    res.status(200).json({
      success: true,
      message: "Answer generated successfully",
      data: {
        question,
        answer,
        // contextUsed intentionally hidden in production
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { summarizeContent, askQuestion };