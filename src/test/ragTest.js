const chunkText = require("../utils/chunkText");
const getSimilarity = require("../utils/similarity");

const content = "JWT authentication is used for secure login. MongoDB is used for database.";

const chunks = chunkText(content, 5);

const question = "How to implement JWT login?";

let bestChunk = "";
let bestScore = -1;

for (let chunk of chunks) {
  const score = getSimilarity(question, chunk);

  if (score > bestScore) {
    bestScore = score;
    bestChunk = chunk;
  }
}

console.log("Best match:", bestChunk);