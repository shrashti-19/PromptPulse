function generateAnswer(context, question) {
  return `Based on your stored content: "${context}", answer to "${question}" is related to this topic.`;
}

module.exports = { generateAnswer };