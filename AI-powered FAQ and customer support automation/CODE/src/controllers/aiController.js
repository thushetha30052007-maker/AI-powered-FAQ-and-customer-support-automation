const { generateAnswer, generateFAQ } = require('../services/geminiService');
const { asyncHandler } = require('../utils/helpers');

const generateAIAnswer = asyncHandler(async (req, res) => {
  const answer = await generateAnswer(req.body.question);
  res.json({ success: true, data: { question: req.body.question, answer } });
});

const generateAIFAQ = asyncHandler(async (req, res) => {
  const faq = await generateFAQ(req.body.topic);
  res.json({ success: true, data: { topic: req.body.topic, ...faq } });
});

module.exports = { generateAIAnswer, generateAIFAQ };
