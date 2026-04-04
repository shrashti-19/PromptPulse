function getSimilarity(text1, text2) {
  const words1 = text1.toLowerCase().split(" ");
  const words2 = text2.toLowerCase().split(" ");

  let common = 0;

  for (let word of words1) {
    if (words2.includes(word)) {
      common++;
    }
  }

  return common;
}

module.exports = getSimilarity;